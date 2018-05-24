import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dNc,
  select2GetCorrectParent,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class Grade extends React.Component {
  componentDidMount() {

    $(() => {
      const dropdownParent = select2GetCorrectParent(this.input);
      const placeholder = 'Select a grade';

      $(this.input)
        .select2({
          placeholder,
          allowClear: false,
          width: '100%',
          dropdownParent,
        })
        .on('change', () => {
          if (dNc($(this.input).val())) {
            this.putItemIntoState();
          }
        });
      this.setStateWithFalseValidation()
    });
  }

  componentDidUpdate() {
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
  }

  setStateWithFalseValidation() {
    const { questionIdentifier, questionID } = this.props;
    const optionID = null;
    let optionValue = null;
    const validity = this.validate({ optionID, optionValue });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  putItemIntoState() {
    const { questionIdentifier, questionID } = this.props;
    const optionID = $(this.input).val();
    let optionValue = null;
    let propOptions = null;

    this.props.drawData.resultOptions.forEach((data) => {
      if (this.props.qualificationAnswer.optionID === data.optionID) propOptions = data.options;
    });

    if (dNc(propOptions)) {
      propOptions.forEach((option) => {
        if (optionID === option.optionID) optionValue = option.displayValue;
      });
    }

    const validity = this.validate({ optionID, optionValue });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  validate(answer) {
    let error = '';
    const show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionValue)) {
      if (answer.optionValue.length < 1) {
        error = 'you need to choose an option';
      } else {
        valid = true;
      }
    } else {
      error = 'please select a grade';
    }
    return { valid, error, show };
  }

  render() {
    const { optionID } = this.props.qualificationAnswer;
    let propOptions = null;

    this.props.drawData.resultOptions.forEach((data) => {
      if (optionID === data.optionID) propOptions = data.options;
    });

    const options = [<option key="start" hidden />];

    if (dNc(propOptions)) {
      propOptions.forEach((value) => {
        options.push(
          <option key={value.optionID} value={value.optionID}>
            {value.displayValue}
          </option>,
        );
      });
    }

    return (
      <div>
        <select
          ref={(input) => {
                  this.input = input;
                }}
        >
          {options}
        </select>
      </div>
    );
  }
}

Grade.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  // options: PropTypes.array.isRequired,
  drawData: PropTypes.object.isRequired,
  qualificationAnswer: PropTypes.object.isRequired,
  // allowAdd: PropTypes.bool.isRequired,
};

Grade.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Grade);
