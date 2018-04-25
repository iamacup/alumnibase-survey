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
      $('#ex1').slider({
        formatter(value) {
          return 'Current value: ' + value;
        },
      });
      // $(document).ready('nifty');
      // $(document).trigger('nifty.ready');
    });
  }

  componentDidUpdate() {
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
    const optionID = dataArr[0];
    let optionValue = null;

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

      if (dNc(value.drawData) && dNc(value.drawData.optionEmphasis)) {
        className += ' btn-emphasis';
      }

      if (
        dNc(this.props.answer.optionID) &&
        this.props.answer.optionID === value.optionID &&
        this.props.answer.valid === true
      ) {
        className += ' answered';
      }

      const obj = (
        <div key={value.optionID} className="col-sm-2 col-xl mb-2 mb-sm-0">
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

    const max = this.props.options[this.props.options.length - 1].optionValue;

    console.log(this.props.answer);
    return (
      <div>
        <input
          id="ex1"
          data-slider-id="ex1Slider"
          type="text"
          data-slider-min={this.props.options[0].optionValue}
          data-slider-max={max}
          data-slider-step="1"
          data-slider-value={max / 2}
        />

        <input
          id="ex6"
          type="text"
          data-slider-min="-5"
          data-slider-max="20"
          data-slider-step="1"
          data-slider-value="3"
        />
        <span id="ex1CurrentSliderValLabel">Current Slider Value: <span id="ex1SliderVal">3</span></span>
      </div>
    );
  }
}

SelectQuestionCompanySelectWithRemoteLookupComponent.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  answer: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

SelectQuestionCompanySelectWithRemoteLookupComponent.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectQuestionCompanySelectWithRemoteLookupComponent,
);
