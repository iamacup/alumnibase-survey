import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonGroup from '../../../../../../../content/components/ButtonGroup';
import AnswerData from '../../../../../../../content/components/Answers/answerData';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class graduateDestinationButtons extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      $('[data-toggle="popover"]').popover();
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

  // setValueFromState() {
    // in other methods we 'set the state' in render but here we don't.... - i think this might be broken in other components now
    // due to changes in question group
    // console.log('TODO - set value from state is not implemented for this component!');
  // }

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

  // returns the option ID of the option that has clearOption set to true in the drawData
  // TODO button group does not support multiple clear options so if we find more than 1 in the options set - we error out something

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

  // we need to make sure that our state is the same as dataArr
  buttonPress(dataArr) {
    const { questionID, questionIdentifier } = this.props;

    // first we loop through the dataArr and make sure everything in dataArr is in the state
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

      this.props.reduxAction_doUpdateQuestionAnswer(
        questionID,
        questionIdentifier + '_' + this.getIndex(dataArr, optionID),
        optionID,
        optionValue,
        validity.valid,
      );
    }

    // then we loop through the state and remove anything thats not in the dataArr
    Object.keys(this.props.answer).forEach((value) => {
      if (!dataArr.includes(this.props.answer[value].optionID)) {
        console.log('removing', value);
        this.props.reduxAction_doRemoveQuestionIdentifier(questionID, value);
      }
    });
  }

  render() {
    const options = [];

    // loop over the options and draw the buttons
    this.props.options.forEach((value) => {
      let className = 'btn btn-block btn-option btn-multiline btn-margin';
      const answered = false;

      if (dNc(value.drawData) && dNc(value.drawData.optionEmphasis)) {
        className += ' btn-emphasis';
      }

      let answerObj = null;

      // if (dNc(this.props.answerDisplay) && this.props.answerDisplay.type === 'percentages') {
      //   const { answerDisplay } = this.props;
      //   let data = null;

      //   answerDisplay.data.forEach((datum) => {
      //     if (datum.optionID === value.optionID) {
      //       data = datum;
      //     }
      //   });

      //   answerObj = (
      //     <AnswerData
      //       answered={answered}
      //       percentage={data.value}
      //       displayText={value.optionValue}
      //     />
      //   );

      //   className += ' d-none';
      // }

let dataButton = ("")
let name = value.optionValue;

if (value.drawData) {
  name = value.drawData.questionPrimaryText;
  dataButton = (
<div className="float-right" style={{ marginRight: '-50px', marginTop: '-45px' }}>
                <span
                  tabIndex="0"
                  className="btn-hint"
                  role="button"
                  data-toggle="popover"
                  data-trigger="hover"
                  title=""
                  data-content={value.drawData.questionSecondaryText}
                >
                  <i className="fal fa-question-circle" style={{ padding: '10px' }} />
                </span>
              </div>
    )
}

      const obj = (
        <div key={value.optionID}>
          {answerObj}
          <button
            value={value.optionID}
            className={className}
          >
            {name}
          </button>
          {dataButton}
        </div>
      );

      options.push(obj);
    });

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

graduateDestinationButtons.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  reduxAction_doRemoveQuestionIdentifier: PropTypes.func,
  // nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  // answerDisplay: PropTypes.any,
};

graduateDestinationButtons.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  reduxAction_doRemoveQuestionIdentifier: () => {},
  // nextStepCallback: () => { },
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
  graduateDestinationButtons,
);