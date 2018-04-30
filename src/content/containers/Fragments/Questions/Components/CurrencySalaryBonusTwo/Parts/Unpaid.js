import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonGroup from '../../../../../../../content/components/ButtonGroup';
import AnswerData from '../../../../../../../content/components/Answers/answerData';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class Unpaid extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      this.putItemIntoState();
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

  getIndex(dataArr, optionID) {
    let index = -1;

    for (let a = 0; a < dataArr.length; a++) {
      if (dataArr[a] === optionID) {
        for (let b = 0; b < this.props.options.length; b++) {
          if (this.props.options[b].optionID === dataArr[a]) {
            index = b;
          }
        }
      }
    }

    if (index === -1) {
      console.log('This is an unhandle error condition');
    }

    return index;
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;

    // we set to valid as long as 'an' option exists in the state
    if (Object.keys(answer).length > 0) {
      valid = true;
    } else {
      error = 'You need to select an option.';
      show = false;
    }

    return { valid, error, show };
  }

  putItemIntoState() {
    const { questionID, questionIdentifier, options } = this.props;
    const { optionID } = options[1];
    const { optionValue } = options[1];
    const validity = this.validate({ optionValue, optionID });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  buttonPress(dataArr) {
    const { questionID, questionIdentifier, options } = this.props;

    // clearing the state
    if (dataArr.length > 0 && options[0].optionID === dataArr[0]) {
      Object.keys(this.props.answer).forEach((value) => {
        console.log('removing', value);
        this.props.reduxAction_doRemoveQuestionIdentifier(questionID, value);
      });
    }

    for (let a = 0; a < dataArr.length; a++) {
      const optionID = dataArr[a];
      let optionValue = null;

      this.props.options.forEach((value) => {
        if (value.optionID === optionID) {
          ({ optionValue } = value);
        }
      });

      // we pass an empty array in here because the state does not yet exist - and we just want it to validate
      // see the validate method to understand why this works
      const validity = this.validate(['empty']);

      //  setting the state with just the 'YES' unpaid value
      this.props.reduxAction_doUpdateQuestionAnswer(
        questionID,
        questionIdentifier,
        optionID,
        optionValue,
        validity.valid,
      );
    }

    if (!dataArr.includes(this.props.options[0].optionID)) {
      const { optionID } = this.props.options[1];
      const { optionValue } = this.props.options[1];
      const validity = this.validate(['empty']);

      this.props.reduxAction_doUpdateQuestionAnswer(
        questionID,
        questionIdentifier,
        optionID,
        optionValue,
        validity.valid,
      );
    }
  }

  render() {
    const options = [];

    const value = this.props.options[0];

    let className = 'btn btn-block btn-option btn-multiline btn-margin';
    const answered = false;

    if (dNc(value.drawData) && dNc(value.drawData.optionEmphasis)) {
      className += ' btn-emphasis';
    }

    let answerObj = null;

    if (dNc(this.props.answerDisplay) && this.props.answerDisplay.type === 'percentages') {
      const { answerDisplay } = this.props;
      let data = null;

      answerDisplay.data.forEach((datum) => {
        if (datum.optionID === value.optionID) {
          data = datum;
        }
      });

      answerObj = (
        <AnswerData
          answered={answered}
          percentage={data.value}
          displayText={value.optionValue}
        />
      );

      className += ' d-none';
    }

    const obj = (
      <div key={value.optionID}>
        {answerObj}
        <button
          value={value.optionID}
          className={className}
        >
            I'm Unpaid
        </button>
      </div>
    );

    options.push(obj);

    return (
      <ButtonGroup
        buttons={options}
        callback={(data) => {
          this.buttonPress(data);
        }}
        singleSelect={false}
        clickedClass="answered"
      />
    );
  }
}

Unpaid.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  reduxAction_doRemoveQuestionIdentifier: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  answerDisplay: PropTypes.any,
};

Unpaid.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  reduxAction_doRemoveQuestionIdentifier: () => {},
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
  reduxAction_doRemoveQuestionIdentifier: (questionID, questionIdentifier) =>
    dispatch(questionAction.doRemoveQuestionIdentifier(questionID, questionIdentifier)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Unpaid,
);
