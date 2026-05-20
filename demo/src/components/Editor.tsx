import type { EditorProps } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useRef } from 'react';

import data, { type ExampleKey } from '../data';

interface AppEditorProps {
  html: string;
  onUpdateHtml: (html: string) => void;
  onUpdateExample: (example: ExampleKey) => void;
  onSetView: (view: string) => void;
  selectedExample: ExampleKey;
  examples: Array<{ value: ExampleKey; label: string }>;
  view: string;
}

const EDITOR_OPTIONS: EditorProps['options'] = {
  wordWrap: 'off' as const,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  readOnly: false,
};

export default function AppEditor({
  html,
  onUpdateHtml,
  onUpdateExample,
  onSetView,
  selectedExample,
  examples,
  view,
}: AppEditorProps) {
  const viewRef = useRef(view);
  viewRef.current = view;

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined && viewRef.current === 'html') {
        onUpdateHtml(value);
      }
    },
    [onUpdateHtml],
  );

  const handleExampleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onUpdateExample(e.target.value as ExampleKey);
    },
    [onUpdateExample],
  );

  const handleViewChange = useCallback(
    (newView: string) => {
      onSetView(newView);
    },
    [onSetView],
  );

  const views = useMemo(
    () => [
      { id: 'html', label: 'HTML' },
      { id: 'options', label: 'Options' },
    ],
    [],
  );

  const editorValue = useMemo(
    () =>
      view === 'html'
        ? html
        : (data[selectedExample].display ??
          `const options = ${JSON.stringify(data[selectedExample].options, null, 2)}`),
    [view, html, selectedExample],
  );

  const editorLanguage = useMemo(() => {
    return view === 'html' ? 'html' : 'javascript';
  }, [view]);

  const isReadOnly = useMemo(() => {
    return view !== 'html';
  }, [view]);

  const editorOptions = useMemo(() => ({ ...EDITOR_OPTIONS, readOnly: isReadOnly }), [isReadOnly]);

  return (
    <div id="editor">
      <div className="presets">
        <div>
          <select onChange={handleExampleChange} value={selectedExample}>
            {examples.map((example) => (
              <option value={example.value} key={example.value}>
                {example.label}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {views.map((v) => (
            <li key={v.id}>
              {v.id === view ? (
                v.label
              ) : (
                <button type="button" onClick={() => handleViewChange(v.id)}>
                  {v.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="editor-wrapper">
        <Editor
          language={editorLanguage}
          value={editorValue}
          onChange={handleEditorChange}
          options={editorOptions}
          theme="vs"
          loading={<span>Loading editor...</span>}
        />
      </div>
    </div>
  );
}
