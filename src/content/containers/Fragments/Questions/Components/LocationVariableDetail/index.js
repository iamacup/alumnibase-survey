import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Postcode from '../../../../../../content/containers/Fragments/Questions/Components/LocationVariableDetail/Parts/postcode';
import DontKnowButton from '../../../../../../content/containers/Fragments/Questions/Components/LocationVariableDetail/Parts/dontKnowButton';

import {
  getQuestionIdentifiers,
  getUsefulQuestionBits,
  dNc,
} from '../../../../../../content/scripts/custom/utilities';

const PostcodeComponent = ({
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
  // get the questionIdentifier
  const questionIdentifier = getQuestionIdentifiers(options);

  // set the questions to render
  question = (
    <div>
      <Postcode
        {...obj}
        answer={answerBits[questionIdentifier]}
        questionIdentifier={questionIdentifier}
      />
      <DontKnowButton
        {...obj}
        answer={answerBits[questionIdentifier]}
        questionIdentifier={questionIdentifier}
      />
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

PostcodeComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
};

PostcodeComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default PostcodeComponent;
