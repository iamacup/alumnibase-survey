import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';
import checkPostCode from '../../../../../../../content/scripts/vendor/postcodes';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class PostcodeQuestionPostcodeComponent extends React.Component {
  componentDidUpdate() {
    this.setValueFromState();

    const { questionIdentifier, questionID, answer } = this.props;
    const validity = this.validate(this.props.answer);

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

// calls to reset the state with the new input after off clicking the don't know button.
// clicking the butotn off cleates a new state optionID of -2
// this is quickly overthrown by the handleChange. 
    if(answer.optionID === -2) {
      this.handleChange();
    }
  }

  setValueFromState() {
    if (dNc(this.props.answer) && dNc(this.props.answer.optionValue)) {
      this.input.value = this.props.answer.optionValue;
    }
  }

  validate(answer) {
    let error = '';
    const show = false;
    let valid = false;

    if (dNc(answer.optionID) && checkPostCode(answer.optionValue)) {
      valid = false;
    } else if (dNc(answer) && dNc(answer.optionValue)) {
      if (!dNc(answer.optionID) && checkPostCode(answer.optionValue) === false) {
        error = 'This does not appear to be a valid postcode.';
      } else valid = true;
    } else valid = false;

    return { valid, error, show };
  }

  handleChange() {
    let optionValue = this.input.value;
    const optionID = null;

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

//  Calls to reset the state with the value in the input form on click back to input.
  handleFocus() {
    this.handleChange();
  }

  render() {
// if the button is clicked the input form will turn back to grey if id had been validated.
  let classChange = "form-control"
  if (this.props.answer.optionID === -1) classChange = "form-control hide-green"

    return (
        <input
          placeholder="Your Postcode"
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
    );
  }
}

PostcodeQuestionPostcodeComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  drawData: PropTypes.object.isRequired,
};

PostcodeQuestionPostcodeComponent.defaultProps = {
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
  PostcodeQuestionPostcodeComponent,
);
