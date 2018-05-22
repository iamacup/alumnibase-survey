
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dataStoreIDSteps, possibleSections } from '../../../../content/containers/Pages/University/AllSteps';
import { dNc } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'testHTML3';

class Navigation extends React.PureComponent {
  constructor(props) {
    super(props) 

    this.state = ({
      1: null,
      2: null,
      3: null,
      4: null, 
      5: null,
    })
  }

  render() {
    const { section } = this.props.reduxState_steps;

    let theSection = 1;

    if (dNc(section)) {
      theSection = section;
    }

    const handleClick = (sectionNum) => {
      const { realSection } = this.props.reduxState_steps;
      const { realStep } = this.props.reduxState_steps;
      const { stepName } = this.props.reduxState_steps;

      const summary = possibleSections[realSection][possibleSections[realSection].length - 1];

      // if the step we are moving to is 'not done' then we need to display not done
      // /otherwise we move to the step and show the summary information
      let stepTo = -1;
      let sectionTo = -1;
      let currentStep;

      if (sectionNum > realSection) {
        if (stepName === summary) {
          stepTo = realSection + 1 + '-1';
          sectionTo = sectionNum;
          currentStep = possibleSections[realSection].indexOf(stepName);
        } else if (this.state[sectionNum] !== null) {
        // we know its not done
          stepTo = possibleSections[sectionNum][this.state[sectionNum].realStep]
          sectionTo = sectionNum;
          currentStep = this.state[sectionNum].realStep + 1;
          this.setState({
            [realSection]: { realSection, realStep, step: possibleSections[realSection][realStep]  },  
          })

         } else { 
          stepTo = sectionNum + '-1'; // normally stepTo would be 'not-done'
          sectionTo = sectionNum;
          currentStep = 1;

          this.setState({
            [realSection] : { realSection, realStep, step: possibleSections[realSection][realStep]}
          })
        }
      } else if (sectionNum === realSection) {
        // we need to do nothing
        stepTo = possibleSections[sectionNum][realStep];
        sectionTo = realSection;
        currentStep = realStep + 1;
      } else if (this.state[sectionNum] !== null) {
        if (realSection > sectionNum) {
          stepTo = this.state[sectionNum].step;
          // possibleSections[sectionNum][possibleSections[sectionNum].length - 1];
          sectionTo = sectionNum;
          currentStep = possibleSections[sectionNum].length;
        } else {
        stepTo = possibleSections[sectionNum][this.state[sectionNum].realStep];
        sectionTo = sectionNum;
        currentStep = this.state[sectionNum].realStep;

            this.setState({
            [realSection]: { realSection, realStep, step: possibleSections[realSection][realStep] },  
          })
        }

      } else {
        // we go to the section and show the 'summary' thing       
        stepTo = sectionNum + '-1';
        sectionTo = sectionNum;
        currentStep = 1;

            this.setState({
            [realSection]: { realSection, realStep, stepTo: possibleSections[realSection][realStep]  },  
          })
      }

      this.props.reduxAction_doUpdate({
        step: stepTo,
      });

      this.props.reduxAction_doUpdateStep({ currentStep, stepCount: possibleSections[sectionNum].length, section: sectionTo });
    };


    return (
      <div className="new-nav">
        <div className="d-flex justify-content-center" id="title-mobile">
          <div className="title-text">
            <img className="ucl-logo" alt="University College London" src={require('../../../../content/theme/custom/images/UCL.png')} height="75px" />
          </div>
        </div>
        <div className="list-group list-group-flush" data-toggle="collapse" aria-expanded="false" id="margin-sidebar">
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 1 ? ' button-active' : '')} onClick={() => handleClick(1)}>Section 1 - About You</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 2 ? ' button-active' : '')} onClick={() => handleClick(2)}>Section 2 - Uni Study</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 3 ? ' button-active' : '')} onClick={() => handleClick(3)}>Section 3 - Pre Uni</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 4 ? ' button-active' : '')} onClick={() => handleClick(4)}>Section 4 - Employment</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 5 ? ' button-active' : '')} onClick={() => handleClick(5)}>Section 5 - Retrospective</button>
        </div>
        <div style={{ marginTop: '8px' }} />

        <div className="line" />

        <div style={{ marginTop: '22px' }} />

        <div style={{ marginLeft: '38px' }} className="medium-grey-text">
          <a href="/login"><h6 className="medium-grey-text"><i className="fal fa-cog" />  Settings</h6></a>
        </div>
      </div>
    );
  }
}

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
