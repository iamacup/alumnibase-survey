
import React from 'react';
import PropTypes from 'prop-types';

// import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';

import { nextElementInArray } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.PureComponent {
  getStepContent() {
    const { currentStep } = this.props;
    let content = null;

    // const wizzard = (
    //   <NewWizzardPane
    //     step={this.props.currentStep}
    //     // eslint-disable-next-line no-shadow
    //     submitCallback={(answerData) => { this.handleSubmit(answerData); }}
    //     saveAPI="api/universityWizzard/saveStep/"
    //     fetchAPI="api/universityWizzard/getStep/"
    //   />
    // );

    if (currentStep === '3-1') {
      content = (
        <div>
          <h3>Your life before university</h3>
          <h4 className="accent-text">Section under construction</h4>

          <div style={{ marginTop: '44px' }} />
          <i style={{ fontSize: '100px' }} className="grey-text far fa-exclamation-triangle" />

        </div>
      );
    }

    return content;
  }

  handleSubmit(answerData) {
    const { steps, currentStep, type } = this.props;

    const next = nextElementInArray(steps, currentStep);

    this.props.submitDataCallback(answerData, next, type);
  }

  render() {
    console.log('render pre uni step: ' + this.props.currentStep);
    return this.getStepContent();
  }
}

Viewer.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.string.isRequired,
  submitDataCallback: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  // answerData: PropTypes.object.isRequired,
};

export default Viewer;
