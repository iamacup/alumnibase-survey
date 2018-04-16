
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dataStoreIDSteps } from '../../../../content/containers/Pages/University/AllSteps';
import { dNc } from '../../../../content/scripts/custom/utilities';

class BottomProgress extends React.PureComponent {
  render() {
    const { currentStep, stepCount, section } = this.props.reduxState_steps;

    let baseProgress = 0;

    if (dNc(section)) {
      if (section === 2) {
        baseProgress = 20;
      } else if (section === 3) {
        baseProgress = 40;
      } else if (section === 4) {
        baseProgress = 60;
      } else if (section === 5) {
        baseProgress = 80;
      }
    }

    const sectionProgress = Math.round((currentStep / stepCount) * 100);
    const numberOfSteps = 5;
    const sectionProgressNormalised = Math.round(sectionProgress / numberOfSteps);
    const totalProgress = baseProgress + sectionProgressNormalised;

    return (
      <div className="top-bottom-rectangle border-corners" style={{ height: '66px' }}>
        <div className="progress overall-progress-corner-modifier" style={{ height: '8px' }}>
          <div className="progress-bar" role="progressbar" style={{ width: totalProgress + '%' }} aria-valuenow={totalProgress} aria-valuemin="0" aria-valuemax="100" />
        </div>

        <div className="row justify-content-between">

          <div className="col-auto mr-auto">
            <div style={{ marginTop: '13px', marginLeft: '34px' }} className="dark-text">
              <h4>Overall Progress</h4>
            </div>
          </div>

          <div className="col-auto">
            <div style={{ marginTop: '13px', marginRight: '34px' }} className="grey-text">
              <h4>{totalProgress}%</h4>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

BottomProgress.propTypes = {
  reduxState_steps: PropTypes.object,
};

BottomProgress.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomProgress);
