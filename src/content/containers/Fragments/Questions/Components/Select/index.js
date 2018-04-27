import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import CompanySelectWithRemoteLookup from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/CompanySelectWithRemoteLookup';
import SelectWithOptions from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/SelectWithOptions';
import SelectWithOptionsAllowAddAlternative from '../../../../../../content/containers/Fragments/Questions/Components/Select/Parts/SelectWithOptionsAllowAddAlternative';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
  dNc,
} from '../../../../../../content/scripts/custom/utilities';

function calculateStatsExplainerText(text, answerPercentage, selectedAnswer) {
  let result = text.replace('{answerPercentage}', answerPercentage);
  result = result.replace('{selectedAnswer}', selectedAnswer);

  return result;
}

const SelectQuestionComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
  explainerText,
}) => {
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

  /* HERE WE DO SOME CALCULATIONS FOR THE QUESTIONS */
  if (dNc(answerBits[questionIdentifier]) && answerBits[questionIdentifier].valid === true) {
    // we remove any leading zeros with this regex
    const percentage = questionID.slice(-2).replace(/^0+/, '');

    answerDisplay = {
      type: 'percentages',
      value: percentage,
    };

    if (useExplainerText.type === 'statsExplainer') {
      useExplainerText.useValue = calculateStatsExplainerText(useExplainerText.rawValue, percentage, answerBits[questionIdentifier].optionValue);
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
      )
  } else {
    // todo handle error state here
    console.log('error state here TODO');
    console.log(drawData.type);
  }

  return (
    <QuestionContainer
      title={title}
      question={question}
      error={answer.error}
      errorMessages={errorBits}
      answered={answer.answered}
      explainerText={useExplainerText}
    />
  );
};

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

export default SelectQuestionComponent;
