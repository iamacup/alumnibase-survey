import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonGroup from '../../../../../../../content/components/ButtonGroup';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class SelectQuestionCompanySelectWithRemoteLookupComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      // this.setValueFromState();
    });
  }

  componentDidUpdate() {
    // this.setValueFromState();

    const { questionIdentifier, questionID, answer } = this.props;
    const validity = this.validate(this.props.answer);

    // set stuff as an error if they need to be
    if (
      validity.valid === false &&
      (validity.show === true || this.props.forceValidate === true) &&
      answer.errorMessage !== validity.error
    ) {
      this.props.reduxAction_doSetQuestionError(
        questionID,
        validity.error,
        questionIdentifier,
      );
    }
  }

  /*
  We don't need this because we sort out setting the value from state in render

  setValueFromState() {
    if (dNc(this.props.answer.optionValue)) {
      // set the state
    }
  } */

  validate(answer) {
    let error = '';
    let show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionID)) {
      valid = true;
    } else {
      error = 'You need to select an option.';
      show = false;
    }

    return { valid, error, show };
  }

  buttonPress(dataArr) {
    // press
    const optionID = dataArr[0];
    let optionValue = null;

    // pull the option value
    this.props.options.forEach((value) => {
      if (value.optionID === optionID) {
        ({ optionValue } = value);
      }
    });

    const { questionID, questionIdentifier } = this.props;
    const validity = this.validate({ optionValue, optionID });

    this.props.reduxAction_doUpdateQuestionAnswer(
      questionID,
      questionIdentifier,
      optionID,
      optionValue,
      validity.valid,
    );
  }

  render() {
    const options = [];

    this.props.options.forEach((value) => {
      let className = 'btn btn-block btn-option btn-multiline btn-margin';
      // let answered = false;

      if (dNc(value.drawData) && dNc(value.drawData.optionEmphasis)) {
        className += ' btn-emphasis';
      }

      if (
        dNc(this.props.answer.optionID) &&
        this.props.answer.optionID === value.optionID &&
        this.props.answer.valid === true
      ) {
        className += ' answered';
        // answered = true;
      }


      const obj = (
        <div key={value.optionID} className="col-sm mb-2 mb-sm-0">
          <div style={{ margin: '0 4px', height: '100%' }}>
            <button
              style={{ height: '100%' }}
              value={value.optionID}
              className={className}
            >
              {value.optionValue}
            </button>
          </div>
        </div>
      );

      options.push(obj);
    });

    return (
      <ButtonGroup
        wrapperClass="row no-gutters padded-buttons"
        buttons={options}
        callback={(data) => {
          this.buttonPress(data);
        }}
        singleSelect
      />
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  // nextStepCallback: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  // nextStepCallback: () => { },
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

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectQuestionCompanySelectWithRemoteLookupComponent,
);
