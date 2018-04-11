import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import FirstName from '../../../../../../content/containers/Fragments/Questions/Components/MultiName/Parts/firstname';
import LastName from '../../../../../../content/containers/Fragments/Questions/Components/MultiName/Parts/lastname';

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
    <div className="row ">
      <div className="col-sm-12 text-center pb-2">
        <FirstName
          {...obj}
          answer={answerBits[questionIdentifier[0]]}
          options={options[questionIdentifier[0]]}
          questionIdentifier={questionIdentifier[0]}
        />
      </div>
      <div className="col-sm-12">
        <LastName
          {...obj}
          answer={answerBits[questionIdentifier[1]]}
          options={options[questionIdentifier[1]]}
          questionIdentifier={questionIdentifier[1]}
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
