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

  const question = (
    <div>
      <div className="row justify-content-center">
        <Qualification />
      </div>
      <div className="row">
        <div className="col-6">
          <Subject />
        </div>
        <div className="col-6">
          <Grade />
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
