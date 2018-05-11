import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  dNc,
  debounce,
} from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class Subject extends React.Component {
  componentDidMount() {
  // wait for document to load
    $(() => {
      this.putItemIntoState();
    });
  }

  componentDidUpdate() {
    const { questionIdentifier, questionID, answer } = this.props;
    const validity = this.validate(answer);

    if (
      validity.valid === false &&
    (validity.show === true) &&
    answer.errorMessage !== validity.error
    ) {
      this.props.reduxAction_doSetQuestionError(
        questionID,
        validity.error,
        questionIdentifier,
      );
    }
  }

  putItemIntoState() {
    const { questionIdentifier, questionID } = this.props;
    const optionID = null;
    let optionValue = null;

    if (dNc(this.input.value)) optionValue = this.input.value;

    const validity = this.validate({ optionID, optionValue });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  validate(answer) {
    let error = '';
    let show = false;
    let valid = true;

    if (dNc(answer) && dNc(answer.optionValue)) {
      if (answer.optionValue.length > 20) {
        error = 'There is too much text in here. The max length is 20';
        show = true;
        valid = false;
      } else {
        valid = true;
      }
    }

    return { valid, error, show };
  }

  render() {
    return (
      <span className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Subject (optional)"
          ref={(input) => {
            this.input = input;
          }}
          onChange={
            debounce(() => {
              this.putItemIntoState();
            }, 400)
          }
          maxLength="20"
        />
      </span>
    );
  }
}

Subject.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  drawData: PropTypes.object.isRequired,
};

Subject.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
};

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
    ),
  reduxAction_doSetQuestionError: (questionID, message, name) =>
    dispatch(questionAction.doSetQuestionError(questionID, message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
