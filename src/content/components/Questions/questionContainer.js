import React from 'react';
import PropTypes from 'prop-types';

const QuestionContainer = ({
  title,
  question,
  error,
  errorMessages,
  answered,
  explainerText,
  postContent,
}) => {
  let errorClassName = 'question-error-message';
  let statusClassName = 'general-question-container';
  const errors = [];
  // let buttons = '';

  if (error !== true) {
    errorClassName = 'd-none';
  } else {
    statusClassName += ' question-error';

    let count = 0;

    errorMessages.forEach((value) => {
      errors.push(<h6 key={count}>{value}</h6>);

      count++;
    });
  }

  if (answered === true) {
    statusClassName += ' question-success';
  }

  return (
    <div className={statusClassName}>
      <div className="d-flex justify-content-center">
        <div className="question-spacer">
          <div className="d-flex align-items-stretch" style={{ height: '100%' }}>
            <div className="question-answer-line" />
          </div>    
        </div>

        <div className="center-question">
          <h5 className="dark-text" style={{ marginBottom: '22px' }}>{title}</h5>
          <div className="text-left">{question}</div>
          <div className={errorClassName}>{errors}</div>
          <div className="explainer-text">
            <h6 className="grey-text">{explainerText.useValue}</h6>

          </div>
          {postContent}
        </div>

        <div className="question-spacer" style={{ height: '1px' }} />
      </div>
    </div>
  );
};

QuestionContainer.propTypes = {
  title: PropTypes.string,
  question: PropTypes.any.isRequired,
  error: PropTypes.bool.isRequired,
  answered: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  explainerText: PropTypes.object,
  postContent: PropTypes.any,
};

QuestionContainer.defaultProps = {
  title: '',
  // this is duplicated in the question renderer - need to update this and that together
  explainerText: {
    rawValue: '',
    type: null,
    useValue: '',
  },
  postContent: null,
};

export default QuestionContainer;
