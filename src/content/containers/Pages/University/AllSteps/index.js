
import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import fetchDataBuilder from '../../../../../foundation/redux/Factories/FetchData';

import Navigation from '../../../../../content/containers/Pages/NewTheme/navigation';
import TopProgress from '../../../../../content/containers/Pages/NewTheme/topProgress';
import BottomProgress from '../../../../../content/containers/Pages/NewTheme/bottomProgress';

import UniSteps from '../../../../../content/containers/Pages/University/AllSteps/uniSteps';
import BioSteps from '../../../../../content/containers/Pages/University/AllSteps/bioSteps';
import PreUniSteps from '../../../../../content/containers/Pages/University/AllSteps/preUniSteps';
import PostUniSteps from '../../../../../content/containers/Pages/University/AllSteps/postUniSteps';
import RetrospectiveSteps from '../../../../../content/containers/Pages/University/AllSteps/retrospectiveSteps';

import { dNc } from '../../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../../foundation/redux/globals/DataStoreSingle/actions';

// the id to store stuff for this wizzard panel
const dataStoreID = 'testHTML3';
export const dataStoreIDSteps = 'wizzardSteps';

// fetch actions constants
// const fetchDataTransactionStateMainID = 'wizzardUniEducationCompletion';
// const FetchEducation = fetchDataBuilder(fetchDataTransactionStateMainID);

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

const preUniSteps = ['3-1', '3-2', '3-3', 'summary-pre'];

const postUniSteps = ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', 'summary-post'];

const retrospectiveSteps = ['5-1', '5-2', '5-3', '5-4', 'summary-retrospective', 'final-page'];

const notDoneStep = ['not-done'];

export const possibleSections = {
  1: ['0-1', 'intro', 'terms', '1-1', '1-2', '1-3', '1-4', 'summary-bio'],
  2: ['2-1', 'ask-another-qualification', '2-2', 'ask-next-qualification', 'uni-question', '2-3', '2-2-again', 'ask-next-qualification-again', '2-4', '2-5', 'summary-uni'],
  3: ['3-1', '3-2', '3-3', 'summary-pre'],
  4: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', 'summary-post'],
  5: ['5-1', '5-2', '5-3', '5-4', 'summary-retrospective', 'final-page'],
};

class Viewer extends React.Component {
  componentDidMount() {
    // button to open responsive navbar on a small screen.
    $(this.buttonDOM).click(() => {
      $('.left').slideToggle();
      $('.overlay').fadeIn();
    });

    // button inside the responsive navbar to hide it.
    $(this.buttonDOM2).click(() => {
      $('.left').toggle();
      $('.overlay').fadeOut();
    });

    $('.overlay').click(() => {
      $('.left').toggle();
      $('.overlay').toggle();
    });
  }

  getStepContent() {
    let content = null;
    let answerData = {};
    const { step } = this.props.reduxState_this;

    if (this.props.reduxState_this.answerData) ({ answerData } = this.props.reduxState_this);

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
          steps={preUniSteps}
          currentStep={step}
          answerData={answerData}
          type="preuni"
        />
      );
    } else if (postUniSteps.includes(step)) {
      content = (
        <PostUniSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={postUniSteps}
          currentStep={step}
          answerData={answerData}
          type="postuni"
        />
      );
    } else if (retrospectiveSteps.includes(step)) {
      content = (
        <RetrospectiveSteps
          // eslint-disable-next-line no-shadow
          submitDataCallback={(answerData, nextStep, type) => { this.submitDataCallback(answerData, nextStep, type); }}
          steps={retrospectiveSteps}
          currentStep={step}
          answerData={answerData}
          type="retro"
        />
      );
    } else if (notDoneStep.includes(step)) {
      content = (
        <div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-10 m-3">
                <h3>Ooops!</h3>
                <h4>You will need to finish the previous sections to view this page.</h4>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      content = <h1>Undone</h1>;
    }

    return content;
  }

  submitDataCallback(answerData, nextStep, type) {
    // we let null answer data get passed through here if we need to just change steps without any actual answer dat
    let updateAnswerData = answerData;

    if (!dNc(updateAnswerData)) {
      updateAnswerData = this.props.reduxState_this.answerData;
    }

    // this is some code we can use to force test a series of steps after 0-1 is complete (i.e. a sessionID is assigned and a uni picked)
    // if (this.props.reduxState_this.step === '0-1') {
    //   const stepTo = '4-1';

    //   this.props.reduxAction_doUpdate({
    //     step: stepTo,
    //     answerData: updateAnswerData,
    //   });

    //   this.props.reduxAction_doUpdateStep({ currentStep: 1, stepCount: retrospectiveSteps.length, section: 5 });

    //   return;
    // }

    // we always update the step assuming there was a next step passed
    // eslint-disable-next-line no-unreachable
    if (nextStep !== null) {
      this.props.reduxAction_doUpdate({
        step: nextStep,
        answerData: updateAnswerData,
      });

      // we update the steps
      if (type === 'bio') {
        const stepIndex = bioSteps.indexOf(nextStep);

        if (stepIndex !== -1) {
          this.props.reduxAction_doUpdateStep({
            currentStep: stepIndex + 1, stepCount: bioSteps.length, realSection: 1, realStep: stepIndex, stepName: '1-' + stepIndex, bioLastCompleteStep: stepIndex,
          });
        }
      } else if (type === 'uni') {
        const stepIndex = uniSteps.indexOf(nextStep);

        if (stepIndex !== -1) {
          this.props.reduxAction_doUpdateStep({
            currentStep: stepIndex + 1, stepCount: uniSteps.length, realSection: 2, realStep: stepIndex, stepName: '2-' + stepIndex, uniLastCompleteStep: stepIndex,
          });
        }
      } else if (type === 'preuni') {
        const stepIndex = preUniSteps.indexOf(nextStep);

        if (stepIndex !== -1) {
          this.props.reduxAction_doUpdateStep({
            currentStep: stepIndex + 1, stepCount: preUniSteps.length, realSection: 3, realStep: stepIndex, stepName: '3-' + stepIndex, preUniLastCompleteStep: stepIndex,
          });
        }
      } else if (type === 'postuni') {
        const stepIndex = postUniSteps.indexOf(nextStep);

        if (stepIndex !== -1) {
          this.props.reduxAction_doUpdateStep({
            currentStep: stepIndex + 1, stepCount: postUniSteps.length, realSection: 4, realStep: stepIndex, stepName: '4-' + stepIndex, postUniLastCompleteStep: stepIndex,
          });
        }
      } else if (type === 'retro') {
        const stepIndex = retrospectiveSteps.indexOf(nextStep);

        if (stepIndex !== -1) {
          this.props.reduxAction_doUpdateStep({
            currentStep: stepIndex + 1, stepCount: retrospectiveSteps.length, realSection: 5, realStep: stepIndex, stepName: '5-' + stepIndex, retroLastCompleteStep: stepIndex,
          });
        }
      }
    // otherwise we look to see what type has been finished and then use that to define what to do next
    } else if (type === 'bio') {
      let useNextStep = 1;
      let useStepName = uniSteps[0];

      if (dNc(this.props.reduxState_steps.uniLastCompleteStep)) {
        const { uniLastCompleteStep } = this.props.reduxState_steps;
        useNextStep = uniLastCompleteStep + 1;
        useStepName = uniSteps[uniLastCompleteStep];
      }

      // bio finish
      this.props.reduxAction_doUpdate({
        step: useStepName,
        answerData: updateAnswerData,
      });

      // update the steps
      this.props.reduxAction_doUpdateStep({
        currentStep: useNextStep, stepCount: uniSteps.length, section: 2, realSection: 2, realStep: useNextStep, stepName: useStepName, finishedBio: true,
      });
    } else if (type === 'uni') {
      let useNextStep = 1;
      let useStepName = preUniSteps[0];

      if (dNc(this.props.reduxState_steps.preUniLastCompleteStep)) {
        const { preUniLastCompleteStep } = this.props.reduxState_steps;
        useNextStep = preUniLastCompleteStep + 1;
        useStepName = preUniSteps[preUniLastCompleteStep];
      }

      this.props.reduxAction_doUpdate({
        step: useStepName,
        answerData: updateAnswerData,
      });

      this.props.reduxAction_doUpdateStep({
        currentStep: useNextStep, stepCount: preUniSteps.length, section: 3, realSection: 3, realStep: useNextStep, stepName: useStepName, finishedUni: true,
      });
    } else if (type === 'preuni') {
      let useNextStep = 1;
      let useStepName = postUniSteps[0];

      if (dNc(this.props.reduxState_steps.postUniLastCompleteStep)) {
        const { postUniLastCompleteStep } = this.props.reduxState_steps;
        useNextStep = postUniLastCompleteStep + 1;
        useStepName = postUniSteps[postUniLastCompleteStep];
      }

      this.props.reduxAction_doUpdate({
        step: useStepName,
        answerData: updateAnswerData,
      });

      this.props.reduxAction_doUpdateStep({
        currentStep: useNextStep, stepCount: postUniSteps.length, section: 4, realSection: 4, realStep: useNextStep, stepName: useStepName, finishedPreUni: true,
      });
    } else if (type === 'postuni') {
      let useNextStep = 1;
      let useStepName = retrospectiveSteps[0];

      if (dNc(this.props.reduxState_steps.retroLastCompleteStep)) {
        const { retroLastCompleteStep } = this.props.reduxState_steps;
        useNextStep = retroLastCompleteStep + 1;
        useStepName = retrospectiveSteps[retroLastCompleteStep];
      }

      this.props.reduxAction_doUpdate({
        step: useStepName,
        answerData: updateAnswerData,
      });

      this.props.reduxAction_doUpdateStep({
        currentStep: useNextStep, stepCount: retrospectiveSteps.length, section: 5, realSection: 5, realStep: useNextStep, stepName: useStepName, finishedPostUni: true,
      });
    } else {
      console.log(type);
      console.log('TODO HANDLE NON KNOWN');
      console.log('the wizzard is finished OR in a bad state?');
    }
  }

  render() {
    const uniName = this.context.router.route.location.pathname.slice(1).toLowerCase();

    let uniBranding = (<div><span className="dark-text">University</span><span className="light-grey-text">Branding</span></div>);
    let uniBranding2 = (<div><span className="dark-text">University</span><span className="light-grey-text">Branding</span></div>);

    if (uniName === 'uwe' || uniName === 'durham' || uniName === 'cranfield' || uniName === 'kings' || uniName === 'loughborough' || uniName === 'oxford-brookes' || uniName === 'sheffield' || uniName === 'sheffield-hallam' || uniName === 'ucl' || uniName === 'mmu' || uniName === 'liverpool-hope' || uniName === 'chester') {
      // eslint-disable-next-line import/no-dynamic-require
      uniBranding = <img className={`${uniName}-logo`} alt={uniName} src={require(`../../../../../content/theme/custom/images/${uniName}.png`)} height="65px" />;
      // eslint-disable-next-line import/no-dynamic-require
      uniBranding2 = <img className={`${uniName}-logo`} alt={uniName} src={require(`../../../../../content/theme/custom/images/${uniName}.png`)} height="60px" />;
    }

    return (
      <div>
        <Helmet title="Survey" />
        <div className="d-flex">
          <div className="left">
            <div className="navigation-toggle" id="content">
              <div className="row align-items-center" id="mobile-navbar">
                <div className="col-2">
                  <button type="button" id="navigation-toggle" className="btn btn-light" ref={(buttonDOM) => { this.buttonDOM2 = buttonDOM; }} style={{ borderColor: '#fff' }}><i className="fal fa-bars" style={{ fontSize: '25px' }} /></button>
                </div>
                <div className="col-10 pl-4">
                  <div className="title-text">
                    {uniBranding}
                  </div>
                </div>
              </div>
            </div>
            <Navigation />
            <div className="row mx-2 ml-4" style={{ position: 'absolute', bottom: '20px', left: '0' }}>
              <div className="col-4">
                <a href={`/${uniName}/`}><h6 className="medium-grey-text">Privacy</h6></a>
              </div>
              <div className="col-4">
                <a href={`/${uniName}/`}><h6 className="medium-grey-text">Terms</h6></a>
              </div>
              <div className="col-4">
                <a href={`/${uniName}/`}><h6 className="medium-grey-text">Cookies</h6></a>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="navigation-toggle" id="content">
              <div className="row align-items-center" id="mobile-navbar">
                <div className="col-2 pl-4">
                  <button type="button" className="btn btn-light" ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }} style={{ borderColor: '#fff' }}><i className="fal fa-bars" style={{ fontSize: '25px' }} /></button>
                </div>
                <div className="col-8 text-center">
                  <div className="title-text">
                    {uniBranding2}
                  </div>
                </div>
              </div>
            </div>
            <div className="overlay" />
            <div className="new-content container-fluid">
              <div className="section-padding">
                <h3 className="dark-text">Welcome!</h3>
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
        <div className="overlay" />
      </div>
    );
  }
}

Viewer.contextTypes = {
  router: PropTypes.object,
};

Viewer.propTypes = {
  reduxState_this: PropTypes.object,
  reduxState_steps: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
  reduxAction_doUpdateStep: PropTypes.func,
};

Viewer.defaultProps = {
  reduxState_this: {
    step: firstStep,
  },
  reduxState_steps: {},
  reduxAction_doUpdate: () => {},
  reduxAction_doUpdateStep: () => {},
};

const mapStateToProps = state => ({
  reduxState_this: state.dataStoreSingle[dataStoreID],
  // todo we don't really want to be hooked into this unless we really need to - we don't need to once we take 'demo mode' off and don't need to step skip
  reduxState_steps: state.dataStoreSingle[dataStoreIDSteps],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  reduxAction_doUpdateStep: data => dispatch(storeAction.doUpdate(dataStoreIDSteps, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
