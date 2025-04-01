import { useCallback } from "react";

interface ControlsAPI {
  getControls: (storyId: string) => Record<string, any>;
  updateControl: (storyId: string, controlName: string, value: any) => void;
  getControlType: (storyId: string, controlName: string) => string;
  resetControls: (storyId: string) => void;
}

export function useStorybookControls(): ControlsAPI {
  const getControls = useCallback((storyId: string) => {
    // @ts-ignore - Storybook globals
    const store = window.__STORYBOOK_STORY_STORE__;
    const story = store.fromId(storyId);
    return story?.parameters?.controls?.controls || {};
  }, []);

  const updateControl = useCallback(
    (storyId: string, controlName: string, value: any) => {
      // @ts-ignore - Storybook globals
      window.__STORYBOOK_ADDONS_CHANNEL__.emit("updateStoryArgs", {
        storyId,
        updatedArgs: { [controlName]: value },
      });
    },
    []
  );

  const getControlType = useCallback(
    (storyId: string, controlName: string) => {
      const controls = getControls(storyId);
      return controls[controlName]?.type || "text";
    },
    [getControls]
  );

  const resetControls = useCallback((storyId: string) => {
    // @ts-ignore - Storybook globals
    const store = window.__STORYBOOK_STORY_STORE__;
    const story = store.fromId(storyId);
    if (story?.initialArgs) {
      // @ts-ignore - Storybook globals
      window.__STORYBOOK_ADDONS_CHANNEL__.emit("updateStoryArgs", {
        storyId,
        updatedArgs: story.initialArgs,
      });
    }
  }, []);

  return {
    getControls,
    updateControl,
    getControlType,
    resetControls,
  };
}
