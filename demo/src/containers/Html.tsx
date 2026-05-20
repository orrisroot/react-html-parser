import { connect } from 'react-redux';

import Html from '../components/Html';
import type { ExampleKey } from '../data';
import type { AppState } from '../reducers';

interface StateProps {
  html: string;
  selectedExample: ExampleKey;
}

type OwnProps = Record<string, never>;

const mapStateToProps = (state: AppState): StateProps => {
  return {
    html: state.html,
    selectedExample: state.selectedExample,
  };
};

export default connect<StateProps, Record<string, never>, OwnProps, AppState>(mapStateToProps, undefined)(Html);
