import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import GDPRButton from '../../../../../../content/containers/Fragments/Questions/Components/GDPRQuestion/Parts/radio';

import {
  getUsefulQuestionBits,
  getQuestionIdentifiers,
} from '../../../../../../content/scripts/custom/utilities';


const GDPRQuestionComponent = ({
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
    <div className="row justify-content-center">
      <div className="col-12">
        <GDPRButton
          {...obj}
          answer={answerBits}
          options={options}
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
      explainerText={useExplainerText}
    />
  );
};

GDPRQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  explainerText: PropTypes.object.isRequired,
};

GDPRQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default GDPRQuestionComponent;
