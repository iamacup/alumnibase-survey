import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AnswerData from '../../../../../../../content/components/Answers/answerData';

import {
  dNc,
  select2GetCorrectParent,
  select2EnableOpenOnFocus,
  setSelect2Value,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

// eslint-disable-next-line no-useless-escape
const pattern = new RegExp('^options/[0-9]+$', 'i');

class SelectQuestionCompanySelectWithRemoteLookupComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
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
                this.props.answer.optionID !== optionID
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
        });

      // try to open when tabbed to
      select2EnableOpenOnFocus(this.input);

      this.setValueFromState();

      // we do this to make sure the thing is in the state - we need it in the state because otherwise validation gets a bit funky
      // as, if the question gets validated, then we get new items added to the list, they will automatically be validated
      // this.putItemIntoState();
    });
  }

  componentDidUpdate(prevProps) {
    // TODO read wall
    // this.setValueFromState();
    const {
      questionIdentifier, questionID, answer,
    } = this.props;
    const validity = this.validate(this.props.answer);
    // set stuff as an error if they need to be
    if (
      validity.valid === false &&
      (validity.show === true) &&
      answer.errorMessage !== validity.error
    ) {
      this.props.reduxAction_doSetQuestionError(
        questionID,
        validity.error,
        questionIdentifier,
      );
    }

    if (prevProps.typeAnswer.optionValue !== this.props.typeAnswer.optionValue) {
      $(this.input).select2().val(null).trigger('change');

      // we do a little hack here to make sure that the width does not change.
      // this will break if the hierarchy of:
      //    container (parent)
      //       this.input
      //       select2 span element
      // changes at some point
      const $s2 = $(this.input).parent().find('> span');
      $s2.css('width', '100%');
    }
  }

  setValueFromState() {
    if (dNc(this.props.answer.optionValue)) {
      const $data = $(this.input).select2('data');

      if (dNc($data) && $data.length > 0) {
        const { optionValue, optionID } = this.props.answer;
        // check to see if something is already selected
        if ($data.length === 1) {
        // something is selected - is it the same as the answer value?
          if ($data[0].text !== optionValue) {
          // need to update the option because the selected one right now is not the same as the state
            setSelect2Value(this.input, optionValue, optionID);
          }
        } else {
        // there is currently no selected option so we need to set one
          setSelect2Value(this.input, optionValue, optionID);
        }
      }
    }
  }

  // putItemIntoState() {
  //   const { questionID, questionIdentifier } = this.props;
  //   const optionID = null;
  //   const optionValue = null;
  //   const validity = this.validate({ optionValue, optionID });

  //   this.props.reduxAction_doUpdateQuestionAnswer(
  //     questionID,
  //     questionIdentifier,
  //     optionID,
  //     optionValue,
  //     validity.valid,
  //   );
  // }

  validate(answer) {
    let error = '';
    const show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionValue)) {
      // test to see if the optionID is in fact an option ID
      if (pattern.test(answer.optionID) === true || answer.optionID === null) {
        valid = true;
      } else {
        error = 'You need to select a grade';
      }
    } else {
      error = 'You need to select a grade';
    }

    return { valid, error, show };
  }

  render() {
    // <option value="" hidden key={0}>Select a Grade</option>
    const options = [<option value="" hidden key={0}>Select a Grade</option>];
    let data = [];

    if (dNc(this.props.typeAnswer.optionValue)) {
      data = this.props.drawData.resultOptions.filter((element) => {
        if (element.displayValue === this.props.typeAnswer.optionValue) return element.options;
        return null;
      });
    } else {
      options.push(
        <option key={1} value="select" disabled>
          Please select a qualification
        </option>,
      );
    }

    data.forEach(element => (
      element.options.forEach((value) => {
        options.push(
          <option key={value.optionID} value={value.optionID}>
            {value.displayValue}
          </option>,
        );
      })
    ));

    let displaySelect = true;
    let answerObj = null;

    if (dNc(this.props.answerDisplay) && this.props.answerDisplay.type === 'percentages') {
      displaySelect = false;

      answerObj = (
        <AnswerData
          answered
          percentage={this.props.answerDisplay.value}
          displayText={this.props.answer.optionValue}
        />
      );
    }

    const selectObj = (
      <div className={displaySelect === true ? '' : 'd-none'}>
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
        {answerObj}
        {selectObj}
      </div>
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  typeAnswer: PropTypes.any.isRequired,
  questionID: PropTypes.string.isRequired,
  // forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  drawData: PropTypes.object.isRequired,
  answerDisplay: PropTypes.any,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
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
