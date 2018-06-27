
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import StandardOptions from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/StandardOptions';
import ListOptions from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/ListOptions';
import OptionsWithTooltips from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/OptionsWithTooltips';
import MultiSelectOptions from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/MultiSelectOptions';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
  dNc,
  formatQuestionObjectForSending,
} from '../../../../../../content/scripts/custom/utilities';

const fetchDataID = 'fetchAnswerStats';
const FetchData = fetchDataBuilder(fetchDataID);

function calculateStatsExplainerText(text, answerPercentage, selectedAnswer) {
  let result = text.replace('{answerPercentage}', answerPercentage);
  result = result.replace('{selectedAnswer}', selectedAnswer);

  return result;
}

class OptionsQuestionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answerStatsData: null,
      sendData: null,
    };
  }

  componentDidUpdate() {
    // we have to calculate what the send data should be here and put it into the state - this is because
    // the question state will update for every question that is updated on the page - what we actually want is to
    // grab the question state ONCE when this question is answered and then not update again
    if (this.needToGetAnswerStats() && !dNc(this.state.sendData)) {
      const { data, answer } = this.props;

      const { options, questionID } = data;
      const { answerBits } = getUsefulQuestionBits(
        options,
        answer.answer,
      );

      const questionIdentifier = getQuestionIdentifiers(options);

      const sendData = {
        questionID,
        optionID: answerBits[questionIdentifier].optionID,
        questionState: formatQuestionObjectForSending(this.props.reduxState_questions),
      };

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ sendData });
    }
  }

  needToGetAnswerStats() {
    const { data, answer } = this.props;

    const { options } = data;
    const { answerBits } = getUsefulQuestionBits(
      options,
      answer.answer,
    );

    const questionIdentifier = getQuestionIdentifiers(options);

    if (dNc(answerBits[questionIdentifier]) && answerBits[questionIdentifier].valid === true) {
      // we then check to se if we should show answer stats - this is default 'yes' and only does not happen if data.drawData.showAnswerStats is false
      let answerStatsIsEnabled = true;

      if (dNc(data.drawData) && dNc(data.drawData.showAnswerStats) && data.drawData.showAnswerStats === false) {
        answerStatsIsEnabled = false;
      }

      return answerStatsIsEnabled;
    }

    return false;
  }

  answerStatsDataSuccessCallback(data) {
    this.setState({ answerStatsData: data });
  }

  render() {
    const {
      data, answer, nextStepCallback, title, explainerText,
    } = this.props;

    const useExplainerText = explainerText;
    const { questionID, options, drawData } = data;
    const { answerBits, errorBits } = getUsefulQuestionBits(
      options,
      answer.answer,
    );

    const obj = {
      questionID,
      forceValidate: answer.forceValidate,
      nextStepCallback,
    };

    // get the questionIdentifier
    const questionIdentifier = getQuestionIdentifiers(options);
    let question = null;

    let answerDisplay = null;
    let transactionElement = null;

    if (this.needToGetAnswerStats() && dNc(this.state.sendData)) {
      transactionElement = (
        <FetchData
          key="fetch"
          active
          fetchURL="api/universityWizzard/getAnswerStats"
          sendData={this.state.sendData}
          noRender
          stateSubID={questionID}
          successCallback={(responseData) => { this.answerStatsDataSuccessCallback(responseData); }}
        />
      );

      if (dNc(this.state.answerStatsData)) {
        answerDisplay = this.state.answerStatsData;

        if (useExplainerText.type === 'statsExplainer' && dNc(this.state.answerStatsData.percentage)) {
          useExplainerText.useValue = calculateStatsExplainerText(useExplainerText.rawValue, this.state.answerStatsData.percentage, answerBits[questionIdentifier].optionValue);
        }
      }
    }

    let multiSelectAnswer = {};

    if (dNc(answer.answer)) {
      multiSelectAnswer = answer.answer;
    }

    if (dNc(drawData.type) && drawData.type === 'list') {
      question = (
        <ListOptions
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
        />
      );
    } else if (dNc(drawData.type) && drawData.type === 'optionsWithTooltips') {
      question = (
        <OptionsWithTooltips
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
          answerDisplay={answerDisplay}
        />
      );
    } else if (dNc(drawData.type) && drawData.type === 'multiSelectOptions') {
      question = (
        <MultiSelectOptions
          {...obj}
          answer={multiSelectAnswer}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
          answerDisplay={answerDisplay}
        />
      );
    } else {
      question = (
        <StandardOptions
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
          answerDisplay={answerDisplay}
        />
      );
    }

    return (
      [
        transactionElement,
        <QuestionContainer
          key="container"
          title={title}
          question={question}
          error={answer.error}
          errorMessages={errorBits}
          answered={answer.answered}
          explainerText={useExplainerText}
        />,
      ]
    );
  }
}

OptionsQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  explainerText: PropTypes.object.isRequired,
  reduxState_questions: PropTypes.object,
};

OptionsQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
  reduxState_questions: {},
};

const mapStateToProps = state => ({
  reduxState_questions: state.questions,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(OptionsQuestionComponent);
