import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Hours from '../../../../../../content/containers/Fragments/Questions/Components/HoursContractedActual/Parts/hours';

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
    <div>
      <div className="row justify-content-center">
        <div className="col-12 text-center mb-2">
          {drawData.subTitles[questionIdentifier[0]]}
        </div>
        <div className="col-10 mb-3">
          <Hours
            {...obj}
            answer={answerBits[questionIdentifier[0]]}
            options={options[questionIdentifier[0]]}
            questionIdentifier="contract"
          />
        </div>
        <div className="col-12 text-center mb-2">
          {drawData.subTitles[questionIdentifier[1]]}
        </div>
        <div className="col-10">
          <Hours
            {...obj}
            answer={answerBits[questionIdentifier[1]]}
            options={options[questionIdentifier[1]]}
            questionIdentifier="actual"
          />
        </div>
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
