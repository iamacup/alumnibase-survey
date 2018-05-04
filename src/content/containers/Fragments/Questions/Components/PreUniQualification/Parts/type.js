
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AnswerData from '../../../../../../../content/components/Answers/answerData';

import {
  dNc,
  select2GetCorrectParent,
  select2EnableOpenOnFocus,
  setSelect2Value,
  encodeEntities,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

// eslint-disable-next-line no-useless-escape
const pattern = new RegExp('^options/[0-9]+$', 'i');

class SelectQuestionCompanySelectWithRemoteLookupComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      const dropdownParent = select2GetCorrectParent(this.input);
      const placeholder = 'Please select a qualification';

      $(this.input)
        .select2({
          placeholder,
          allowClear: false,
          width: '100%',
          dropdownParent,
        })
        .on('change', () => {
          this.updateAnswer();
        });

      // try to open when tabbed to
      select2EnableOpenOnFocus(this.input);
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
  }

  updateAnswer() {
    if ($(this.input).val().length > 0) {
      const $data = $(this.input).select2('data');

      let optionID = $data[0].id;
      const optionValue = $data[0].text;

      if (!pattern.test(optionID)) {
        optionID = null;
      }

      const { questionID, questionIdentifier } = this.props;
      const validity = this.validate({ optionValue, optionID });

      if (
        dNc(this.props.answer.optionValue) ||
        dNc(this.props.answer.optionID)
      ) {
        if (
          this.props.answer.optionValue !== optionValue ||
          this.props.answer.optionID !== optionID ||
          this.props.answer.valid !== validity.valid
        ) {
          this.props.reduxAction_doUpdateQuestionAnswer(
            questionID,
            questionIdentifier,
            optionID,
            optionValue,
            validity.valid,
          );
        }
      } else {
        this.props.reduxAction_doUpdateQuestionAnswer(
          questionID,
          questionIdentifier,
          optionID,
          optionValue,
          validity.valid,
        );
      }
    }
  }

  validate(answer) {
    let error = '';
    const show = false;
    let valid = false;


    if (dNc(answer) && dNc(answer.optionValue)) {
      // if (answer.optionValue)
      // test to see if the optionID is in fact an option ID
      if (pattern.test(answer.optionID) === true || answer.optionID === null) {
        valid = true;
      }
    } else {
      error = 'Please select a valid qualification';
    }

    return { valid, error, show };
  }

  render() {
    const data = this.props.drawData.resultOptions;
    const options = [<option value="" hidden key={0} >Select Your Course Type</option>];

    data.forEach((value) => {
      options.push(
        <option key={value.optionID} value={value.optionID}>
          {value.displayValue}
        </option>,
      );
    });

    const selectObj = (
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

    return (
      <div>
        {selectObj}
      </div>
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  // nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  // options: PropTypes.array.isRequired,
  drawData: PropTypes.object.isRequired,
  allowAdd: PropTypes.bool.isRequired,
  answerDisplay: PropTypes.any,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  // nextStepCallback: () => { },
  answerDisplay: null,
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
  SelectQuestionCompanySelectWithRemoteLookupComponent,
);
