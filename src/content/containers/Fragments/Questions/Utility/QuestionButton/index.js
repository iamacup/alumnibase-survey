
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialState as questionsInitialState } from '../../../../../../content/containers/Fragments/Questions/Components/reducer';
import { initialState as authenticationInitialState } from '../../../../../../content/containers/Fragments/Authentication/reducer';

import { dNc } from '../../../../../../content/scripts/custom/utilities';

class QuestionButton extends React.PureComponent {
  allQuestionsAnswered() {
    if (dNc(this.props.reduxState_questions) && this.props.reduxState_questions) {
      const questions = this.props.reduxState_questions;
      const keys = Object.keys(questions);

      let answered = true;

      keys.forEach((key) => {
        if (questions[key].answered === true && questions[key].error === false) {
          // do nothing, all okay
        } else {
          answered = false;
        }
      });

      return answered;
    }

    return false;
  }

  isError() {
    if (dNc(this.props.reduxState_questions) && this.props.reduxState_questions) {
      const questions = this.props.reduxState_questions;
      const keys = Object.keys(questions);

      let error = false;

      keys.forEach((key) => {
        if (questions[key].error === true) {
          error = true;
        }
      });

      return error;
    }

    return false;
  }

  render() {
    const arr = Object.entries(this.props.reduxState_questions);
    let buttonClass = this.props.buttonClassName;

    // check to see how many questions there are on the page - if it is 0 we hide the button
    if (arr.length === 0) {
      buttonClass += ' d-none';
    }

    // we might have to hide the button if the user is logged in
    if (
      this.props.showButtonIfLoggedIn === false &&
      this.props.reduxState_authentication.loggedIn === true
    ) {
      buttonClass += ' d-none';
    }

    let overallClass = '';

    // add 'answered' class if all answered
    if (this.allQuestionsAnswered() === true) {
      buttonClass += ' answered';
      overallClass = 'success-button-container';
    }

    // let errorMessageClass = 'd-none';
    let { buttonContent } = this.props;

    if (this.isError() === true) {
      buttonClass += ' error';
      // errorMessageClass = '';
      buttonContent = this.props.buttonErrorContent;
    }

    let disabled = false;

    // we check that all the questions are answered
    if (this.props.disabled === true) {
      disabled = true;
    }

    return (
      <div className={overallClass}>
        <div className="d-flex justify-content-center">

          <div className="question-spacer">
            <div className="d-flex align-items-stretch" style={{ height: '100%' }} id="question-answer-line-button-mobile">
              <div className="question-answer-line-button" />
            </div>
          </div>

          <div className="center-question" style={{ paddingBottom: '0px' }}>
            <button
              onClick={this.props.buttonAction}
              type="submit"
              className={buttonClass}
              disabled={disabled}
            >
              {buttonContent}
            </button>
          </div>

          <div className="question-spacer" style={{ height: '1px' }} />

        </div>
      </div>
    );
  }
}

QuestionButton.propTypes = {
  reduxState_questions: PropTypes.object,
  reduxState_authentication: PropTypes.object,
  buttonAction: PropTypes.func,
  showButtonIfLoggedIn: PropTypes.bool,
  buttonClassName: PropTypes.string.isRequired,
  buttonContent: PropTypes.any.isRequired,
  buttonErrorContent: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};

QuestionButton.defaultProps = {
  reduxState_questions: questionsInitialState,
  reduxState_authentication: authenticationInitialState,
  buttonAction: () => {},
  showButtonIfLoggedIn: false,
  disabled: false,
};

const mapStateToProps = state => ({
  reduxState_questions: state.questions,
  reduxState_authentication: state.authentication,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionButton);
