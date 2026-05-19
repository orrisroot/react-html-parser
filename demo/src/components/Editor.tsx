import 'brace';
import 'brace/mode/html';
import 'brace/theme/chrome';
import { Component, FormEvent, ChangeEvent } from 'react';
import AceEditor from 'react-ace';

import data, { ExampleKey } from '../data';

interface EditorProps {
  html: string;
  onUpdateHtml: (html: string) => void;
  onUpdateExample: (example: ExampleKey) => void;
  onSetView: (view: string) => void;
  selectedExample: ExampleKey;
  examples: Array<{ value: ExampleKey; label: string }>;
  view: string;
}

interface EditorState {}

export default class Editor extends Component<EditorProps, EditorState> {
  onEditorChange(html: string) {
    this.props.onUpdateHtml(html);
  }

  onEditorLoad(editor: any) {
    editor.session.setUseWorker(false);
    editor.session.setUseWrapMode(true);
  }

  onExampleChange(e: ChangeEvent<HTMLSelectElement>) {
    this.props.onUpdateExample(e.target.value as ExampleKey);
  }

  onViewChange(view: string) {
    this.props.onSetView(view);
  }

  generateViewLinks(activeView: string) {
    const views = [
      { id: 'html', label: 'HTML' },
      { id: 'options', label: 'Options' },
    ];

    return views.map((view) => {
      const contents =
        view.id === activeView ? (
          view.label
        ) : (
          <a
            href="#"
            onClick={(e: FormEvent) => {
              e.preventDefault();
              this.onViewChange(view.id);
            }}
          >
            {view.label}
          </a>
        );
      return <li key={view.id}>{contents}</li>;
    });
  }

  generateEditor(view: string) {
    const editorProps = {
      $blockScrolling: Number.POSITIVE_INFINITY,
      wrap: true,
    } as Record<string, unknown>;

    if (view === 'html') {
      const { html } = this.props;
      return (
        <AceEditor
          mode="html"
          theme="chrome"
          name="HTML_EDITOR"
          value={html}
          width="100%"
          height="auto"
          onChange={(value: string) => this.onEditorChange(value)}
          onLoad={(editor: any) => this.onEditorLoad(editor)}
          editorProps={editorProps}
        />
      );
    } else {
      const { selectedExample } = this.props;
      const value = data[selectedExample].display
        ? data[selectedExample].display
        : `const options = ${JSON.stringify(data[selectedExample].options, null, 2)}`;
      return (
        <AceEditor
          mode="javascript"
          theme="chrome"
          name="HTML_EDITOR"
          value={value}
          width="100%"
          height="auto"
          readOnly={true}
          onLoad={(editor: any) => this.onEditorLoad(editor)}
          editorProps={editorProps}
        />
      );
    }
  }

  render() {
    const { examples, selectedExample, view } = this.props;
    return (
      <div id="editor">
        <div className="presets">
          <div>
            <select onChange={(e) => this.onExampleChange(e)} value={selectedExample}>
              {examples.map((example) => (
                <option value={example.value} key={example.value}>
                  {example.label}
                </option>
              ))}
            </select>
          </div>
          <ul>{this.generateViewLinks(view)}</ul>
        </div>
        {this.generateEditor(view)}
      </div>
    );
  }
}
