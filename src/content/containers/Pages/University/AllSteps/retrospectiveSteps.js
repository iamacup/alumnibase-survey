
import React from 'react';
import PropTypes from 'prop-types';

import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';

import { nextElementInArray } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.PureComponent {
  getStepContent() {
    const { currentStep } = this.props;
    let content = null;

    const wizzard = (
      <NewWizzardPane
        step={this.props.currentStep}
        // eslint-disable-next-line no-shadow
        submitCallback={(answerData) => { this.handleSubmit(answerData); }}
        saveAPI="api/universityWizzard/saveStep/"
        fetchAPI="api/universityWizzard/getStep/"
      />
    );

    const uniName = this.props.answerData.data['questions/42953580507_0'].universityName.optionValue.toUpperCase();

    if (currentStep === '5-1') {
      content = (
        <div className="large-question-area">
          <h3>{uniName}</h3>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '5-2') {
      content = (
        <div>
          <h3>Retrospective</h3>
          <h4 className="accent-text">Overall Satisfaction</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '5-3') {
      content = (
        <div className="large-question-area">
          <h3>{uniName}</h3>
          <h4 className="accent-text">Your degree</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '5-4') {
      content = (
        <div>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'summary-retrospective') {
      content = (
        <div>

          <h4>Thanks for completing section 5!</h4>
          <h5 className="accent-text">Here's what your university alumni are up to!</h5>

          <div style={{ marginTop: '26px' }} />

          <div>
            <img alt="s5" className="img-fluid" src={require('../../../../../content/theme/custom/images/s5.png')} />
          </div>

          <div style={{ marginTop: '26px' }} />

          <div className="d-flex justify-content-center">
            <div className="question-spacer" />
            <div className="center-question" style={{ paddingBottom: '0px' }}>
              <h5 className="dark-text" style={{ marginBottom: '22px' }}>Congratulations!</h5>
              <h6 className="grey-text">You have now finished the survey!</h6>
              <h6 className="grey-text">Now all thats left is to submit your data.</h6>
              <button className="btn btn-block btn-next-step answered btn-margin" onClick={() => { this.handleSubmit(null); }}>
                  Submit
              </button>
            </div>
            <div className="question-spacer" style={{ height: '1px' }} />
          </div>
        </div>
      );
    } else if (currentStep === 'final-page') {
      content = (
        <div>
          <h3>Congratulations!</h3>
          <h3>You have completed the survey!</h3>
          <img src={require('../../../../../content/theme/custom/images/turtle.jpg')} alt="Alumni Base" height="500" />
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
  answerData: PropTypes.object.isRequired,
};

export default Viewer;
