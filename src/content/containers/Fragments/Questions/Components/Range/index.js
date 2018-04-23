
import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import RangeList from '../../../../../../content/containers/Fragments/Questions/Components/Range/Parts/rangeList';

import { getUsefulQuestionBits } from '../../../../../../content/scripts/custom/utilities';

const Range = ({
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
  };

  // get the question identifier keys
  const questionIdentifier = Object.keys(options)[0];

  const question = (
    <div className="question-sub-title">
      <div style={{ marginTop: '28px' }}>
        <h6 className="grey-text">{drawData[questionIdentifier + 'Title']}</h6>
        <RangeList
          {...obj}
          answer={answerBits[questionIdentifier]}
          options={options[questionIdentifier]}
          questionIdentifier={questionIdentifier}
        />
      </div>
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

Range.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
};

Range.defaultProps = {
  nextStepCallback: () => {},
};

export default Range;
