import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonGroup from '../../../../../../../content/components/ButtonGroup';
import AnswerData from '../../../../../../../content/components/Answers/answerData';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class SelectQuestionCompanySelectWithRemoteLookupComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      none: false,
    };
  }

  componentDidMount() {
    // wait for document to be ready
    $(() => {
      // this.setValueFromState();
    });
  }

  componentDidUpdate() {
    // this.setValueFromState();
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
    // return -1;
  }

  nonePressed(dataArr) {
    let nonePressed = false;

    for (let a = 0; a < dataArr.length; a++) {
      const optionID = dataArr[a];

      if (optionID === 'options/42960330798') {
        nonePressed = true;
      }
    }

    return nonePressed;
  }

  stateContainsNone() {
    if(dNc(this.props.answer['outreachItems_3'])) {
      console.log('1 true');
      return true;
    }

    console.log('1 false');
    return false;
  }

  stateContainsOptionsThatAreNotNone() {
    if(Object.keys(this.props.answer).length > 0 && !this.stateContainsNone()) {
      console.log('2 true');
      return true;
    }

    console.log('2 false');
    return false;
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionID)) {
      valid = true;
    } else {
      error = 'You need to select an option.';
      show = false;
    }

    return { valid, error, show };
  }


  // we care about the following states
  // 1 - dataArr contains nonePressed option ID AND other options AND the state does not contain none (i.e. outreachItems_3)
  // in this case we know that none has just be pressed
  // 2 - dataArr contains nonePressed AND other options AND the state only contains none (i.e. outreachItems_3)
  // in this case we need to remove none from the state and add the button press
  // 3 - dataArr does not contain none
  // we just add the option to the state

  buttonPress(dataArr) {

    console.log(dataArr);

    /*const nonePressed = this.nonePressed(dataArr);

    if(nonePressed === true) {
      console.log('none pressed');
    } else {
      //we just add the option to the state
      console.log('none not pressed');
    }*/

    /*const { questionID, questionIdentifier } = this.props;

    // find out if we have pressed the 'none' button
    const nonePressed = this.nonePressed(dataArr);

    // loop the pressed buttons
    for (let a = 0; a < dataArr.length; a++) {
      const optionID = dataArr[a];

      // 1 - dataArr contains nonePressed option ID AND other options AND the state does not contain none (i.e. outreachItems_3)
      if (nonePressed === true && optionID !== 'options/42960330798' && !this.stateContainsOptionsThatAreNotNone()) {
        //in this case we know that none has just be pressed
        //we remove this item
        this.props.reduxAction_doRemoveQuestionIdentifier(questionID, questionIdentifier + '_' + this.getIndex(dataArr, optionID));
      } else {
        let optionValue = null;
        // 3
        // pull out the option value for the option that was pressed
        this.props.options.forEach((value) => {
          if (value.optionID === optionID) {
            ({ optionValue } = value);
          }
        });

        const validity = this.validate({ optionValue, optionID });

        this.props.reduxAction_doUpdateQuestionAnswer(
          questionID,
          questionIdentifier + '_' + this.getIndex(dataArr, optionID),
          optionID,
          optionValue,
          validity.valid,
        );
      }
    }*/
  }

  render() {
    const options = [];
    // console.log(this.state.none)
    // this array contains all of the pressed indices
    let arr = [];

    if (Object.keys(this.props.answer).length > 0) {
      Object.keys(this.props.answer).forEach(element => arr.push(+element.slice(-1)));
    }

    if (this.state.none) arr = [3];

    // this.props.options - we draw these

    // this.props.answer - these are the buttons that are pressed
    this.props.options.forEach((value, index) => {
      let className = 'btn btn-block btn-option btn-multiline btn-margin';
      let answered = false;

      if (dNc(value.drawData) && dNc(value.drawData.optionEmphasis)) {
        className += ' btn-emphasis';
      }

      if (arr.includes(index)) {
        className += ' answered';
        answered = true;
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
            {value.optionValue}
          </button>
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
        clickedClass="testc"
        clearButtonID="options/42960330798"
      />
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  reduxAction_doRemoveQuestionIdentifier: PropTypes.func,
  // nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  answerDisplay: PropTypes.any,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  reduxAction_doRemoveQuestionIdentifier: () => {},
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
  reduxAction_doRemoveQuestionIdentifier: (questionID, questionIdentifier) =>
    dispatch(questionAction.doRemoveQuestionIdentifier(questionID, questionIdentifier)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectQuestionCompanySelectWithRemoteLookupComponent,
);
