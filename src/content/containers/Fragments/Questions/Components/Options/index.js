import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import StandardOptions from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/StandardOptions';
import ListOptions from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/ListOptions';
import OptionsWithTooltips from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/OptionsWithTooltips';
import MultiSelectOptions from '../../../../../../content/containers/Fragments/Questions/Components/Options/Parts/MultiSelectOptions';

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

const OptionsQuestionComponent = ({
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
  };

  // get the questionIdentifier
  const questionIdentifier = getQuestionIdentifiers(options);
  let question = null;

  /* const answerDisplay = {
    type: 'percentages',
    data: [
      { optionID: 'options/42960331479', value: '68' },
      { optionID: 'options/42960331480', value: '32' },
    ],
  }; */

  let answerDisplay = null;

  /* HERE WE DO SOME CALCULATIONS FOR THE QUESTIONS */
  const finalData = [];
  let remaining = 100;
  let count = 0;

  if (dNc(answerBits[questionIdentifier]) && answerBits[questionIdentifier].valid === true) {
    let answeredPercentage = 0;

    options[questionIdentifier].forEach((item) => {
      const skew = questionID.slice(-2) / 100;

      let newValue = Math.floor(remaining * skew);

      if (count === options[questionIdentifier].length - 1) {
        newValue = remaining;
      }

      remaining -= newValue;

      finalData.push({ optionID: item.optionID, value: newValue });

      count++;

      // pull out the value for the thing we just answered
      if (item.optionID === answerBits[questionIdentifier].optionID) {
        answeredPercentage = newValue;
      }
    });

    if (useExplainerText.type === 'statsExplainer') {
      useExplainerText.useValue = calculateStatsExplainerText(useExplainerText.rawValue, answeredPercentage, answerBits[questionIdentifier].optionValue);
    }
  }
  /* STOP CALCULATIONS */

  if (finalData.length > 0) {
    answerDisplay = {
      type: 'percentages',
      data: finalData,
    };
  }

  // nullify the results if we have to (todo - when we get from an API this would bne where we do or do not do the call? or something)
  if (dNc(data.drawData) && dNc(data.drawData.showAnswerStats) && data.drawData.showAnswerStats === false) {
    answerDisplay = null;
  }


  let multiSelectAnswer = {};
  if (dNc(answer.answer)) {
    multiSelectAnswer = answer.answer;
  }
// console.log(answerBits, questionIdentifier, multiSelectAnswer)
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

OptionsQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  explainerText: PropTypes.object.isRequired,
};

OptionsQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default OptionsQuestionComponent;
