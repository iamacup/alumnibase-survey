import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AnimationContainer from '../../../../../../../content/components/AnimationContainer';

import {
  dNc,
  debounce,
  isNumeric,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class Bonus extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      // eslint-disable-next-line no-undef
      const im = new Inputmask('numeric', {
        radixPoint: '.',
        groupSeparator: ',',
        digits: 2,
        autoGroup: true,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        prefix: this.props.currencySymbol + ' ',
        rightAlign: false,
        autoUnmask: true,
      });

      im.mask(this.bonusTextInput);

      const executeFunction = debounce(() => {
        let optionValue = this.bonusTextInput.inputmask.unmaskedvalue();
        const optionID = null;

        optionValue = optionValue.split('.');
        optionValue =
          optionValue.shift() +
          (optionValue.length ? '.' + optionValue.join('') : '');

        const { questionID, questionIdentifier } = this.props;
        const validity = this.validate({ optionValue, optionID });

        this.props.reduxAction_doUpdateQuestionAnswer(
          questionID,
          questionIdentifier,
          optionID,
          optionValue,
          validity.valid,
        );
      }, 253);

      $(this.bonusTextInput).on('input', executeFunction);
    });
  }

  componentDidUpdate() {
    const { questionIdentifier, questionID, answer } = this.props;
    const validity = this.validate(this.props.answer);

    // set stuff as an error if they need to be
    if (
      validity.valid === false &&
      (validity.show === true || this.props.forceValidate === true) &&
      answer.errorMessage !== validity.error
    ) {
      this.props.reduxAction_doSetQuestionError(
        questionID,
        validity.error,
        questionIdentifier,
      );
    }

    // update the currency prefix for this mask
    if (dNc(this.bonusTextInput.inputmask)) {
      this.bonusTextInput.inputmask.option({
        prefix: this.props.currencySymbol + ' ',
      });
    }
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;

    if (this.props.unpaidValidity) {
      valid = true;
    } else if (dNc(answer) && dNc(answer.optionValue)) {
      if (answer.optionValue === '_NO_BONUS_' && answer.optionID === null) {
        valid = true;
      } else if (answer.optionValue.length < 1) {
        error = 'Please enter a bonus value.';
      } else if (!isNumeric(answer.optionValue)) {
        error = 'The bonus does not appear to be a number.';
        show = true;
      // } else if (answer.optionValue < 0) {
      //   error = 'Your bonus must be positive!';
      //   show = true;
      } else {
        valid = true;
      }
    } else {
      error = 'You need to enter a bonus value.';
    }
    return { valid, error, show };
  }

  doNextStepCallback(e) {
    if (e.keyCode === 13) {
      this.props.nextStepCallback();
    }
  }

  noBonusButton(dataArr) {
    console.log(dataArr);
    const optionID = null;
    const optionValue = '_NO_BONUS_';

    const { questionID, questionIdentifier } = this.props;
    const validity = this.validate({ optionValue, optionID });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  render() {
    const value = this.props.answer;

    let className = 'btn btn-block btn-option btn-multiline btn-margin';
    let style = '#3c3c3c';

    if (dNc(value.optionValue) && value.optionValue === '_NO_BONUS_') {
      className += ' btn-emphasis show-green';
      style = '#fff';
    }

    if (value.optionValue !== '_NO_BONUS_') {
      className = 'btn btn-block btn-option btn-multiline btn-margin';
    }

    return (
      <AnimationContainer animationClass="flipInX">
        <div className="row">
          <span className="form-group">
            <input
              onKeyUp={(e) => {
                  this.doNextStepCallback(e);
                }}
              placeholder="Bonus"
              className="form-control"
              ref={(input) => {
                  this.bonusTextInput = input;
                }}
            />
          </span>
        </div>
        <div className="row">
          <button
            onClick={() => {
                this.noBonusButton();
              }}
            className={className}
            style={{ color: style }}
          >
              No Bonus
          </button>
        </div>
      </AnimationContainer>
    );
  }
}

Bonus.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  // options: PropTypes.array.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  unpaidValidity: PropTypes.bool.isRequired,
};


Bonus.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  nextStepCallback: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdateQuestionAnswer: (
    questionID,
    name,
    optionID,
    optionValue,
    valid,
  ) =>
    dispatch(
      questionAction.doUpdateQuestionAnswer(
        questionID,
        name,
        optionID,
        optionValue,
        valid,
      ),
    ),
  reduxAction_doSetQuestionError: (questionID, message, name) => dispatch(questionAction.doSetQuestionError(questionID, message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Bonus,
);
