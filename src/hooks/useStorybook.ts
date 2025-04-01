import { useEffect, useState } from "react";
import type { StoryFn, StoryContext } from "@storybook/react";

interface StoryData {
  id: string;
  args: any;
  initialArgs: any;
  parameters: any;
  storyFn: StoryFn;
}

interface StoryEvent {
  id: string;
  args: any;
  initialArgs: any;
  parameters: any;
  storyFn: StoryFn;
}

interface StorybookAPI {
  stories: Record<string, StoryData>;
  currentStory: StoryData | null;
  setCurrentStory: (story: StoryData) => void;
  updateStoryArgs: (newArgs: any) => void;
  getStoryContext: () => StoryContext;
}

export function useStorybook(): StorybookAPI {
  const [stories, setStories] = useState<Record<string, StoryData>>({});
  const [currentStory, setCurrentStory] = useState<StoryData | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // @ts-ignore - Storybook globals
        const channel = window.__STORYBOOK_ADDONS_CHANNEL__;

        channel.on("storyRendered", (event: StoryEvent) => {
          setCurrentStory({
            id: event.id,
            args: event.args,
            initialArgs: event.initialArgs,
            parameters: event.parameters,
            storyFn: event.storyFn,
          });
        });

        // @ts-ignore - Storybook globals
        const stories = await window.__STORYBOOK_CLIENT_API__.raw();
        setStories(
          stories.reduce((acc: Record<string, StoryData>, story: any) => {
            acc[story.id] = {
              id: story.id,
              args: story.args,
              initialArgs: story.initialArgs,
              parameters: story.parameters,
              storyFn: story,
            };
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };

    fetchStories();
  }, []);

  const updateStoryArgs = (newArgs: any) => {
    if (!currentStory) return;

    // @ts-ignore - Storybook globals
    window.__STORYBOOK_ADDONS_CHANNEL__.emit("updateStoryArgs", {
      storyId: currentStory.id,
      updatedArgs: newArgs,
    });
  };

  const getStoryContext = (): StoryContext => {
    if (!currentStory) return {} as StoryContext;

    // @ts-ignore - Storybook globals
    return window.__STORYBOOK_STORY_STORE__.getStoryContext(
      currentStory.storyFn
    );
  };

  return {
    stories,
    currentStory,
    setCurrentStory,
    updateStoryArgs,
    getStoryContext,
  };
}
