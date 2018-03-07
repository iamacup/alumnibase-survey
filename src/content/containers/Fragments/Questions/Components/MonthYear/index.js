import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import StandardMonthYear from '../../../../../../content/containers/Fragments/Questions/Components/MonthYear/Parts/StandardMonthYear';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
} from '../../../../../../content/scripts/custom/utilities';

const OptionsQuestionComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
}) => {
  const { questionID, options } = data;
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

  const question = (
    <StandardMonthYear
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

OptionsQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
};

OptionsQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default OptionsQuestionComponent;
