import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class FreeTextQuestionMultilineComponent extends React.Component {
  componentDidUpdate() {
    this.setValueFromState();

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

    // if we are force validating, and the validity is true, but there is no valid answer in the state - we make sure there is an answer in the state
    // this caters for optional values etc.
    const { drawData } = this.props;

    if (
      this.props.forceValidate === true &&
      validity.valid === true &&
      (!dNc(this.props.answer) || !dNc(this.props.answer.optionValue))
    ) {
      this.handleChange();
    } else if (drawData.minLength === 0) {
      // here we check for optional, if found then we just set the thing to valid instantly
      if (dNc(this.props.answer) && this.props.answer.valid !== true) {
        this.handleChange();
      }
    }
  }

  setValueFromState() {
    if (dNc(this.props.answer.optionValue) && this.props.answer.optionID === "town-area-city") {
      this.input.value = this.props.answer.optionValue;
    }
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;
    const { drawData } = this.props;

    if (dNc(answer) && dNc(answer.optionValue)) {
      if (answer.optionValue.length < 1) {
        error =
          'Your answer must be at least ' +
          drawData.minLength +
          ' characters long';
        show = true;
      } else if (answer.optionValue.length > 20) {
        error =
          'There is too much text in here. The max length is ' +
          drawData.maxLength;
        show = true;
      } else {
        valid = true;
      }
    } else {
      error = 'You need to enter a value.';
    }

    return { valid, error, show };
  }

  handleChange() {
    const optionValue = this.input.value;
    const optionID = 'town-area-city';

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

    handleFocus() {
    this.handleChange();
  }

  render() {

    let classChange = 'form-control';
    if (this.props.answer.optionID === 'postcode') classChange = 'form-control hide-green';

    return (
      <span className="form-group">
        <input
        placeholder="Town"
          type="text"
          className={classChange}
          ref={(input) => {
            this.input = input;
          }}
          onChange={() => {
            this.handleChange();
          }}
               onFocus={() => {
            this.handleFocus();
          }}
        />
      </span>
    );
  }
}

FreeTextQuestionMultilineComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  drawData: PropTypes.object.isRequired,
};

FreeTextQuestionMultilineComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
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
  reduxAction_doSetQuestionError: (questionID, message, name) =>
    dispatch(questionAction.doSetQuestionError(questionID, message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  FreeTextQuestionMultilineComponent,
);
