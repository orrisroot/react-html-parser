import { connect } from 'react-redux';
import Html from '../components/Html';

const mapStateToProps = (state) => {
  return {
    html: state.html,
    selectedExample: state.selectedExample,
  };
};

export default connect(mapStateToProps)(Html);
