import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';
import fetchDataBuilder from '../../../../../foundation/redux/Factories/FetchData';
import UniEducationViewer from '../../../../../content/containers/Pages/University/AllSteps/uniEducationViewer';
import UniViewer from '../../../../../content/containers/Pages/University/AllSteps/uniViewer';
import { nextElementInArray } from '../../../../../content/scripts/custom/utilities';
import { getLatestItemWithFriendlyNameFromState, getFirstItemWithFriendlyNameFromState } from '../../../../../content/containers/Pages/University/AllSteps/commonFunctions';
import { dataStoreIDSteps, possibleSections } from '../../../../../content/containers/Pages/University/AllSteps';
import * as storeAction from '../../../../../foundation/redux/globals/DataStoreSingle/actions';

let dataStoreID = 'testHTML3UniSub';
const fetchEducationDataTransactionStateMainID = 'wizzardUniEducationCompletion';
const FetchEducation = fetchDataBuilder(fetchEducationDataTransactionStateMainID);
const fetchUniDataTransactionStateMainID = 'wizzardUniCompletion';
const FetchUni = fetchDataBuilder(fetchUniDataTransactionStateMainID);
const initialThisState = {
  uniLoop: 0,
  qualificationLoop: 0,
};
class Viewer extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate(initialThisState);
  }
  componentWillReceiveProps(nextProps) {
    if ((nextProps.currentStep === 'ask-next-qualification' &&
      this.props.currentStep !== 'ask-next-qualification') || (
        nextProps.currentStep === 'ask-next-qualification-again' &&
      this.props.currentStep !== 'ask-next-qualification-again')) {
      // we check to see if the previous question's answer was no - i.e. did you attend other university - if it was we finish this section here
      const { answerData } = nextProps;
      const anotherUniversity = getLatestItemWithFriendlyNameFromState('anotherUniversity', null, answerData);
      if (anotherUniversity !== 'No') {
        const optionValue = getLatestItemWithFriendlyNameFromState('anotherUniversityLocation1', null, nextProps.answerData);
        const { uniLoop } = nextProps.reduxState_this;
        const newValue = uniLoop + 1;
        if (optionValue === 'United Kingdom') {
          // we need to interrogate the answers to see if they selected UK - in which case we go to the next step
          // then bounce into questions
          const { type } = nextProps;
          nextProps.reduxAction_doUpdate({ uniLoop: newValue });
          // goto uni-question regardless of which got us here
          nextProps.submitDataCallback(null, 'uni-question', type);
        } else {
          // we need to interrogate the answers to see if they selected something else - in which case we go to the next step + 1
          // then bounce into questions
          const { type } = nextProps;
          nextProps.reduxAction_doUpdate({ uniLoop: newValue });
          // go to 2-3 regardless of what got us here
          nextProps.submitDataCallback(null, '2-3', type);
        }
      } else {
        const { type } = nextProps;
        // go to 2-4 regardless of what got us here
        nextProps.submitDataCallback(null, '2-4', type);
      }
    }
  }
  getQualificationsHistory(seed) {
    const { qualificationLoop, uniLoop } = this.props.reduxState_this;
    const { answerData } = this.props;
    const uniName = getLatestItemWithFriendlyNameFromState('universityName', 'Your University', answerData);
    // we pass the updateSeed value into the sendData to make the fetch refresh for every array iteration but the backend does not care
    const content = (
      <FetchEducation
        active
        fetchURL="api/universityWizzard/uniEducationData"
        sendData={{
 sessionID: answerData.sessionID, uniLoop, qualificationLoop, seed,
}}
        noRender={false}
        stateSubID="default"
        viewer={UniEducationViewer}
        viewerProps={{ uniName }}
      />
    );
    return (
      <div>
        <h4>{uniName}</h4>
        <div style={{ marginTop: '20px' }} />
        {content}
      </div>
    );
  }
  getUniHistory(seed) {
    const { qualificationLoop, uniLoop } = this.props.reduxState_this;
    const { answerData } = this.props;
    // we pass the updateSeed value into the sendData to make the fetch refresh for every array iteration but the backend does not care
    const content = (
      <FetchUni
        active
        fetchURL="api/universityWizzard/educationData"
        sendData={{
 sessionID: answerData.sessionID, uniLoop, qualificationLoop, seed,
}}
        noRender={false}
        stateSubID="default"
        viewer={UniViewer}
      />
    );
    return (
      <div>
        {content}
      </div>
    );
  }
  getStepContent() {
    const { currentStep, answerData } = this.props;
    const { qualificationLoop, uniLoop } = this.props.reduxState_this;
    let content = null;
    let useStep = this.props.currentStep;
    if (currentStep === 'uni-question') {
      useStep = '0-1';
    }
    if (currentStep === '2-2-again') {
      useStep = '2-2';
    }
    let useMutatedTitles = true;
    if (currentStep === '2-3') {
      useMutatedTitles = false;
    }
    let wizzard = (
      <NewWizzardPane
        step={useStep}
        // eslint-disable-next-line no-shadow
        submitCallback={(answerData) => { this.handleSubmit(answerData); }}
        saveAPI="api/universityWizzard/saveStep/"
        fetchAPI="api/universityWizzard/getStep/"
        subStep={uniLoop + '_' + qualificationLoop}
        additionalSaveSendData={{ uniLoop, qualificationLoop }}
        useMutatedTitles={useMutatedTitles}
      />
    );

    let pageButton = (
      <div className="center-question" style={{ paddingBottom: '0px' }}>
        <h5 className="dark-text" style={{ marginBottom: '22px' }}>Ready to proceed?</h5>
        <button className="btn btn-block btn-next-step answered btn-margin" /* onClick={() => { this.nextStep(); }} */>
                  Let's go!
        </button>
      </div>
    );

    if (this.props.reduxState_steps.realSection > this.props.reduxState_steps.section) {
      pageButton = (
        <div className="center-question" style={{ paddingBottom: '0px' }}>
          <button className="btn btn-block btn-next-step answered btn-margin" /* onClick={() => { this.handleSummaryButtonClick(); }} */>
                    Continue survey?
          </button>
        </div>
      );
    }

    const uniName = getLatestItemWithFriendlyNameFromState('universityName', 'your university', answerData);
    if (currentStep === '2-1') {
      content = (
        <div>
          <div className="text-left px-5">
            {this.getQualificationsHistory()}
          </div>
          <div className="education-seperator-wizzard" />
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'ask-another-qualification') {
      wizzard = (
        <div>
          <div className="d-flex justify-content-center">
            <div className="question-spacer" />
            <div className="center-question" style={{ paddingBottom: '0px' }}>
              <h5 className="dark-text" style={{ marginBottom: '22px' }}>Did you do any other qualifications at {uniName}?</h5>
              <button className="btn btn-block btn-option btn-multiline btn-margin" onClick={() => { this.moreQualifications(); }}>
                  Yes
              </button>
              <button className="btn btn-block btn-option btn-multiline btn-margin" onClick={() => { this.nextStep(); }}>
                  No
              </button>
            </div>
            <div className="question-spacer" style={{ height: '1px' }} />
          </div>
        </div>
      );
      content = (
        <div>
          <div className="text-left px-5">
            {this.getQualificationsHistory('1')}
          </div>
          <div className="education-seperator-wizzard" />
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '2-2' || currentStep === '2-2-again') {
      content = (
        <div>
          <div className="text-left px-5">
            {this.getUniHistory()}
          </div>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'ask-next-qualification' || currentStep === 'ask-next-qualification-again') {
      content = null;
      // should not get here
    // remove else conditional TODO
    } else if (currentStep === 'uni-question') {
      content = (
        <div>
          {wizzard}
        </div>
      );
    } else if (currentStep === '2-3') {
      content = (
        <div>
          <h3>Non UK University</h3>
          <h4 className="accent-text">Your Education</h4>
          <div className="px-5">
            <h5 className="grey-text">
              Answer only for the latest / most recent qualification you got from this institution
            </h5>
          </div>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '2-4') {
      content = (
        <div>
          <h3>Your Family</h3>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '2-5') {
      const firstUniName = getFirstItemWithFriendlyNameFromState('universityName', 'your university', answerData);
      content = (
        <div className="large-question-area">
          <h3>University Impact</h3>
          <div className="px-5">
            <h5 className="grey-text">
              This survey is for {firstUniName} and so please answer these questions specifically for that university:
            </h5>
          </div>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'summary-uni') {
      content = (
        <div>
          <h4>Thanks for completing section 2!</h4>
          <h5 className="accent-text">Here's what your university alumni are up to!</h5>
          <img alt="s2" src={require('../../../../../content/theme/custom/images/s2.png')} width="100%" />
          <div className="d-flex justify-content-center">
            <div className="question-spacer" />
            {pageButton}
            <div className="question-spacer" style={{ height: '1px' }} />
          </div>
        </div>
      );
    }
    return content;
  }
  // move us back to the 0th step
  moreQualifications() {
    const { steps, type } = this.props;
    const { qualificationLoop } = this.props.reduxState_this;
    const newValue = qualificationLoop + 1;
    this.props.reduxAction_doUpdate({ qualificationLoop: newValue });
    this.props.submitDataCallback(null, steps[0], type);
  }

  // just push us onto the next step
  nextStep() {
    const { steps, currentStep, type } = this.props;
    const next = nextElementInArray(steps, currentStep);
    this.props.submitDataCallback(null, next, type);
  }

  handleSubmit(answerData) {
    const { steps, currentStep, type } = this.props;
    if (currentStep === 'uni-question') {
      this.props.submitDataCallback(answerData, steps[0], type);
    } else {
      const next = nextElementInArray(steps, currentStep);
      this.props.submitDataCallback(answerData, next, type);
    }
  }

  handleSummaryButtonClick() {
    dataStoreID = 'testHTML3';

    const { realSection } = this.props.reduxState_steps;
    const { realStep } = this.props.reduxState_steps;

    const stepTo = possibleSections[realSection][realStep];

    console.log(stepTo, realStep, realSection);

    this.props.reduxAction_doUpdate({
      step: stepTo,
    });

    this.props.reduxAction_doUpdateStep({ currentStep: realStep + 1, stepCount: possibleSections[realSection].length, section: realSection });
  }


  render() {
    console.log('render pre uni step: ' + this.props.currentStep);
    return this.getStepContent();
  }
}
Viewer.propTypes = {
  reduxState_steps: PropTypes.object,
  reduxAction_doUpdateStep: PropTypes.func,
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.string.isRequired,
  submitDataCallback: PropTypes.func.isRequired,
  reduxState_this: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
  answerData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
Viewer.defaultProps = {
  reduxState_steps: {
    currentStep: 11,
    stepCout: 11,
    section: 1,
  },
  reduxState_this: {},
  reduxAction_doUpdate: () => {},
  reduxAction_doUpdateStep: () => {},
};
const mapStateToProps = state => ({
  reduxState_this: state.dataStoreSingle[dataStoreID],
  reduxState_steps: state.dataStoreSingle[dataStoreIDSteps],
});
const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data, initialThisState)),
  reduxAction_doUpdateStep: data => dispatch(storeAction.doUpdate(dataStoreIDSteps, data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
