import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class SelectQuestionCompanySelectWithRemoteLookupComponent extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      const id = this.props.questionID.slice(10);
      const _ = this;

      $('.ex1-' + id).slider();
      $('.ex1-' + id).on('slide', (slideEvt) => {
        $('#ex1-' + id + 'SliderVal').text(slideEvt.value);
        const { value } = slideEvt;
        _.handleSlide(value);
      });
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

  handleSlide(value) {
    const optionValue = value;

    const id = this.props.options.filter((element) => {
      if (Number(element.optionValue) === value) return element.optionID;
      return null;
    });

    const { optionID } = id[0];

    const { questionIdentifier, questionID } = this.props;
    const validity = this.validate({ optionValue, optionID });

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
    let valid = false;


    if (dNc(answer) && dNc(answer.optionID)) {
      valid = true;
    } else {
      error = 'You need to select an option.';
      show = false;
    }

    return { valid, error, show };
  }

  render() {
    const max = this.props.options[this.props.options.length - 1].optionValue;
    const id = 'ex1-' + this.props.questionID.slice(10);

    return (
        <div className="row justify-content-center">
        <div className="col-8 text-center">
          <input
            className={id}
            id={this.props.questionID}
            data-slider-id="ex1Slider"
            type="text"
            data-slider-min={this.props.options[0].optionValue}
            data-slider-max={max}
            data-slider-step="1"
            data-slider-value={max/2}
            tooltip_position="bottom"
          />
        </div>
        <div className="col-2 justify-content-start">
          <div id="ex1CurrentSliderValLabel"><span id={id + 'SliderVal'} /></div>
      </div>
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
