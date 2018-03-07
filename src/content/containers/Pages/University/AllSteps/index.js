
import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';
import fetchDataBuilder from '../../../../../foundation/redux/Factories/FetchData';
import UniEducationViewer from '../../../../../content/containers/Pages/University/AllSteps/uniEducationViewer';

import Navigation from '../../../../../content/containers/Pages/NewTheme/navigation';
import TopProgress from '../../../../../content/containers/Pages/NewTheme/topProgress';
import BottomProgress from '../../../../../content/containers/Pages/NewTheme/bottomProgress';

import UniSteps from '../../../../../content/containers/Pages/University/AllSteps/uniSteps';
import BioSteps from '../../../../../content/containers/Pages/University/AllSteps/bioSteps';
import PreUniSteps from '../../../../../content/containers/Pages/University/AllSteps/preUniSteps';

import { fireDebouncedResizeEvents, dNc } from '../../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../../foundation/redux/globals/DataStoreSingle/actions';

// the id to store stuff for this wizzard panel
const dataStoreID = 'testHTML3';
export const dataStoreIDSteps = 'wizzardSteps';

// fetch actions constants
const fetchDataTransactionStateMainID = 'wizzardUniEducationCompletion';
const FetchEducation = fetchDataBuilder(fetchDataTransactionStateMainID);

// STEP ARRAYS CAN NOT HAVE DUPLICATE ENTRIES!!!!!
// IF THE SAME STEP NEEDS TO LOOP OR BE RENDERED AT DIFFERENT POINTS - ALIAS IT AND THEN HANDLE IN THE VIEWER
const firstStep = '0-1';

const bioSteps = ['0-1', 'intro', 'terms', '1-1', '1-2', '1-3', '1-4', 'summary-bio'];
// 2-1: What degree did you study at uni X and all the data about its results
// ask-another-qualification: did you study another degree at university X
// if yes - back to step 2-1
// if no - onto step 2-2
// 2-2: Did you go to another university
// if yes - ask what country
// ask-next-qualification: used as a way to do additional processing on the output of 2-2
// if the output of 2-2 was anything other than no
// look to see if it was UK and move to uni-question
// look to see if it was non uk - move to uni-question + 1 (i.e. 2-3)
// if the output was no then move to uni-question + 3 (i.e. 2-4)
// uni-question: the university that we are adding (uk)
// 2-3: all the questions about the foreign university
// 2-2: Did you go to another university
// 2-4: all the questions about parents and siblings
// 2-5: all the quesitons about experience at uni 1 (target of this survey)
const uniSteps = ['2-1', 'ask-another-qualification', '2-2', 'ask-next-qualification', 'uni-question', '2-3', '2-2-again', 'ask-next-qualification-again', '2-4', '2-5', 'summary-uni'];

const preUniSteps = ['3-1'];

class Viewer extends React.Component {
  getStepContent() {
    let content = null;

    const { step, answerData } = this.props.reduxState_this;

    console.log(step);

    if (bioSteps.includes(step)) {
      content = (
        <BioSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={bioSteps}
          currentStep={step}
          answerData={answerData}
          type="bio"
        />
      );
    } else if (uniSteps.includes(step)) {
      content = (
        <UniSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={uniSteps}
          currentStep={step}
          answerData={answerData}
          type="uni"
        />
      );
    } else if (preUniSteps.includes(step)) {
      content = (
        <PreUniSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={uniSteps}
          currentStep={step}
          answerData={answerData}
          type="uni"
        />
      );
    } else {
      content = <h1>Undone</h1>;
    }

    return content;
  }

  submitDataCallback(answerData, nextStep, type) {
    // we let null answer data get passed through here if we need to just change steps without any actual answer data
    let updateAnswerData = answerData;

    if (!dNc(updateAnswerData)) {
      updateAnswerData = this.props.reduxState_this.answerData;
    }

    // we always update the step assuming there was a next step passed
    if (nextStep !== null) {
      this.props.reduxAction_doUpdate({
        step: nextStep,
        answerData: updateAnswerData,
      });

      // we update the steps
      if (type === 'bio') {
        const stepIndex = bioSteps.indexOf(nextStep);

        if (stepIndex !== -1) {
          this.props.reduxAction_doUpdateStep({ currentStep: stepIndex + 1, stepCount: bioSteps.length });
        }
      } else if (type === 'uni') {
        const stepIndex = uniSteps.indexOf(nextStep);

        if (stepIndex !== -1) {
          this.props.reduxAction_doUpdateStep({ currentStep: stepIndex + 1, stepCount: uniSteps.length });
        }
      }
    // otherwise we look to see what type has been finished and then use that to define what to do next
    } else if (type === 'bio') {
      // bio finish
      this.props.reduxAction_doUpdate({
        step: uniSteps[0],
        answerData: updateAnswerData,
      });

      // update the steps
      this.props.reduxAction_doUpdateStep({ currentStep: 1, stepCount: uniSteps.length, section: 2 });
    } else if (type === 'uni') {
      this.props.reduxAction_doUpdate({
        step: preUniSteps[0],
        answerData: updateAnswerData,
      });

      this.props.reduxAction_doUpdateStep({ currentStep: 1, stepCount: preUniSteps.length, section: 3 });
    } else {
      console.log('TODO HANDLE NON KNOWN');
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Survey" />
        <div className="d-flex">
          <div className="left">
            <Navigation />
          </div>
          <div className="right">
            <div className="new-content container-fluid">
              <div className="section-padding">
                <h3 className="mb-0 dark-text">Welcome!</h3>
                <div style={{ marginTop: '4px' }} />
                <h6 className="grey-text mb-0">Hey there, welcome to AlumniBase.com - a tool to see what happened after university!</h6>
                <div style={{ marginTop: '20px' }} />
                <TopProgress />
                <div style={{ marginTop: '44px' }} />

                <div className="d-flex justify-content-center">
                  <div className="center-rectangle border-corners">
                    <div className="main-content-padding">
                      <div className="text-center">

                        {this.getStepContent()}

                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '44px' }} />
                <BottomProgress />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  reduxState_this: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
  reduxAction_doUpdateStep: PropTypes.func,
};

Viewer.defaultProps = {
  reduxState_this: {
    step: firstStep,
  },
  reduxAction_doUpdate: () => {},
  reduxAction_doUpdateStep: () => {},
};

const mapStateToProps = state => ({
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  reduxAction_doUpdateStep: data => dispatch(storeAction.doUpdate(dataStoreIDSteps, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
