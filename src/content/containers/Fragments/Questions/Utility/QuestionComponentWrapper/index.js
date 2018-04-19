import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import SmallSectionError from '../../../../../../content/components/Errors/smallSection';

// import fetchDataBuilder from '../../../../../foundation/redux/Factories/FetchData';
import {
  dNc,
  formatQuestionObjectForSending,
  fireDebouncedResizeEvents,
  getAuthenticationCookie,
} from '../../../../../../content/scripts/custom/utilities';
import {
  CurrencySalaryBonus,
  Select,
  Options,
  MonthYear,
  Postcode,
  FreeText,
  MultiRange,
  Name,
  FullName,
  PreUni,
  Location,
  Destination,
} from '../../../../../../content/containers/Fragments/Questions/Components';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';

import * as questionAction from '../../../../../../content/containers/Fragments/Questions/Components/action';

class QuestionComponentWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backToQuestion: true,
    };
  }

  componentDidMount() {
    const { data } = this.props.input;
    this.props.reduxAction_doAddQuestion(data.questionID);

    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents('questionGraphsDebounce');

      // then listen for the events here
      $(document).on('questionGraphsDebounce', () => {
        // and redraw the charts
        redrawCharts();
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // we check to see if the answers are different, and if they are, we see if we are hiding the 'answered' panel - if we are are, we should show it because basically someone pressed the 'back to question' button then changed their answer.
    if (
      !_.isEqual(this.props.input.answer.answer, nextProps.input.answer.answer)
    ) {
      this.setState({ backToQuestion: false });

      // we also check for followon data as well
      if (nextProps.input.data.mightHaveFollowon === true) {
        this.props.reduxAction_doGetFollowonQuestions(
          getAuthenticationCookie(),
          nextProps.input.data.questionID,
          nextProps.questionMetaData,
          formatQuestionObjectForSending(nextProps.reduxState_questions),
        );
      }
    }
  }

  componentDidUpdate() {
    const { data, answer } = this.props.input;

    if (answer.forceValidate === true) {
      // we immediately set the question to force validate done and expect children of this component to validate
      this.props.reduxAction_doSetForceValidateDone(data.questionID);
    }

    // set the answer to 'answered' if all of the components are valid
    let valid = true;


    if (data.array === true) {
      // we have to do something special with array type questions
      // TODO we do not have the option for 'optional' array questions here - not a problem for now but this statement forces invalidity for any that have no options
      if (Object.keys(answer.answer).length === 0) {
        valid = false;
      }

      // we loop over the answers
      Object.keys(answer.answer).forEach((value) => {
        if (
          !dNc(answer.answer[value]) ||
          !dNc(answer.answer[value].valid) ||
          answer.answer[value].valid !== true
        ) {
          valid = false;
        }
      });
    } else {
      // we check all the keys are answered
      Object.keys(data.options).forEach((value) => {
        if (
          !dNc(answer.answer[value]) ||
          !dNc(answer.answer[value].valid) ||
          answer.answer[value].valid !== true
        ) {
          valid = false;
        }
      });
    }

    if (valid === true && answer.answered === false) {
      this.props.reduxAction_doSetQuestionSuccess(data.questionID);

      if (data.mightHaveFollowon === true) {
        this.props.reduxAction_doGetFollowonQuestions(
          getAuthenticationCookie(),
          data.questionID,
          this.props.questionMetaData,
          formatQuestionObjectForSending(this.props.reduxState_questions),
        );
      }
    } else if (valid === false && answer.answerd === true) {
      // this condition should not be reachable because we update the overall validity to invalid when a question is answered.
    }
  }

  componentWillUnmount() {
    this.props.reduxAction_doRemoveQuestion(this.props.input.data.questionID);
  }

  hideAnswerPanelForAnsweredQuestion() {
    this.setState({ backToQuestion: true });
  }

  render() {
    const { type, input } = this.props;
    const obj = { ...input };

    let answerContainerClassName = 'd-none';

    // check to see if the question has been answered or we are currently 'force show' ing the answer
    if (input.answer.answered === true && this.state.backToQuestion === false) {
      // if we are not back to question, and we got to this logic branch, then we must be showing the answer!
      if (this.state.backToQuestion !== true) {
        answerContainerClassName = '';
      }
    }

    if (type === 'currencySalaryBonus') {
      return (
        <div>
          <CurrencySalaryBonus {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'select') {
      return (
        <div>
          <Select {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'options') {
      return (
        <div>
          <Options {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'monthYear') {
      return (
        <div>
          <MonthYear {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'postcode') {
      return (
        <div>
          <Postcode {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'freeText') {
      return (
        <div>
          <FreeText {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'multiRange') {
      return (
        <div>
          <MultiRange {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'name') {
      return (
        <div>
          <Name {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'multiName') {
      return (
        <div>
          <FullName {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'educationHistory') {
      return (
        <div>
          <PreUni {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'locationVariableDetail') {
      return (
        <div>
          <Location {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    } else if (type === 'EmploymentStatusWithImportance') {
      return (
        <div>
          <Destination {...obj} />
          <div className={answerContainerClassName} />
        </div>
      );
    }


    return (
      <SmallSectionError
        title="Question Error"
        message="There should be a question here but there was a problem rendering it..."
      />
    );
  }
}

QuestionComponentWrapper.propTypes = {
  reduxAction_doSetQuestionSuccess: PropTypes.func,
  reduxAction_doAddQuestion: PropTypes.func,
  reduxAction_doRemoveQuestion: PropTypes.func,
  reduxAction_doSetForceValidateDone: PropTypes.func,
  reduxAction_doGetFollowonQuestions: PropTypes.func,
  reduxState_questions: PropTypes.object,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  questionMetaData: PropTypes.string.isRequired,
};

QuestionComponentWrapper.defaultProps = {
  reduxAction_doSetQuestionSuccess: () => {},
  reduxAction_doAddQuestion: () => {},
  reduxAction_doRemoveQuestion: () => {},
  reduxAction_doSetForceValidateDone: () => {},
  reduxAction_doGetFollowonQuestions: () => {},
  reduxState_questions: {},
};

const mapStateToProps = state => ({
  reduxState_questions: state.questions,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doSetQuestionSuccess: questionID =>
    dispatch(questionAction.doSetQuestionSuccess(questionID)),
  reduxAction_doAddQuestion: questionID =>
    dispatch(questionAction.doAddQuestion(questionID)),
  reduxAction_doRemoveQuestion: questionID =>
    dispatch(questionAction.doRemoveQuestion(questionID)),
  reduxAction_doSetForceValidateDone: questionID =>
    dispatch(questionAction.doSetForceValidateDone(questionID)),
  reduxAction_doGetFollowonQuestions: (
    cookieData,
    answeredQuestionID,
    questionMetaData,
    questionState,
  ) =>
    dispatch(
      questionAction.doGetFollowonQuestions(
        cookieData,
        answeredQuestionID,
        questionMetaData,
        questionState,
      ),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QuestionComponentWrapper,
);
