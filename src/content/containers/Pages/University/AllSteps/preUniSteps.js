
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NewWizzardPane from '../../../../../content/containers/Fragments/NewWizzardPane';

import { dataStoreIDSteps, possibleSections } from '../../../../../content/containers/Pages/University/AllSteps';
import { nextElementInArray } from '../../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'testHTML3';

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

    const uniName = this.props.answerData.data['questions/42953580507_0'].universityName.optionValue;

    const pageButton = (
      <div className="center-question" style={{ paddingBottom: '0px' }}>
        <h5 className="dark-text" style={{ marginBottom: '22px' }}>Ready to proceed?</h5>
        <h6 className="grey-text">You can return here at any time using the navigation on the left.</h6>
        <button className="btn btn-block btn-next-step answered btn-margin" onClick={() => { this.handleSubmit(null); }} >
          Next Step!
        </button>
      </div>
    );

    /* if (this.props.reduxState_steps.realSection > this.props.reduxState_steps.section) {
      pageButton = (
        <div className="center-question" style={{ paddingBottom: '0px' }}>
          <button className="btn btn-block btn-next-step answered btn-margin" onClick={() => { this.handleSummaryButtonClick(); }}>
                    Continue survey?
          </button>
        </div>
      );
    } */

    if (currentStep === '3-1') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4 className="accent-text">Pre Uni Events</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '3-2') {
      content = (
        <div>
          <h3>{uniName}</h3>
          <h4 className="accent-text">Location & Qualifications</h4>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === '3-3') {
      content = (
        <div>
          <h3>Pre {uniName}</h3>
          <div>
            <div style={{ marginTop: '36px' }} />
            {wizzard}
          </div>
        </div>
      );
    } else if (currentStep === 'summary-pre') {
      content = (
        <div>

          <h4>Thanks for completing section 3!</h4>
          <h5 className="accent-text">Here's what your university alumni are up to!</h5>

          <div style={{ marginTop: '26px' }} />

          <div>
            <img alt="s3" className="img-fluid" src={require('../../../../../content/theme/custom/images/s3.png')} />
          </div>

          <div style={{ marginTop: '26px' }} />

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

  handleSubmit(answerData) {
    const { steps, currentStep, type } = this.props;

    const next = nextElementInArray(steps, currentStep);

    this.props.submitDataCallback(answerData, next, type);
  }

  /* handleSummaryButtonClick() {
    const { realSection } = this.props.reduxState_steps;
    const { realStep } = this.props.reduxState_steps;

    const stepTo = possibleSections[realSection][realStep];

    this.props.reduxAction_doUpdate({
      step: stepTo,
    });

    this.props.reduxAction_doUpdateStep({ currentStep: realStep + 1, stepCount: possibleSections[realSection].length, section: realSection });
  } */

  render() {
    console.log('render pre uni step: ' + this.props.currentStep);
    return this.getStepContent();
  }
}

Viewer.propTypes = {
  reduxState_steps: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
  reduxAction_doUpdateStep: PropTypes.func,
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.string.isRequired,
  submitDataCallback: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  answerData: PropTypes.object.isRequired,
};

Viewer.defaultProps = {
  reduxState_steps: {
    currentStep: 11,
    stepCout: 11,
    section: 1,
  },
  reduxAction_doUpdate: () => {},
  reduxAction_doUpdateStep: () => {},
};

const mapStateToProps = state => ({
  reduxState_steps: state.dataStoreSingle[dataStoreIDSteps],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  reduxAction_doUpdateStep: data => dispatch(storeAction.doUpdate(dataStoreIDSteps, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
