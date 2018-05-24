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

class preUniQualificationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };
  }

  handleClick(e) {
    e.preventDefault();

    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    const { questionID, options, drawData } = this.props.data;
    const { answer, nextStepCallback, title } = this.props;
    const questionIdentifier = getQuestionIdentifiers(options);

      let answerBits = null;
      let errorBits = null;

    const obj = {
      questionID,
      forceValidate: answer.forceValidate,
      nextStepCallback,
      drawData,
    };

    let question = null;
    // const errorBits = [];

    question = (extension) => {
      let qualificationAnswer = {};
      let gradeAnswer = {};
      let subjectAnswer = {};

    ({ answerBits, errorBits } = getUsefulQuestionBits(
      options,
      answer.answer,
      extension,
    ));

      if (dNc(answerBits[questionIdentifier[0] + extension])) {
        qualificationAnswer = answerBits[questionIdentifier[0] + extension];
        // errorBits.push(answerBits[questionIdentifier[0] + extension].errorMessage);
      }

      if (dNc(answerBits[questionIdentifier[1] + extension])) {
        gradeAnswer = answerBits[questionIdentifier[1] + extension];
        // errorBits.push(answerBits[questionIdentifier[1] + extension].errorMessage);
      }

      if (dNc(answerBits[questionIdentifier[2] + extension])) {
        subjectAnswer = answerBits[questionIdentifier[2] + extension];
        // errorBits.push(answerBits[questionIdentifier[2] + extension].errorMessage);
      }

      return (
        <div>
          <div className="row">
            <div className="col-12 mb-2">
              <Qualification
                {...obj}
                answer={qualificationAnswer}
                options={options[questionIdentifier[0]]}
                questionIdentifier={questionIdentifier[0] + extension}
                gradeAnswer={gradeAnswer}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <Subject
                {...obj}
                answer={subjectAnswer}
                questionIdentifier={questionIdentifier[2] + extension}
              />
            </div>
            <div className="col-6">
              <Grade
                {...obj}
                answer={gradeAnswer}
                questionIdentifier={questionIdentifier[1] + extension}
                qualificationAnswer={qualificationAnswer}
              />
            </div>
          </div>
        </div>
      );
    };

    const arr = [];

    for (let a = 0; a < this.state.count; a++) {
      const thing = (
        <div key={a}>
          {question('_' + a)}
        </div>
      );

      arr.push(thing);
    }

    // let postContent = ('');

    // if (3 * this.state.count === Object.keys(answer.answer).length) {
     let postContent = (
        <div className="row justify-content-center pb-3">
          <div className="col-8">
            <button type="button" className="btn btn-secondary" onClick={e => this.handleClick(e)}>Add more qualifications</button>
          </div>
        </div>
      );
    // }

    // console.log(answerBits, 'answerBits');
    // console.log(answer);

    return (
      <QuestionContainer
        title={title}
        question={arr}
        error={answer.error}
        errorMessages={errorBits}
        answered={answer.answered}
        postContent={postContent}
      />
    );
  }
}

preUniQualificationComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
};

preUniQualificationComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default preUniQualificationComponent;
