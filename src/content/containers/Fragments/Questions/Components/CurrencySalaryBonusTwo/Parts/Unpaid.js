import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonGroup from '../../../../../../../content/components/ButtonGroup';

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

  //   if (
  //     this.props.forceValidate === true &&
  //     validity.valid === true &&
  //     (!dNc(this.props.answer) || !dNc(this.props.answer.optionValue))
  //   ) {
  //     this.putItemIntoState();
  //   } else if (dNc(this.props.answer.unpaid) && this.props.answer.unpaid.optionValue === "Yes") {
  //   //   // here we check for optional, if found then we just set the thing to valid instantly
  //   //   if (dNc(this.props.answer) && this.props.answer.valid !== true) {
  //       this.putItemIntoState();
  //   //   }
  //   }
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
    // if (dataArr.length > 0 && options[0].optionID === dataArr[0]) {
    //   Object.keys(this.props.answer).forEach((value) => {
    //     console.log('removing', value);
    //     this.props.reduxAction_doRemoveQuestionIdentifier(questionID, value);
    //   });
    // }

    const { names } = this.props;
    // setting salary and bonus to -1
    names.forEach((name) => {
      const optionID = null;
      const optionValue = -1;
      const validity = this.validate(['empty']);

      this.props.reduxAction_doUpdateQuestionAnswer(
        questionID,
        name,
        optionID,
        optionValue,
        validity.valid,
      );
    });

    for (let a = 0; a < dataArr.length; a++) {
      const optionID = dataArr[a];
      let optionValue = null;
      const validity = this.validate(['empty']);

      options.forEach((value) => {
        if (value.optionID === optionID) {
          ({ optionValue } = value);
        }
      });

      //  setting the state with just the 'YES' unpaid value
      this.props.reduxAction_doUpdateQuestionAnswer(
        questionID,
        questionIdentifier,
        optionID,
        optionValue,
        validity.valid,
      );
    }

    if (!dataArr.includes(options[0].optionID)) {
      let { optionID } = options[1];
      let { optionValue } = options[1];
      let validity = this.validate(['empty']);
      // setting unpaid to 'No'
      this.props.reduxAction_doUpdateQuestionAnswer(
        questionID,
        questionIdentifier,
        optionID,
        optionValue,
        validity.valid,
      );

      // setting salary and bonus fields to valid = false
      names.forEach((name) => {
        console.log('Getting here');
        optionID = null;
        // using 0 so as not to show total salary as a negative number.
        optionValue = 0;
        validity = this.validate({});

        this.props.reduxAction_doUpdateQuestionAnswer(
          questionID,
          name,
          optionID,
          optionValue,
          validity.valid,
        );
      });
    }
  }

  render() {
    const options = [];

    const value = this.props.options[0];

    const obj = (
      <div key={value.optionID}>
        <button
          value={value.optionID}
          className="btn btn-block btn-option btn-multiline btn-margin"
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
  names: PropTypes.array.isRequired,
};

Unpaid.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(
  Unpaid,
);
