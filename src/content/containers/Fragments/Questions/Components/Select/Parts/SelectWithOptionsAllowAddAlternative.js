import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AnswerData from '../../../../../../../content/components/Answers/answerData';
import InputData from './InputData';

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
      const { placeholder } = this.props.drawData;

      const tags = this.props.allowAdd === true;

      $('#inputData').hide();

      $(this.buttonDOM).click(() => {
        // $('#addData').replaceWith(<InputData />)
        $('#inputData').show();
        $('#addData').hide();
      });

      $(this.input)
        .select2({
          placeholder,
          allowClear: false,
          width: '100%',
          dropdownParent,
          tags,
          createTag(params) {
            return {
              id: params.term,
              text: params.term,
              newOption: true,
            };
          },
          escapeMarkup(markup) {
            return markup;
          },
          templateResult(data) {
            if (data.loading) return 'loading';

            let markup = '';

            if (data.newOption) {
              markup =
                '<div class="select-new-item"><em>Let me add "' +
                encodeEntities(data.text) +
                '" to the list.</em></div>';
            } else {
              markup = data.text;
            }

            return markup;
          },
          sorter(data) {
            const dataNormal = [];
            const dataFreeText = [];

            for (let a = 0; a < data.length; a++) {
              if (data[a].newOption === true) {
                dataFreeText.push(data[a]);
              } else {
                dataNormal.push(data[a]);
              }
            }

            for (let a = 0; a < dataFreeText.length; a++) {
              dataNormal.push(dataFreeText[a]);
            }

            return dataNormal;
          },
          templateSelection(data) {
            return data.text;
          },
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
    });
  }

  validate(answer) {
    let error = '';
    const show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionValue)) {
      // test to see if the optionID is in fact an option ID
      if (pattern.test(answer.optionID) === true || answer.optionID === null) {
        valid = true;
      } else if (answer.optionValue.length <= 1) {
        error = 'The value is not long enough.';
      } else {
        valid = true;
      }
    } else {
      error = 'Please enter a value';
    }

    return { valid, error, show };
  }

  render() {
    const options = [];

    options.push(<option key="start" />);

    this.props.options.forEach((value) => {
      options.push(
        <option key={value.optionID} value={value.optionID}>
          {value.optionValue}
        </option>,
      );
    });

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

    const addData = (
      <div className="row pt-3" key={1} id="addData">
        <div className="col-10 text-right">
          <p style={{ fontSize: '12px', color: '#a9a9a9' }}>Add another option</p>
        </div>
        <div className="col-1">
          <button ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }}>
            <i className="fal fa-plus-circle" style={{ color: '#a9a9a9', fontSize: '20px' }} />
          </button>
        </div>
      </div>
    );

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

    const obj = {
      questionID: this.props.questionID,
      nextStepCallback: this.props.nextStepCallback,
      drawData: this.props.drawData,
      forceValidate: this.props.forceValidate,
    };

    return (
      <div>
        {answerObj}
        {selectObj}
        {addData}
        <div className="pt-3" id="inputData">
          <InputData
            {...obj}
            answer={this.props.answer}
            questionIdentifier={this.props.questionIdentifier}
          />
        </div>
      </div>
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  drawData: PropTypes.object.isRequired,
  allowAdd: PropTypes.bool.isRequired,
  answerDisplay: PropTypes.any,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  nextStepCallback: () => {},
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
