import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Qualification extends React.Component {
  componentDidMount() {
    // wait for component to load
  }

//validate
//componentDidUpdate
//set state

  render() {
    return (
      <div>
        Qualification component
      </div>
      )
  }
}


Qualification.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  // nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  drawData: PropTypes.object.isRequired,
  allowAdd: PropTypes.bool.isRequired,
  answerDisplay: PropTypes.any,
}

Qualifications.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
    answerDisplay: null,
  }

  const mapStateToProps = null;

  const mapDispatchToProps = dispatch => ({
    reduxAction_doUpdateQuestionAnswer: (
      questionID,
      name,
      optionID,
      optionValue,
      valid,
    ) => 
      dispatch(
       questionAction.doUpdateQuestionAnswer(
        questionID,
        name,
        optionID,
        optionValue,
        valid,
      ),
    )
      reduxAction_doSetQuestionError: (questionID, message, name) => 
      dispatch(questionAction.doSetQuestionError(questionID, message, name)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(Qualification);
