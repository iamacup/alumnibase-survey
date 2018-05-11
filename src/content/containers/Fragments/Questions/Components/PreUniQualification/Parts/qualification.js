import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dNc,
  select2GetCorrectParent,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class Qualification extends React.Component {
  componentDidMount() {
    // wait for component to load
    $(() => {
       const dropdownParent = select2GetCorrectParent(this.input);
      const placeholder = 'Select a qualification';

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
      })
    })
  }

componentDidUpdate() {
  const { questionIdentifier, questionID, answer } = this.props;
  const validity = this.validate(this.props.answer);

  const gradeID = this.props.gradeAnswer.optionID;
  const qualificationID = this.props.answer.optionID;
  let qualificationGrades = [];

  this.props.drawData.resultOptions.forEach(element => {
    if (element.optionID === qualificationID) {
    qualificationGrades = element.options;
    }
  });

  let allGradeIDs = qualificationGrades.map(grade => grade.optionID)

  if (dNc(gradeID) && !allGradeIDs.includes(gradeID)) {
        this.props.reduxAction_doRemoveQuestionIdentifier(questionID, 'preUniQualifications-result')
      }

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

putItemIntoState(){
  const { questionIdentifier, questionID, options } = this.props;
  const optionID = $(this.input).val();
  let optionValue = null;

  this.props.options.forEach(option => {
    if (option.optionID === optionID) optionValue = option.optionValue;
  })

  const validity = this.validate({optionID, optionValue})

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
      error = "you need to choose an option"
    } else {
      valid = true;
    }
  } else {
    error = "please select a qualification";
  }
  return { valid, error, show }
}

  render() {
    const options = [<option key="start" hidden />];

    this.props.options.forEach((value) => {
      options.push(
        <option key={value.optionID} value={value.optionID}>
        {value.optionValue}
        </option>,
        )
    })

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


Qualification.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  reduxAction_doRemoveQuestionIdentifier: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  drawData: PropTypes.object.isRequired,
  gradeAnswer: PropTypes.object.isRequired,
  // allowAdd: PropTypes.bool.isRequired,
};

Qualification.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  reduxAction_doRemoveQuestionIdentifier: () => {},
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
reduxAction_doRemoveQuestionIdentifier: (questionID, questionIdentifier) =>
dispatch(questionAction.doRemoveQuestionIdentifier(questionID, questionIdentifier)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Qualification);
