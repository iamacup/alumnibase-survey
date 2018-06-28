
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dataStoreIDSteps, possibleSections } from '../../../../content/containers/Pages/University/AllSteps';
import { dNc } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'testHTML3';

class Navigation extends React.PureComponent {
  /* constructor(props) {
    super(props);

    this.state = ({
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    });
  } */

  handleClick(sectionNum) {
    const {
      realSection, realStep, stepName, currentStep, section,
    } = this.props.reduxState_steps;


    // realSection - the actual section the user has got to
    // realStep - the step number (array index)

    // currentStep - the actual rendered step number (array index) right now
    // stepCount - the numbers of possible steps for this section (section)
    // stepName - the name of the step 'like 1-1, summary, 2-3 etc.'
    // section - the current section

    /*
    finishedBio
    finishedUni
    finishedPreUni
    finishedPostUni

    bioLastCompleteStep
    uniLastCompleteStep
    preUniLastCompleteStep
    postUniLastCompleteStep
    retroLastCompleteStep
    */

    if (dNc(realSection) && dNc(realStep)) {
      let stepTo = currentStep;
      let sectionTo = section;
      let stepNameTo = null;

      if (dNc(stepName)) {
        stepNameTo = stepName;
      } else {
        stepNameTo = possibleSections[sectionTo][stepTo - 1];
      }

      const variables = [
        {
          sectionNum: 1,
          finishedName: 'finishedBio',
          lastStepName: 'bioLastCompleteStep',
        },
        {
          sectionNum: 2,
          finishedName: 'finishedUni',
          lastStepName: 'uniLastCompleteStep',
        },
        {
          sectionNum: 3,
          finishedName: 'finishedPreUni',
          lastStepName: 'preUniLastCompleteStep',
        },
        {
          sectionNum: 4,
          finishedName: 'finishedPostUni',
          lastStepName: 'postUniLastCompleteStep',
        },
        {
          sectionNum: 5,
          finishedName: 'finishedNOTUSED',
          lastStepName: 'retroLastCompleteStep',
        },
      ];

      variables.forEach((value) => {
        if (sectionNum === value.sectionNum) {
          if (dNc(this.props.reduxState_steps[value.finishedName]) && this.props.reduxState_steps[value.finishedName] === true) {
            // we have finished the section - show the summary
            stepTo = possibleSections[sectionNum].length;
            sectionTo = sectionNum;
            stepNameTo = possibleSections[sectionTo][stepTo - 1];
          } else if (dNc(this.props.reduxState_steps[value.lastStepName])) {
            // go to the last part of the section
            stepTo = this.props.reduxState_steps[value.lastStepName] + 1;
            sectionTo = sectionNum;
            stepNameTo = possibleSections[sectionTo][stepTo - 1];
          } else {
            // go to first step in the section
            stepTo = 1;
            sectionTo = sectionNum;
            stepNameTo = possibleSections[sectionTo][stepTo - 1];
          }
        }
      });

      console.log(stepTo);
      console.log(sectionTo);
      console.log(stepNameTo);

      this.props.reduxAction_doUpdate({
        step: stepNameTo,
      });

      this.props.reduxAction_doUpdateStep({
        currentStep: stepTo,
        section: sectionTo,
        stepName: stepNameTo,
        stepCount: possibleSections[sectionTo].length,
      });


      /* // set these to be where we are right now
      let stepTo = currentStep;
      let sectionTo = section;
      let stepNameTo = null;

      if (dNc(stepName)) {
        stepNameTo = stepName;
      } else {
        stepNameTo = possibleSections[sectionTo][stepTo - 1];
      }


      if(sectionNum > furthestFinishedSection) {
        //they are going further than they have finished - check to see if we know how far through this section they are


        //if not we just chuck them to section 1

      } else {
        //show the section summary

      }

      this.props.reduxAction_doUpdate({
        step: stepNameTo,
      });

      this.props.reduxAction_doUpdateStep({
        currentStep: stepTo,
        section: sectionTo,
        stepName: stepNameTo,
        stepCount: possibleSections[sectionTo].length,
      }); */
    }


    /* // we don't let step-traveral happen unless they have 'selected' a university
    if (dNc(realSection) && dNc(realStep)) {
      // set these to be where we are right now
      let stepTo = currentStep;
      let sectionTo = section;
      let stepNameTo = null;

      if (dNc(stepName)) {
        stepNameTo = stepName;
      } else {
        stepNameTo = possibleSections[sectionTo][stepTo - 1];
      }

      if (sectionNum > realSection) {
        // we send the user to the start of the section always in this case
        console.log('going forwards from where the user currently is');

        stepTo = 1;
        sectionTo = sectionNum;
        stepNameTo = possibleSections[sectionTo][0];
      } else if (sectionNum === realSection) {
        console.log('going to where the user actually is');

        stepTo = realStep + 1;
        sectionTo = realSection;
        stepNameTo = possibleSections[sectionTo][stepTo - 1];

        console.log(stepTo);
        console.log(sectionTo);
        console.log(stepNameTo);
      } else if (sectionNum < realSection) {
        console.log('going backwards from where the user actually is');
      } */


    /* const { realSection, realStep, stepName } = this.props.reduxState_steps;

    const summary = possibleSections[realSection][possibleSections[realSection].length - 1];

    console.log(possibleSections);
    console.log(realSection, realSection, stepName, summary);

    // if the step we are moving to is 'not done' then we need to display not done
    // /otherwise we move to the step and show the summary information
    let stepTo = -1;
    let sectionTo = -1;
    let currentStep;

    if (sectionNum > realSection) {
      console.log('we are navigating forwards');
      if (stepName === summary) {
        stepTo = realSection + 1 + '-1';
        sectionTo = sectionNum;
        currentStep = possibleSections[realSection].indexOf(stepName);
      } else if (this.state[sectionNum] !== null) {
        // we know its not done
        stepTo = possibleSections[sectionNum][this.state[sectionNum].realStep];
        sectionTo = sectionNum;
        currentStep = this.state[sectionNum].realStep + 1;
        this.setState({
          [realSection]: { realSection, realStep, step: possibleSections[realSection][realStep] },
        });
      } else {
        stepTo = sectionNum + '-1'; // normally stepTo would be 'not-done'
        sectionTo = sectionNum;
        currentStep = 1;
        this.setState({
          [realSection]: { realSection, realStep, step: possibleSections[realSection][realStep] },
        });
      }
    } else if (sectionNum === realSection) {
      console.log('we are navigating nowhere');
      // we need to do nothing
      stepTo = possibleSections[sectionNum][realStep];
      sectionTo = realSection;
      currentStep = realStep + 1;
    } else if (this.state[sectionNum] !== null) {
      console.log('we are navigating something?');
      if (realSection > sectionNum) {
        stepTo = this.state[sectionNum].step;
        // possibleSections[sectionNum][possibleSections[sectionNum].length - 1];
        sectionTo = sectionNum;
        currentStep = possibleSections[sectionNum].length;
        this.setState({
          [realSection]: { realSection, realStep, step: possibleSections[realSection][realStep] },
        });
      } else {
        stepTo = possibleSections[sectionNum][this.state[sectionNum].realStep];
        sectionTo = sectionNum;
        currentStep = this.state[sectionNum].realStep;

        this.setState({
          [realSection]: { realSection, realStep, step: possibleSections[realSection][realStep] },
        });
      }
    } else {
      console.log('don\'t know');
      // we go to the section and show the 'summary' thing
      stepTo = sectionNum + '-1';
      sectionTo = sectionNum;
      currentStep = 1;

      this.setState({
        [realSection]: { realSection, realStep, stepTo: possibleSections[realSection][realStep] },
      });
    }

    this.props.reduxAction_doUpdate({
      step: stepTo,
    });

    this.props.reduxAction_doUpdateStep({ currentStep, stepCount: possibleSections[sectionNum].length, section: sectionTo }); */
  }

  render() {
    const { section } = this.props.reduxState_steps;

    let theSection = 1;

    if (dNc(section)) {
      theSection = section;
    }

    const uniName = this.context.router.route.location.pathname.split('/')[1].toLowerCase();

    let uniBranding = (<div><span className="dark-text">University</span><span className="light-grey-text">Branding</span></div>);
    if (uniName === 'manchester-met' || uniName === 'aristotle' || uniName === 'uwe' || uniName === 'durham' || uniName === 'cranfield' || uniName === 'kings' ||
      uniName === 'loughborough' || uniName === 'oxford-brookes' || uniName === 'sheffield' || uniName === 'sheffield-hallam' ||
      uniName === 'ucl' || uniName === 'mmu' || uniName === 'liverpool-hope' || uniName === 'chester') {
      // eslint-disable-next-line import/no-dynamic-require
      if (uniName !== 'aristotle') uniBranding = <img className={`${uniName}-logo`} alt={uniName} src={require(`../../../../content/theme/custom/images/${uniName}.png`)} height="100px" />;
    } else this.context.router.history.push('/');

    return (
      <div className="new-nav">
        <div className="d-flex justify-content-center" id="title-mobile">
          <div className="title-text">
            {uniBranding}
          </div>
        </div>
        <div className="list-group list-group-flush" data-toggle="collapse" aria-expanded="false" id="margin-sidebar">
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 1 ? ' button-active' : '')} onClick={() => this.handleClick(1)}>Section 1 - About You</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 2 ? ' button-active' : '')} onClick={() => this.handleClick(2)}>Section 2 - Uni Study</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 3 ? ' button-active' : '')} onClick={() => this.handleClick(3)}>Section 3 - Pre Uni</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 4 ? ' button-active' : '')} onClick={() => this.handleClick(4)}>Section 4 - Employment</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 5 ? ' button-active' : '')} onClick={() => this.handleClick(5)}>Section 5 - Retrospective</button>
        </div>
        <div style={{ marginTop: '8px' }} />

        <div className="line" />

        <div style={{ marginTop: '22px' }} />

        <div style={{ marginLeft: '38px' }} className="medium-grey-text">
          <a href={`/${uniName}`}><h6 className="medium-grey-text"><i className="fal fa-cog" />  Settings</h6></a>
        </div>
      </div>
    );
  }
}

Navigation.contextTypes = {
  router: PropTypes.object,
};

Navigation.propTypes = {
  reduxState_steps: PropTypes.object,
  // reduxState_this: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
  reduxAction_doUpdateStep: PropTypes.func,
};

Navigation.defaultProps = {
  reduxState_steps: {
    currentStep: 1,
    stepCount: 7,
    section: 1,
  },
  // reduxState_this: {
  //   step: '0-1',
  // },
  reduxAction_doUpdate: () => {},
  reduxAction_doUpdateStep: () => {},
};

const mapStateToProps = state => ({
  reduxState_steps: state.dataStoreSingle[dataStoreIDSteps],
  // reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  reduxAction_doUpdateStep: data => dispatch(storeAction.doUpdate(dataStoreIDSteps, data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
