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
      <div className="row mb-3">
        <div className="col-6">
      Total hours worked:
        </div>
        <div className="col-6">
          <Hours
            {...obj}
            answer={answer.answer[questionIdentifier[1]]}
            options={options[questionIdentifier[1]]}
            questionIdentifier="actual"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
      Contracted hours:
        </div>
        <div className="col-6">
          <Hours
            {...obj}
            answer={answer.answer[questionIdentifier[0]]}
            options={options[questionIdentifier[0]]}
            questionIdentifier="contract"
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
