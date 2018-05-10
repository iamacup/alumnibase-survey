import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc } from '../../../../../../../content/scripts/custom/utilities';

import * as questionAction from '../../../../../../../content/containers/Fragments/Questions/Components/action';

class GDPRButton extends React.Component {
  componentDidMount() {
    // wait for doc to be ready.
    // set question error
    $(() => {
      this.putItemIntoState();
    });
  }

  componentDidUpdate() {
    const { questionIdentifier, questionID, answer } = this.props;
    const validity = this.validate(this.props.answer);

    // setting stuff as an error if they need to
    if (validity.valid === false &&
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

  putItemIntoState() {
    let { questionIdentifier } = this.props;
    const { questionID, options } = this.props;

    questionIdentifier.forEach((name) => {
      const { optionID, optionValue } = options[name][1];
      const validity = this.validate({ optionID, optionValue });

      questionIdentifier = name;

      this.props.reduxAction_doUpdateQuestionAnswer(
        questionID,
        questionIdentifier,
        optionID,
        optionValue,
        validity.valid,
      );
    });
  }

  validate(answer) {
    const error = '';
    const show = false;
    let valid = false;

    if (dNc(answer) && dNc(answer.optionID)) {
      valid = true;
    }

    return { valid, error, show };
  }

  handleChange(e, questionIdentifier) {
    e.preventDefault();
    const { questionID } = this.props;
    let optionID = null;
    let optionValue = null;

    this.props.options[questionIdentifier].forEach((element) => {
      if (element.optionID !== this.props.answer[questionIdentifier].optionID) {
        ({ optionID, optionValue } = element);
      }
    });
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
    const bools = [];

    if (this.props.answer[this.props.questionIdentifier[0]].optionValue === 'Yes') bools[0] = true;
    else bools[0] = false;

    if (this.props.answer[this.props.questionIdentifier[1]].optionValue === 'Yes') bools[1] = true;
    else bools[1] = false;

    if (this.props.answer[this.props.questionIdentifier[2]].optionValue === 'Yes') bools[2] = true;
    else bools[2] = false;

    return (
      <div className="d-flex justify-content-center">
        <div className="gdprPage" id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div onClick={e => this.handleChange(e, this.props.questionIdentifier[0])}>
                <div className="row">
                  <div className="col-10 align-self-center">
                    <h5 className="mb-0">
          Holding your Personal Information
                    </h5>
                  </div>
                  <div className="col-2">
                    <input className="checkbox" type="checkbox" onChange={e => this.handleChange(e, this.props.questionIdentifier[0])} checked={bools[0]} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-body">
      You consent to AlumniBase holding and processing your personal information and sensitive personal information that you submit as part of taking this survey. This is vital so that we can provide the anonymised and aggregate insights to your university so they can improve their service. No personally identifiable information is shared with anyone.
              </div>
            </div>
          </div>


          <div className="card">
            <div className="card-header" id="headingTwo">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div onClick={e => this.handleChange(e, this.props.questionIdentifier[1])}>
                <div className="row">
                  <div className="col-10 align-self-center">
                    <h5 className="mb-0">
          Our Marketing by Email
                    </h5>
                  </div>
                  <div className="col-2">
                    <input className="checkbox" type="checkbox" onChange={e => this.handleChange(e, this.props.questionIdentifier[1])} checked={bools[1]} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-body">
     You consent to receiving our emails in future if there are any further questions we add to the survey that might be applicable to you. For example, we might ask you to update us on your career in three years time, while also sending you new information about where you stand in your peer group. These emails will not be frequent!
              </div>
            </div>
          </div>


          <div className="card">
            <div className="card-header" id="headingThree">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div onClick={e => this.handleChange(e, this.props.questionIdentifier[2])}>
                <div className="row">
                  <div className="col-10 align-self-center">

                    <h5 className="mb-0">
          3rd Party Marketing via Email
                    </h5>
                  </div>
                  <div className="col-2">
                    <input className="checkbox" type="checkbox" onChange={e => this.handleChange(e, this.props.questionIdentifier[2])} checked={bools[2]} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card-body">
      Your university may launch a further study course or some professional development that our algorithms may identify as being useful for your career. By ticking this box you consent to us emailing you to let you know about these opportunities for further professional development.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GDPRButton.propTypes = {
  reduxAction_doUpdateQuestionAnswer: PropTypes.func,
  reduxAction_doSetQuestionError: PropTypes.func,
  questionID: PropTypes.string.isRequired,
  forceValidate: PropTypes.bool.isRequired,
  nextStepCallback: PropTypes.func,
  drawData: PropTypes.array.isRequired,
  answer: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  questionIdentifier: PropTypes.array.isRequired,
};

GDPRButton.defaultProps = {
  reduxAction_doUpdateQuestionAnswer: () => {},
  reduxAction_doSetQuestionError: () => {},
  nextStepCallback: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdateQuestionAnswer: (
    questionID,
    name,
    optionID,
    optionValue,
    valid,
  ) => dispatch(
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

export default connect(mapStateToProps, mapDispatchToProps)(GDPRButton);
