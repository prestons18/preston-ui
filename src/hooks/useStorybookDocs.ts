import { useCallback, useEffect, useState } from "react";

interface ComponentDocs {
  description?: string;
  props?: Record<string, PropData>;
  examples?: string[];
  tags?: Record<string, string>;
}

interface PropData {
  description?: string;
  type?: {
    name: string;
    value?: any;
  };
  defaultValue?: any;
  required?: boolean;
}

interface DocsAPI {
  getComponentDocs: (componentId: string) => ComponentDocs;
  getAllComponentDocs: () => Record<string, ComponentDocs>;
  getSourceCode: (storyId: string) => Promise<string>;
}

export function useStorybookDocs(): DocsAPI {
  const [docsCache, setDocsCache] = useState<Record<string, ComponentDocs>>({});

  useEffect(() => {
    const fetchAllDocs = async () => {
      try {
        // @ts-ignore - Storybook globals
        const store = window.__STORYBOOK_STORY_STORE__;
        const stories = store.raw();

        const docs = stories.reduce(
          (acc: Record<string, ComponentDocs>, story: any) => {
            if (story.parameters?.docs) {
              acc[story.componentId] = {
                description: story.parameters.docs.description?.component,
                props: story.parameters.docs.props,
                examples: story.parameters.docs.examples,
                tags: story.parameters.docs.tags,
              };
            }
            return acc;
          },
          {}
        );

        setDocsCache(docs);
      } catch (error) {
        console.error("Failed to fetch component docs:", error);
      }
    };

    fetchAllDocs();
  }, []);

  const getComponentDocs = useCallback(
    (componentId: string) => {
      return docsCache[componentId] || {};
    },
    [docsCache]
  );

  const getAllComponentDocs = useCallback(() => {
    return docsCache;
  }, [docsCache]);

  const getSourceCode = useCallback(async (storyId: string) => {
    try {
      // @ts-ignore - Storybook globals
      const store = window.__STORYBOOK_STORY_STORE__;
      const story = store.fromId(storyId);

      if (!story) return "";

      // @ts-ignore - Storybook globals
      const sourceResult = await window.__STORYBOOK_SOURCE_LOADER__.load(story);
      return sourceResult?.source || "";
    } catch (error) {
      console.error("Failed to fetch source code:", error);
      return "";
    }
  }, []);

  return {
    getComponentDocs,
    getAllComponentDocs,
    getSourceCode,
  };
}
