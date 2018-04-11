import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Result from '../../../../../../content/containers/Fragments/Questions/Components/PreUniQualification/Parts/result';
import Subject from '../../../../../../content/containers/Fragments/Questions/Components/PreUniQualification/Parts/subject';
import Type from '../../../../../../content/containers/Fragments/Questions/Components/PreUniQualification/Parts/type';

import {
  getQuestionIdentifiers,
  dNc
} from '../../../../../../content/scripts/custom/utilities';

class PreUniQualificationQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  handleClick(e) {
  e.preventDefault()
  this.setState({
    count: this.state.count+1,
  })
}

  render() {

  const { questionID, options, drawData } = this.props.data;

  const obj = {
    questionID,
    forceValidate: this.props.answer.forceValidate, 
    nextStepCallback: this.props.nextStepCallback,
    drawData,
  };

  let question = null;
  const questionIdentifier = getQuestionIdentifiers(options);
  

  const errorBits = [];

  question = (extension) => {
  let typeAnswer = {};
  let resultAnswer = {};
  let subjectAnswer = {};
  if(dNc(this.props.answer.answer[questionIdentifier[0]+extension])) {
    typeAnswer = this.props.answer.answer[questionIdentifier[0]+extension];
    errorBits.push(this.props.answer.answer[questionIdentifier[0]+extension].errorMessage)
  }
  if(dNc(this.props.answer.answer[questionIdentifier[1]+extension])) {
    resultAnswer = this.props.answer.answer[questionIdentifier[1]+extension];
    errorBits.push(this.props.answer.answer[questionIdentifier[1]+extension].errorMessage)
  }
  if(dNc(this.props.answer.answer[questionIdentifier[2]+extension])) {
    subjectAnswer = this.props.answer.answer[questionIdentifier[2]+extension];
    errorBits.push(this.props.answer.answer[questionIdentifier[2]+extension].errorMessage)
  }

  return (
   <div>
      <div className="row pt-2">
        <div className="col-sm-12 text-center pb-2">
          <Type
            {...obj}
            answer={typeAnswer}
            options={options[questionIdentifier[0]]}
            questionIdentifier={questionIdentifier[0]+extension}
          />
        </div>
      </div>
        <div className="row pb-5">
          <div className="col-sm-6">
            <Subject
               {...obj}
               answer={subjectAnswer}
               options={options[questionIdentifier[2]]}
               questionIdentifier={questionIdentifier[2]+extension}
             />
          </div>
            <div className="col-sm-6">
              <Result
                {...obj}
                answer={resultAnswer}
                options={options[questionIdentifier[1]]}
                questionIdentifier={questionIdentifier[1]+extension}
                typeAnswer={typeAnswer}
                />
            </div>
        </div>
    </div>
  )};

  const arr = [];

  for(let a=0; a<this.state.count; a++) {
    const thing = (
        <div>
          {question('_'+a)}
        </div>
      );

    arr.push(thing);
  }


  return (
    <div>
    <QuestionContainer
      title={this.props.title}
      question={arr}
      error={this.props.answer.error}
      errorMessages={errorBits}
      answered={this.props.answer.answered}
    />

        <div className="row justify-content-center pb-5">
        <div className="col-8">
        <button type="button" class="btn btn-secondary" onClick={(e) => this.handleClick(e)}>Add more qualifications</button>
        </div>
        </div>
    </div>
  );
};
}

PreUniQualificationQuestion.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
};

PreUniQualificationQuestion.defaultProps = {
  nextStepCallback: () => {},
};

export default PreUniQualificationQuestion;
