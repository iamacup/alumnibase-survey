import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import GraduateDestinationButton from './Parts/graduateDestination';
import MostImportant from './Parts/mostImportant';

import { getUsefulQuestionBits } from '../../../../../../content/scripts/custom/utilities';


const GraduateDestinationsComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
}) => {
  const { questionID, options, drawData } = data;
  const { errorBits } = getUsefulQuestionBits(
    options,
    answer.answer,
  );

  const obj = {
    questionID,
    forceValidate: answer.forceValidate,
    nextStepCallback,
  };

  const questionIdentifiers = Object.keys(options);
  const questionParts = [];

  const part = (
    <div style={{ marginTop: '28px' }}>
      <h6 className="grey-text">{drawData[questionIdentifiers[0] + 'Title']}</h6>
      <GraduateDestinationButton
        {...obj}
        answer={answer.answer}
        options={options[questionIdentifiers[0]]}
        options2={options[questionIdentifiers[1]]}
        questionIdentifier={questionIdentifiers[0]}
        questionIdentifier2={questionIdentifiers[1]}
      />
    </div>
  );

  questionParts.push(part);

  const question = (
    <div className="question-sub-title">
      {questionParts}
    </div>
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

GraduateDestinationsComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  // explainerText: PropTypes.object.isRequired,
};

GraduateDestinationsComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default GraduateDestinationsComponent;
