
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc } from '../../../content/scripts/custom/utilities';

const tickDuration = 50;
const addPercentage = 5;

class AnswerStatButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberPercentage: 0,
      barPercentage: 0,
    };
  }

  componentDidMount() {
    $(() => {
      setTimeout(() => { this.tick(); }, tickDuration);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // check that this update was caused by a change in the state for the current percentage
    if ((prevState.numberPercentage !== this.state.numberPercentage) ||
        (prevState.barPercentage !== this.state.barPercentage)) {
      // because it was, we check to see if we need to do more updates
      if (this.props.percentage !== this.state.numberPercentage) {
        setTimeout(() => { this.tick(); }, tickDuration);
      }
    }
  }

  tick() {
    const { percentage } = this.props;
    const { numberPercentage, barPercentage } = this.state;

    if (percentage !== numberPercentage) {
      const tickAmmount = Math.ceil((addPercentage / 100) * percentage);

      const newValue = numberPercentage + tickAmmount;

      if (newValue > percentage) {
        // set to percentage
        // console.log(percentage);
        // todo there is some situations where this happens when the component is not mounted
        this.setState({ numberPercentage: percentage, barPercentage: percentage });
      } else {
        // set to newValue
        // console.log(newValue);
        // todo there is some situations where this happens when the component is not mounted
        this.setState({ numberPercentage: newValue, barPercentage: percentage });
      }
    }
  }

  render() {
    const {
      answered, displayText,
    } = this.props;

    const { numberPercentage, barPercentage } = this.state;

    let className = 'answered-option-progress';

    if (answered === true) {
      className += ' answered';
    }

    return (
      <div className={className}>
        <div className="progress position-relative" style={{ height: '100%' }}>
          <div className="progress-bar" role="progressbar" style={{ width: barPercentage + '%' }} aria-valuenow={barPercentage} aria-valuemin="0" aria-valuemax="100" />

          <div className="justify-content-center d-flex position-absolute h-100 w-100">
            <div className="position-absolute" style={{ left: 0, paddingTop: '12px', paddingLeft: '20px' }}>
              <div className="truncate">
                {displayText}
              </div>
            </div>
            <div className="position-absolute grey-text" style={{ right: 0, paddingTop: '12px', paddingRight: '20px' }}>
              {numberPercentage} %
            </div>
          </div>

        </div>
      </div>
    );
  }
}

AnswerStatButton.propTypes = {
  answered: PropTypes.bool.isRequired,
  percentage: PropTypes.any.isRequired,
  displayText: PropTypes.string.isRequired,
};

export default AnswerStatButton;
