
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import CompanySelectWithRemoteLookup from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/CompanySelectWithRemoteLookup';
import SelectWithOptions from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/SelectWithOptions';
import SelectWithOptionsAllowAddAlternative from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/SelectWithOptionsAllowAddAlternative';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
  dNc,
} from '../../../../../../content/scripts/custom/utilities';

const fetchDataID = 'fetchAnswerStats';
const FetchData = fetchDataBuilder(fetchDataID);

function calculateStatsExplainerText(text, answerPercentage, selectedAnswer) {
  let result = text.replace('{answerPercentage}', answerPercentage);
  result = result.replace('{selectedAnswer}', selectedAnswer);

  return result;
}

class SelectQuestionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answerStatsData: null,
    };
  }

  answerStatsDataSuccessCallback(data) {
    console.log('Got some data');
    console.log(data);

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
      drawData,
    };

    const questionIdentifier = getQuestionIdentifiers(options);
    let question = null;

    let answerDisplay = null;
    let transactionElement = null;

    /* HERE WE DO SOME CALCULATIONS FOR THE QUESTIONS */
    if (dNc(answerBits[questionIdentifier]) && answerBits[questionIdentifier].valid === true) {
      transactionElement = (
        <FetchData
          key="fetch"
          active
          fetchURL="api/universityWizzard/getAnswerStats"
          sendData={{}}
          noRender={false}
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
    /* STOP CALCULATIONS */

    // nullify the results if we have to (todo - when we get from an API this would bne where we do or do not do the call? or something)
    if (dNc(data.drawData) && dNc(data.drawData.showAnswerStats) && data.drawData.showAnswerStats === false) {
      answerDisplay = null;
    }

    if (drawData.type === 'companySelectWithRemoteLookup') {
      question = (
        <CompanySelectWithRemoteLookup
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
        />
      );
    } else if (drawData.type === 'selectWithOptionsAllowAdd') {
      question = (
        <SelectWithOptions
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
          allowAdd
          answerDisplay={answerDisplay}
        />
      );
    } else if (drawData.type === 'selectWithOptions') {
      question = (
        <SelectWithOptions
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
          allowAdd={false}
          answerDisplay={answerDisplay}
        />
      );
    } else if (drawData.type === 'selectWithOptionsAllowAddAlternative') {
      question = (
        <SelectWithOptionsAllowAddAlternative
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
          allowAdd={false}
          answerDisplay={answerDisplay}
        />
      );
    } else {
    // todo handle error state here
      console.log('error state here TODO');
      console.log(drawData.type);
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

SelectQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  explainerText: PropTypes.object.isRequired,
};

SelectQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

/* const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
}); */

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SelectQuestionComponent);
