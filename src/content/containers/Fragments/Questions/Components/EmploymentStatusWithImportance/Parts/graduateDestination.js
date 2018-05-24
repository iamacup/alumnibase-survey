import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonGroup from '../../../../../../../content/components/ButtonGroup';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class graduateDestinationButtons extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      $('[data-toggle="popover"]').popover();
      $(document).trigger('nifty.ready');
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

  handleRadio(e) {
    const optionID = e.target.value;
    const { questionID, questionIdentifier2 } = this.props;
    const validity = this.validate(['empty']);
    let optionValue = '';

    this.props.options2.forEach((element) => {
      if (element.optionID === optionID) {
        // eslint-disable-next-line prefer-destructuring
        optionValue = element.optionValue;
      }
    });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier2,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  render() {
    const options = [];
    // loop over the options and draw the buttons
    this.props.options.forEach((value) => {
      let className = 'btn btn-block btn-option btn-multiline btn-margin';

      if (dNc(value.drawData) && dNc(value.drawData.optionEmphasis)) {
        className += ' btn-emphasis';
      }

      const answerObj = null;

      let dataButton = ('');
      let name = value.optionValue;

      if (value.drawData) {
        name = value.drawData.questionPrimaryText;
        dataButton = (
          <div className="float-right" key={value.optionID + 1}>
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
        );
      }

      let bool = true;
      let checkedBool = false;
      // disabling the radio buttons
      Object.keys(this.props.answer).forEach((element) => {
        if (this.props.answer[element].optionID === value.optionID) {
          bool = false;
        }
      });

      if (dNc(this.props.answer.graduateDestinationMostImportant) && dNc(this.props.answer.graduateDestinationMostImportant.optionID)) {
        if (this.props.answer.graduateDestinationMostImportant.optionID === value.optionID) {
          checkedBool = true;
        } else checkedBool = false;
      }

      const obj = (
        <div key={value.optionID}>
          <div className="row">
            <div className="col-8">
              {answerObj}
              <button
                value={value.optionID}
                className={className}
              >
                {name}
              </button>
            </div>
            <div className="col-2">
              {dataButton}
            </div>
            <div className="col-2">
              <input disabled={bool} type="radio" name="radio_1" value={value.optionID} onClick={e => this.handleRadio(e)} checked={checkedBool} />
            </div>
          </div>
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
  questionIdentifier2: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  options2: PropTypes.array.isRequired,
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
