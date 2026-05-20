import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { AppAction } from '../actions';
import { setView, updateHtml, updateSelectedExample } from '../actions';

import Editor from '../components/Editor';
import type { ExampleKey } from '../data';
import type { AppState } from '../reducers';

interface StateProps {
  html: string;
  examples: Array<{ value: ExampleKey; label: string }>;
  selectedExample: ExampleKey;
  view: string;
}

interface DispatchProps {
  onUpdateHtml: (html: string) => void;
  onUpdateExample: (example: ExampleKey) => void;
  onSetView: (view: string) => void;
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    html: state.html,
    examples: state.examples,
    selectedExample: state.selectedExample,
    view: state.view,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): DispatchProps => {
  return {
    onUpdateHtml: (html: string) => dispatch(updateHtml(html)),
    onUpdateExample: (example: ExampleKey) => dispatch(updateSelectedExample(example)),
    onSetView: (view: string) => dispatch(setView(view)),
  };
};

export default connect<StateProps, DispatchProps, Record<string, never>, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);
