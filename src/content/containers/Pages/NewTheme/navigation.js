
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dataStoreIDSteps } from '../../../../content/containers/Pages/University/AllSteps';
import { dNc } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'testHTML3';

class Navigation extends React.PureComponent {
  handleClick = (section) => {
    const stepTo = section + '-1';

    // let updateAnswerData = {};

    //   if (!dNc(this.props.reduxState_this.answerData)) {
    //   updateAnswerData = this.props.reduxState_this.answerData;
    // }

     this.props.reduxAction_doUpdate({
        step: stepTo,
    //     answerData: updateAnswerData,
      });

    const refObj = {
      1: '8', 2: '11', 3: '4', 4: '7', 5: '5',
    };

    this.props.reduxAction_doUpdateStep({ currentStep: 1, stepCount: +refObj[section], section });
  }

  render() {
    const { section } = this.props.reduxState_steps;

    let theSection = 1;

    if (dNc(section)) {
      theSection = section;
    }

    return (
      <div className="new-nav">
        <div className="d-flex justify-content-center" id="title-mobile">
          <div className="title-text">
            <span className="dark-text">University</span> <span className="light-grey-text">Branding</span>
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
          <a href="mailto:hello@alumnibaseapp.com?Subject=Hello"><h6 className="medium-grey-text">some.email@example.com</h6></a>
          {/*   <div style={{ marginTop: '16px' }} />
                 <span className="h6"><i className="fal fa-question-circle" style={{ fontSize: '16px' }} /> Help</span> */}
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  reduxState_steps: PropTypes.object,
  reduxState_this: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
  reduxAction_doUpdateStep: PropTypes.func,
};

Navigation.defaultProps = {
  reduxState_steps: {
    currentStep: 1,
    stepCount: 7,
    section: 1,
  },
  reduxState_this: {
    step: '0-1',
  },
  reduxAction_doUpdate: () => {},
  reduxAction_doUpdateStep: () => {},
};

const mapStateToProps = state => ({
  reduxState_steps: state.dataStoreSingle[dataStoreIDSteps],
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  reduxAction_doUpdateStep: data => dispatch(storeAction.doUpdate(dataStoreIDSteps, data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
