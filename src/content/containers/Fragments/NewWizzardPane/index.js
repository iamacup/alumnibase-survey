
/*

  Use of multiple versions of this on the same screen is not recommended but maybe possible. needs testing

  a thing to note is this component keepts track of the data for
  each of the 'steps' and performs data transactions
  so the this.props.step needs to be unique to keep consitency

*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import LoadingArea from '../../../../content/components/Loading';
import QuestionButton from '../../../../content/containers/Fragments/Questions/Utility/QuestionButton';
import QuestionRenderer from '../../../../content/containers/Fragments/Questions/Utility/QuestionRenderer';
import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';

import { initialState as questionsInitialState } from '../../../../content/containers/Fragments/Questions/Components/reducer';
import { dNc, formatQuestionObjectForSending } from '../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../content/containers/Fragments/Questions/Components/action';
import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

// the id to store stuff for this wizzard panel
const dataStoreID = 'newWizzardPaneState';

// fetch actions constants
const fetchDataTransactionStateMainID = 'newWizzardFetchStep';
const FetchStep = fetchDataBuilder(fetchDataTransactionStateMainID);

// save action constants
const saveDataTransactionStateMainID = 'newWizzardSaveStep';
const SaveStep = fetchDataBuilder(saveDataTransactionStateMainID);

// this is the API response number for an error in the questions
const apiQuestionError = '1';

const initialLocalState = {
  save: false,
  answers: null,
};

class NewWizzardPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialLocalState;
  }

  componentWillReceiveProps(nextProps) {
    // check to see if we just did a successful save and thus might need to update the state and do callbacks and stuff
    const saveState = nextProps.reduxState_saveDataTransaction;

    const { step, subStep } = nextProps;
    const stateID = step + '_' + subStep;

    if (dNc(saveState[stateID]) && saveState[stateID].finished === true) {
      if (saveState[stateID].generalStatus === 'success' && this.state.save === true) {
        // eslint-disable-next-line react/prop-types
        const { payload } = saveState[stateID];

        // do the callback
        nextProps.submitCallback(payload);

        // update this wizzard state
        nextProps.reduxAction_doUpdate({ data: payload.data, sessionID: payload.sessionID });

        // set the state as nothing
        this.setState(initialLocalState);
      }

      // check to see if we need to set any questions as an error state
      if (saveState[stateID].generalStatus === 'error' &&
      saveState[stateID].statusCode.endsWith(step + '-' + apiQuestionError)) {
      // there has been an error and the status code ends with something like step-number-1 (the -1 is the question error which means we should display some error message on the question)
        const arr = Object.entries(saveState[stateID].payload);

        arr.forEach((value) => {
          const instance = Object.entries(value[1]);
          const questionID = value[0];

          instance.forEach((error) => {
            // check the question is not already set as an error
            if (dNc(nextProps.reduxState_questions[questionID]) && nextProps.reduxState_questions[questionID].error === false) {
              const questionPart = error[0];
              const errorMessage = error[1][0]; // it is technically possible for the API to send more than 1 error back for a part, but UI does not handle this and just ignores by showing only the 0th one

              nextProps.reduxAction_doSetQuestionError(questionID, errorMessage, questionPart);
            }
          });
        });
      }
    }
  }

  questionsWithErrors() {
    const arr = Object.entries(this.props.reduxState_questions);
    let count = 0;

    for (let a = 0; a < arr.length; a++) {
      if (arr[a][1].answered === false || arr[a][1].error === true) {
        // do nothing (this is replaced with a call to doForceValidate)
      } else {
        count++;
      }
    }

    if (count === arr.length) {
      return false;
    }

    return true;
  }

  // if force is true then it will always go
  handleSubmitButton(force) {
    // we instruct the questions to all revalidate - this means that they will put their own error messages onto them
    // the questions will already have the correct validation - we just do this for the error message
    this.props.reduxAction_doForceValidate();

    if (!this.questionsWithErrors() || force === true) {
      // extract the answer data into a format we like
      const formattedAnswers = formatQuestionObjectForSending(
        this.props.reduxState_questions,
      );

      this.setState({ save: true, answers: formattedAnswers });
    }
  }

  drawQuestions(data) {
    const nextButton = (
      <QuestionButton
        key="nextButton"
        buttonAction={() => {
          this.handleSubmitButton();
        }}
        buttonClassName="btn btn-block btn-next-step"
        buttonContent={
          <span>Next Step <i className="far fa-arrow-right" /></span>
        }
        buttonErrorContent={
          <span>Please check the answers <i className="fas fa-exclamation-circle" /></span>
        }
        showButtonIfLoggedIn
      />
    );

    const { data: currentAnswers } = this.props.reduxState_this;

    // we build something to pass in the 'current answered but not validated' questions
    const unvalidatedAnswers = {};
    const invalidValues = Object.values(this.props.reduxState_questions);

    invalidValues.forEach((value) => {
      if (value.answered === true && value.error === false) {
        const keys = Object.keys(value.answer);

        keys.forEach((keyValue) => {
          if (!dNc(unvalidatedAnswers[value.questionID])) {
            unvalidatedAnswers[value.questionID] = {};
          }

          unvalidatedAnswers[value.questionID][keyValue] = {
            optionID: value.answer[keyValue].optionID,
            optionValue: value.answer[keyValue].optionValue,
          };
        });
      }
    });

    return (
      <div>
        <QuestionRenderer
          unvalidatedAnswers={unvalidatedAnswers}
          currentAnswers={currentAnswers}
          nextStepCallback={() => {
            this.handleSubmitButton();
          }}
          data={data}
          nextButton={nextButton}
          showTitles
          questionMetaData={'uni-step-' + this.props.step}
          useMutatedTitles={this.props.useMutatedTitles}
        />
      </div>
    );
  }

  render() {
    const fetchState = this.props.reduxState_fetchDataTransaction;
    const saveState = this.props.reduxState_saveDataTransaction;

    let fetchActive = true;
    let saveActive = this.state.save;

    let content = null;

    const { step, subStep, stepDoneContent } = this.props;
    const stateID = step + '_' + subStep;

    // check the fetch transaction has happened
    if (dNc(fetchState[stateID]) && fetchState[stateID].finished === true) {
      if (fetchState[stateID].generalStatus === 'success') {
        content = this.drawQuestions(fetchState[stateID].payload.data);
        fetchActive = false;
      }
    }

    // check the status of the save transaction
    if (dNc(saveState[stateID]) && saveState[stateID].finished === true) {
      if (saveState[stateID].generalStatus === 'success') {
        content = stepDoneContent;
        saveActive = false;
      } else if (saveState[stateID].generalStatus === 'error' && saveState[stateID].statusCode.endsWith(step + '-' + apiQuestionError)) {
        // there has been an error and the status code ends with something like step-number-1 (the -1 is the question error which means we should display some error message on the question)
        // we make the assumption here that because a save has happened, a fetch must have happened and so we can draw some questions
        content = this.drawQuestions(fetchState[stateID].payload.data);
        saveActive = false;
      }
    }

    // we don't display any content if our things are active
    if (fetchActive === true || saveActive === true) {
      content = null;
    }

    const { sessionID } = this.props.reduxState_this;

    const fetchStepTransaction = (
      <FetchStep
        active={fetchActive}
        fetchURL={this.props.fetchAPI + step}
        sendData={{ sessionID }}
        noRender={!fetchActive}
        stateSubID={stateID}
      />
    );

    const saveStepTransaction = (
      <SaveStep
        active={saveActive}
        fetchURL={this.props.saveAPI + step}
        sendData={{
         answers: this.state.answers, sessionID, arrayValue: subStep, ...this.props.additionalSaveSendData,
        }}
        noRender={!saveActive}
        stateSubID={stateID}
      />
    );

    return (
      <div>
        {content}
        {fetchStepTransaction}
        {saveStepTransaction}
      </div>
    );
  }
}

NewWizzardPane.propTypes = {
  reduxAction_doForceValidate: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  reduxAction_doUpdate: PropTypes.func,
  reduxState_fetchDataTransaction: PropTypes.object,
  reduxState_saveDataTransaction: PropTypes.object,
  reduxState_questions: PropTypes.object,
  reduxState_this: PropTypes.object,
  step: PropTypes.string.isRequired,
  subStep: PropTypes.string,
  submitCallback: PropTypes.func,
  stepDoneContent: PropTypes.any,
  saveAPI: PropTypes.string.isRequired,
  fetchAPI: PropTypes.string.isRequired,
  additionalSaveSendData: PropTypes.object,
  useMutatedTitles: PropTypes.bool,
};

NewWizzardPane.defaultProps = {
  subStep: '0',
  additionalSaveSendData: {},
  reduxAction_doForceValidate: () => {},
  reduxAction_doSetQuestionError: () => {},
  reduxAction_doUpdate: () => {},
  reduxState_fetchDataTransaction: {},
  reduxState_saveDataTransaction: {},
  reduxState_questions: questionsInitialState,
  reduxState_this: {
    data: {},
    sessionID: null,
  },
  submitCallback: () => {},
  stepDoneContent: null,
  useMutatedTitles: true,
};

const mapStateToProps = state => ({
  reduxState_saveDataTransaction: state.dataTransactions[saveDataTransactionStateMainID],
  reduxState_fetchDataTransaction: state.dataTransactions[fetchDataTransactionStateMainID],
  reduxState_questions: state.questions,
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doForceValidate: () => dispatch(questionAction.doForceValidate()),
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  reduxAction_doSetQuestionError: (questionID, message, name) => dispatch(questionAction.doSetQuestionError(questionID, message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewWizzardPane);