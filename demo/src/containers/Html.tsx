import { connect } from 'react-redux';

import Html from '../components/Html';
import { ExampleKey } from '../data';
import type { AppState } from '../reducers';

interface StateProps {
  html: string;
  selectedExample: ExampleKey;
}

interface OwnProps {}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    html: state.html,
    selectedExample: state.selectedExample,
  };
};

export default connect<StateProps, {}, OwnProps, AppState>(
  mapStateToProps,
  undefined,
)(Html);
