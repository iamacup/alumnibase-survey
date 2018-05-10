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
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  nextStepCallback: PropTypes.func,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.array.isRequired,
}

export default Qualification;