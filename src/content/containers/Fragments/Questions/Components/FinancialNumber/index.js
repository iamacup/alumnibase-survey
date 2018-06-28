import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Income from '../../../../../../content/containers/Fragments/Questions/Components/FinancialNumber/Parts/income';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
} from '../../../../../../content/scripts/custom/utilities';

const FreeTextQuestionComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
}) => {
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

  let question = null;
  const questionIdentifier = getQuestionIdentifiers(options);

  question = (
    <Income
      {...obj}
      answer={answerBits[questionIdentifier]}
      options={options[questionIdentifier]}
      questionIdentifier={questionIdentifier}
    />
  );

  return (
    <QuestionContainer
      title={title}
      question={question}
      error={answer.error}
      errorMessages={errorBits}
      answered={answer.answered}
    />
  );
};

FreeTextQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
};

FreeTextQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default FreeTextQuestionComponent;
