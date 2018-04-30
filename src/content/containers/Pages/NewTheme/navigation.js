
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dataStoreIDSteps } from '../../../../content/containers/Pages/University/AllSteps';
import { dNc } from '../../../../content/scripts/custom/utilities';

class Navigation extends React.PureComponent {
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
            <img className="cranfield-logo" alt="cranfield-logo" src="http://geebeeworld.com/wp-content/uploads/Marques-Cranfield-University-UK.png" height="150px" />
          </div>
        </div>
        <div className="list-group list-group-flush" data-toggle="collapse" aria-expanded="false" id="margin-sidebar">
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 1 ? ' button-active' : '')}>Section 1 - About You</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 2 ? ' button-active' : '')}>Section 2 - Uni Study</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 3 ? ' button-active' : '')}>Section 3 - Pre Uni</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 4 ? ' button-active' : '')}>Section 4 - Employment</button>
          <button type="button" className={'list-group-item list-group-item-action button' + (theSection === 5 ? ' button-active' : '')}>Section 5 - Retrospective</button>
        </div>
        <div style={{ marginTop: '8px' }} />

        <div className="line" />

        <div style={{ marginTop: '22px' }} />

        <div style={{ marginLeft: '38px' }} className="medium-grey-text">
          <h6>some.email@example.com</h6>
          <div style={{ marginTop: '16px' }} />
          <span className="h6"><i className="fal fa-question-circle" style={{ fontSize: '16px' }} /> Help</span>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  reduxState_steps: PropTypes.object,
};

Navigation.defaultProps = {
  reduxState_steps: {
    currentStep: 1,
    stepCount: 7,
    section: 1,
  },
};

const mapStateToProps = state => ({
  reduxState_steps: state.dataStoreSingle[dataStoreIDSteps],
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
