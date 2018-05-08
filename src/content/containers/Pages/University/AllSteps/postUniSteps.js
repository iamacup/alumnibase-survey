
import React from 'react';
import PropTypes from 'prop-types';

import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';

import { nextElementInArray, dNc } from '../../../../../content/scripts/custom/utilities';

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

    let companyName = '';
    if (dNc(this.props.answerData.data['questions/42953555352_0'])) {
      companyName = this.props.answerData.data['questions/42953555352_0'].company.optionValue;
    }

    if (currentStep === '4-1') {
      content = (
        <div className="large-question-area">
          <h3>Employment Activity</h3>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '4-2') {
      content = (
        <div>
          <h3>Employment</h3>
          <h4 className="accent-text">Your Current Status</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '4-3') {
      content = (
        <div>
          <h3>{companyName}</h3>
          <h4 className="accent-text">Your Employment</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '4-4') {
      content = (
        <div>
          <h3>{companyName}</h3>
          <h4 className="accent-text">Your Employment</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '4-5') {
      content = (
        <div>
          <h3>{companyName}</h3>
          <h4 className="accent-text">Your Salary</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '4-6') {
      content = (
        <div>
          <h3>{companyName}</h3>
          <h4 className="accent-text">Pre Employment</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'summary-post') {
      content = (
        <div>

          <h4>Thanks for completing section 4!</h4>
          <h5 className="accent-text">Here's what your university alumni are up to!</h5>

          <div style={{ marginTop: '26px' }} />

          <div>
            <img alt="s4" className="img-fluid" src={require('../../../../../content/theme/custom/images/s4.png')} />
          </div>

          <div style={{ marginTop: '26px' }} />

          <div className="d-flex justify-content-center">
            <div className="question-spacer" />
            <div className="center-question" style={{ paddingBottom: '0px' }}>
              <h5 className="dark-text" style={{ marginBottom: '22px' }}>Ready to proceed?</h5>
              <h6 className="grey-text">You can return here at any time using the navigation on the left.</h6>
              <button className="btn btn-block btn-next-step answered btn-margin" onClick={() => { this.handleSubmit(null); }}>
                  Next Step!
              </button>
            </div>
            <div className="question-spacer" style={{ height: '1px' }} />
          </div>
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
