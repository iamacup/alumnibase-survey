
import React from 'react';
import PropTypes from 'prop-types';

import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';

import { nextElementInArray } from '../../../../../content/scripts/custom/utilities';
import { getLatestItemWithFriendlyNameFromState } from '../../../../../content/containers/Pages/University/AllSteps/commonFunctions';

class Viewer extends React.PureComponent {
  getStepContent() {
    const { currentStep, answerData } = this.props;
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

    const uniName = getLatestItemWithFriendlyNameFromState('universityName', 'your university', answerData);

    if (currentStep === '0-1') {
      content = (
        <div>
      <h4 className="mb-5 mx-5" style={{ color: 'purple', fontWeight: 'bold' }} >This page is used to simulate the 'click this link in email'. <br />i.e. a user would not see this step when entering the system.</h4>
          <div className="seperator" />
          {wizzard}
        </div>
      );
    } else if (currentStep === 'intro') {
      content = (
        <div>
          <h3 style={{ marginBottom: '24px' }}>{uniName}</h3>
          <div className="px-5 lots-of-text text-left">
            <p>
              Hey there, welcome to AlumniBase.com - a tool to see what happened
              after university!
            </p>
            <p>
              First thing's first, <strong>{uniName}</strong> have sent
              you this link in order to learn a bit more about their alumni.
            </p>
            <p>
              Any information you enter into this tool will{' '}
              <strong>
                not be individually identifiable to {uniName}
              </strong>, we only provide them with agregate data.
            </p>
            <p>
              Unlike other surveys,{' '}
              <strong>
                you will see immediate results while answering questions!
              </strong>
            </p>

            <div className="row align-items-center">
              <div className="col-sm text-center">
                <img alt="Step 1" src={require('../../../../../content/theme/custom/images/wizz-explainer/1.png')} />
              </div>
              <div className="col-sm text-center">
                <img alt="Step 1" src={require('../../../../../content/theme/custom/images/wizz-explainer/2.png')} />
              </div>
              <div className="col-sm text-center">
                <img alt="Step 1" src={require('../../../../../content/theme/custom/images/wizz-explainer/3.png')} />
              </div>
            </div>

            <div style={{ marginTop: '20px' }} />

            <div className="row align-items-center">
              <div className="col-sm text-center">
                <h6>1. <span className="grey-text">Select an answer</span></h6>
              </div>
              <div className="col-sm text-center">
                <h6>2. <span className="grey-text">Recieve immediate feedback</span></h6>
              </div>
              <div className="col-sm text-center">
                <h6>3. <span className="grey-text">See summary statistics at the end of a section</span></h6>
              </div>
            </div>

            <div style={{ marginTop: '28px' }} />

          </div>

          <div>
            <div className="d-flex justify-content-center">
              <div className="question-spacer" />
              <div className="center-question" style={{ paddingBottom: '0px' }}>
                <button
                  onClick={() => { this.handleSubmit(null); }}
                  type="submit"
                  className="btn btn-block btn-next-step answered"
                >
                  <span>Next Step <i className="far fa-arrow-right" /></span>
                </button>
              </div>
              <div className="question-spacer" style={{ height: '1px' }} />
            </div>
          </div>

        </div>
      );
    } else if (currentStep === 'terms') {
      content = (
        <div className="large-question-area">
        <h3 style={{ marginBottom: '24px' }}>{uniName}</h3>
  <div className="px-5 lots-of-text text-left mx-5">
                      <p>
                        Before we begin there are a couple of things you need to know about the data we are about to collect.
                      </p>
                      <p>
                        We will never share personally identifiable information with anyone, including your university. In order for you to help your university, we need you to agree to the following:
                      </p>
                      </div>
               <div style={{ marginTop: '34px' }} />
                   <NewWizzardPane
        step={'0-2'}
        // eslint-disable-next-line no-shadow
        submitCallback={(answerData) => { this.handleSubmit(answerData); }}
        saveAPI="api/universityWizzard/saveStep/"
        fetchAPI="api/universityWizzard/getStep/"
      />
        </div>
      );
    } else if (currentStep === '1-1') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4 className="accent-text">Your Nationality</h4>

          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '1-2') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4 className="accent-text">Your Location</h4>

          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '1-3') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4 className="accent-text">Biographical Information</h4>

          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '1-4') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4 className="accent-text">Ethnicity, Disability & Religion</h4>

          <div className="px-5">
            <h5 className="grey-text">
              All of the following questions have opt-out options if you don't
              want to answer them, but by answering them you will help {uniName}.
            </h5>
          </div>

          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'summary-bio') {
      content = (
        <div>

          <h4>Thanks for completing section 1!</h4>
          <h5 className="accent-text">You will see different data at the end of every section.</h5>

          <div style={{ marginTop: '26px' }} />

          <div>
            <img alt="s1" className="img-fluid" src={require('../../../../../content/theme/custom/images/s1.png')} />
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
