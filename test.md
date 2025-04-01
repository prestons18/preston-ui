import { useStorybook, useStorybookControls, useStorybookDocs } from 'preston-ui/hooks';

function StorybookExplorer() {
// Get all stories and current story info
const { stories, currentStory, updateStoryArgs } = useStorybook();

// Get controls for manipulation
const { getControls, updateControl, resetControls } = useStorybookControls();

// Get documentation
const { getComponentDocs, getSourceCode } = useStorybookDocs();

// Example: Display all stories and allow clicking to view them
return (
<div>
<h1>Story Explorer</h1>

      {/* List all stories */}
      <div className="stories-list">
        {Object.entries(stories).map(([id, story]) => (
          <div key={id} onClick={() => setCurrentStory(story)}>
            {story.id}
          </div>
        ))}
      </div>

      {/* Show current story controls */}
      {currentStory && (
        <div className="controls-panel">
          <h2>Controls</h2>
          {Object.entries(getControls(currentStory.id)).map(([name, control]) => (
            <div key={name}>
              <label>{name}</label>
              <input
                value={currentStory.args[name]}
                onChange={(e) => updateControl(currentStory.id, name, e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => resetControls(currentStory.id)}>
            Reset Controls
          </button>
        </div>
      )}

      {/* Show documentation */}
      {currentStory && (
        <div className="docs-panel">
          <h2>Documentation</h2>
          <pre>{getComponentDocs(currentStory.id)?.description}</pre>
          <h3>Source Code</h3>
          <pre>{getSourceCode(currentStory.id)}</pre>
        </div>
      )}
    </div>

);
}
