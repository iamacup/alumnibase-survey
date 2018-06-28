
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dataStoreIDSteps } from '../../../../content/containers/Pages/University/AllSteps';
import { dNc } from '../../../../content/scripts/custom/utilities';

class TopProgress extends React.PureComponent {
  render() {
    const { currentStep, stepCount, section } = this.props.reduxState_steps;

    let sectionTitle = 'Section 1 - About You';

    if (dNc(section)) {
      if (section === 2) {
        sectionTitle = 'Section 2 - Uni Study';
      } else if (section === 3) {
        sectionTitle = 'Section 3 - Pre Uni';
      } else if (section === 4) {
        sectionTitle = 'Section 4 - Employment';
      } else if (section === 5) {
        sectionTitle = 'Section 5 - Retrospective';
      }
    }

    const percentComplete = Math.round((currentStep / stepCount) * 100);

    return (
      <div className="top-bottom-rectangle border-corners pb-2">
        <div className="row justify-content-between">

          <div className="col-auto mr-auto">
            <div style={{ marginTop: '14px', marginLeft: '34px' }} className="dark-text">
              <i className="far fa-arrow-left grey-text" style={{ fontSize: '18px' }} />
              <span className="dark-text h4" style={{ marginLeft: '20px' }}>{sectionTitle}</span>
            </div>
          </div>

          <div className="col-auto ml-5">
            <div style={{ marginTop: '14px', marginRight: '34px' }}>
              <div className="row no-gutters">

                <div className="col-xs-auto col-10 pl-3">
                  <div style={{ width: '145px', marginTop: '9px' }} id="bar">
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: percentComplete + '%' }} aria-valuenow={percentComplete} aria-valuemin="0" aria-valuemax="100" />
                    </div>
                  </div>
                </div>

                <div className="col-xs-auto col-2">
                  <div style={{ marginTop: '3px', marginLeft: '14px' }}>
                    <div className="h6">
                      <span className="dark-text">{currentStep}</span><span className="grey-text">/{stepCount}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

TopProgress.propTypes = {
  reduxState_steps: PropTypes.object,
};

TopProgress.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TopProgress);
