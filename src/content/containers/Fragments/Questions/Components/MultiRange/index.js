
import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Standard from '../../../../../../content/containers/Fragments/Questions/Components/MultiRange/Parts/Standard';

import { getUsefulQuestionBits } from '../../../../../../content/scripts/custom/utilities';

const MultiRangeQuestionComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
  // explainerText,
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
  };

  // get the question identifier keys
  const questionIdentifiers = Object.keys(options);
  const questionParts = [];

  questionIdentifiers.forEach((value, i) => {
    const part = (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} style={{ marginTop: '28px' }}>
        <h6 className="grey-text">{drawData[value + 'Title']}</h6>
        <Standard
          {...obj}
          answer={answerBits[value]}
          options={options[value]}
          questionIdentifier={value}
        />
      </div>
    );

    questionParts.push(part);
  });

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

MultiRangeQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  // explainerText: PropTypes.object.isRequired,
};

MultiRangeQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default MultiRangeQuestionComponent;
