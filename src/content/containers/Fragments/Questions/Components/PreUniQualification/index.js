import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Qualification from '../../../../../../content/containers/Fragments/Questions/Components/PreUniQualification/Parts/qualification';
import Subject from '../../../../../../content/containers/Fragments/Questions/Components/PreUniQualification/Parts/subject';
import Grade from '../../../../../../content/containers/Fragments/Questions/Components/PreUniQualification/Parts/grade';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
  dNc,
} from '../../../../../../content/scripts/custom/utilities';

const preUniQualificationComponent = ({
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

  const questionIdentifier = getQuestionIdentifiers(options);
  const obj = {
    questionID,
    forceValidate: answer.forceValidate,
    nextStepCallback,
    drawData,
  };

  let qualificationAnswer = null;
  let gradeAnswer = null;

  if (dNc(answerBits[questionIdentifier[0]])) {
    qualificationAnswer = answerBits[questionIdentifier[0]];
  }

  if (dNc(answerBits[questionIdentifier[1]])) {
    gradeAnswer = answerBits[questionIdentifier[1]];
  }

  const question = (
    <div>
      <div className="row">
        <div className="col-12 mb-2">
          <Qualification
            {...obj}
            answer={answerBits[questionIdentifier[0]]}
            options={options[questionIdentifier[0]]}
            questionIdentifier={questionIdentifier[0]}
            gradeAnswer={gradeAnswer}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Subject 
          {...obj}
          answer={answerBits[questionIdentifier[2]]}
          questionIdentifier={questionIdentifier[2]}
          />
        </div>
        <div className="col-6">
          <Grade
            {...obj}
            answer={answerBits[questionIdentifier[1]]}
            options={options[questionIdentifier[1]]}
            questionIdentifier={questionIdentifier[1]}
            qualificationAnswer={qualificationAnswer}
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
      explainerText={useExplainerText}
    />
  );
};

preUniQualificationComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  explainerText: PropTypes.object.isRequired,
};

preUniQualificationComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default preUniQualificationComponent;
