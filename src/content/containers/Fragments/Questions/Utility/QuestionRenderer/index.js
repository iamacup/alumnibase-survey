
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionComponentWrapper from '../../../../../../content/containers/Fragments/Questions/Utility/QuestionComponentWrapper';

import { dNc } from '../../../../../../content/scripts/custom/utilities';
import {
  initialState as questionsInitialState,
  questionInitialState as answerInitialState,
} from '../../../../../../content/containers/Fragments/Questions/Components/reducer';

const sortedRelevantBits = (questionID, friendlyName, answers) => {
  const keys = Object.keys(answers);
  const foundItems = [];

  keys.forEach((key) => {
    if (key.startsWith(questionID) && dNc(answers[key][friendlyName])) {
      foundItems.push({
        data: answers[key][friendlyName],
        arrayValue: Number.parseInt(key.split('_')[1], 10),
        questionID,
      });
    }
  });

  // we sort the values so that they are in order of arrayValue
  const compare = (a, b) => {
    if (a.arrayValue < b.arrayValue) { return -1; }
    if (a.arrayValue > b.arrayValue) { return 1; }
    return 0;
  };

  foundItems.sort(compare);

  return foundItems;
};

const sortedRelevantBitsNoFriendlyName = (questionID, answers) => {
  const keys = Object.keys(answers);
  const foundItems = [];

  keys.forEach((key) => {
    if (key.startsWith(questionID)) {
      foundItems.push({
        data: answers[key],
        arrayValue: Number.parseInt(key.split('_')[1], 10),
        questionID,
      });
    }
  });

  // we sort the values so that they are in order of arrayValue
  const compare = (a, b) => {
    if (a.arrayValue < b.arrayValue) { return -1; }
    if (a.arrayValue > b.arrayValue) { return 1; }
    return 0;
  };

  foundItems.sort(compare);

  return foundItems;
};

class QuestionRenderer extends React.Component {
  // this looks for the {questionID.friendlyName|alternative} thing in titles and
  // [questionID.friendlyName|seperator]
  // do not think this would work for more than 1 of the things existing in the title!
  // todo this could be streamlined, horribly large ammount of code for two rexex replaces
  getNewTitle(title, answers) {
    // const results = [];
    // here we see if we need to replace any of the titles in the data object that are for {} replacements (non array)
    const regex1 = /\{([a-zA-Z]+\/[0-9]+_[0-9a-zA-Z]+)\.([0-9a-zA-Z]+)\|(.*?)\}/g;
    const regex2 = /\[([a-zA-Z]+\/[0-9]+)\.([0-9a-zA-Z]+)\|(.*?)\]/g;
    let m;
    let newTitle = null;

    // THIS CHUNK LOOKS FOR SIMPLE REPLACEMENTS

    // eslint-disable-next-line no-cond-assign
    while ((m = regex1.exec(title)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex1.lastIndex) {
        regex1.lastIndex++;
      }

      // we now can see that we have a match and need to do something
      if (m.length === 4) {
        let questionID = m[1];
        let friendlyName = m[2];
        const alternative = m[3];
        const arrayValue = questionID.split('_')[1];
        // eslint-disable-next-line prefer-destructuring
        questionID = questionID.split('_')[0];

        if (friendlyName === 'companyName') {
          friendlyName = 'company';
        }
        // we pull out all the values that apply and then sort them so we can handle 'last', 'first' etc.
        // we do this by sorting it and then updating the questionID to be what we pull out as the final result
        // we loop the keys looking for something that starts with the questionID and has the friendlyName
        if (this.props.useMutatedTitles === true) {
          const foundItems = sortedRelevantBits(questionID, friendlyName, answers);
          if (arrayValue === 'latest' && foundItems.length > 0) {
            newTitle = title.replace(m[0], foundItems[foundItems.length - 1].data.optionValue);
          } else if (arrayValue === 'first' && foundItems.length > 0) {
            newTitle = title.replace(m[0], foundItems[0].data.optionValue);
          } else {
            newTitle = title.replace(m[0], alternative);
          }
        } else {
          newTitle = title.replace(m[0], alternative);
        }
      }
      // console.log(newTitle) // inside the while loop logs both titles with company and uni
    }
    // console.log(newTitle)  // outside only logs the title being passed to the question, newTitle is being replaced with the uni name?


    // THIS CHUNK LOOKS FOR ARRAY REPLACEMENTS

    // eslint-disable-next-line no-cond-assign
    while ((m = regex2.exec(title)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex2.lastIndex) {
        regex2.lastIndex++;
      }

      // we now can see that we have a match and need to do something
      if (m.length === 4) {
        const questionID = m[1];
        const friendlyName = m[2];
        const seperator = m[3];

        // we loop the keys looking for something that starts with the questionID and has the friendlyName
        const foundItems = sortedRelevantBits(questionID, friendlyName, answers);

        // we compile the final string
        let compiledTitle = '';

        foundItems.forEach((item) => {
          compiledTitle += item.data.optionValue + seperator;
        });

        // remove the trailing seperator
        compiledTitle = compiledTitle.substring(0, compiledTitle.length - seperator.length);

        // do the replace
        newTitle = title.replace(m[0], compiledTitle);
      }
    }

    if (newTitle === null) {
      return title;
    }
    return newTitle;
  }


  createQuestionHierarchy(data) {
    const resultsArr = [];

    data.forEach((value) => {
      let answerObj = this.props.reduxState_questions[value.questionID];

      if (!dNc(answerObj)) {
        answerObj = answerInitialState;
      }

      // this is duplicated in questionContainer - need to update this and that together
      const explainerText = {
        rawValue: '',
        type: null,
        useValue: '',
      };

      // we combine the answers here so we can just use them all
      const { currentAnswers, unvalidatedAnswers } = this.props;

      const combinedAnswers = {};

      const currentAnswerKeys = Object.keys(currentAnswers);
      const unvalidatedAnswersKeys = Object.keys(unvalidatedAnswers);

      // we have to loop through the 'valid' answers then the 'unvalidated' answers
      // so that we can get into a position where we are able to insert the
      // unvalidated answers in the correct order i.e. the unvalidated answers are the 'latest'
      // if there are no answers for that questionID
      currentAnswerKeys.forEach((ittrCurrent) => {
        unvalidatedAnswersKeys.forEach((ittrUnvalidated) => {
          // const subCombinedAnswers = {};
          let number = 0;

          // we get the data for the unvalidated question ID in the current answers stuff
          const foundItems = sortedRelevantBitsNoFriendlyName(ittrUnvalidated, currentAnswers);

          if (foundItems.length > 0) {
            // loop through the foundItems to find the next arrayValue
            number = foundItems[foundItems.length - 1].arrayValue + 1;
          }

          // we add the unvalidated answer
          combinedAnswers[ittrUnvalidated + '_' + number] = unvalidatedAnswers[ittrUnvalidated];
        });

        // we add the validated answer
        combinedAnswers[ittrCurrent] = currentAnswers[ittrCurrent];
      });

      if (dNc(value.drawData) && dNc(value.drawData.statsExplainer)) {
        explainerText.rawValue = this.getNewTitle(value.drawData.statsExplainer, combinedAnswers);
        explainerText.type = 'statsExplainer';
      }

      const input = {
        data: value,
        answer: answerObj,
        nextStepCallback: this.props.nextStepCallback,
        title: this.props.showTitles === true ? this.getNewTitle(value.title, combinedAnswers) : '',
        explainerText,
      };

      resultsArr.push(
        <QuestionComponentWrapper
          questionMetaData={this.props.questionMetaData}
          key={value.questionID}
          type={value.type}
          input={input}
        />,
      );

      // we render any children here
      if (dNc(answerObj.fetch) && answerObj.fetch.generalStatus === 'success') {
        const childResultsArr = this.createQuestionHierarchy(
          answerObj.fetch.payload,
        );

        childResultsArr.forEach((childValue) => {
          resultsArr.push(childValue);
        });
      }
    });

    return resultsArr;
  }

  render() {
    const resultsArr = this.createQuestionHierarchy(this.props.data);
    const { nextButton } = this.props;

    let backButton = null;

    if (dNc(this.props.backButton)) {
      backButton = this.props.backButton; // eslint-disable-line prefer-destructuring
    }

    let buttons = null;

    if (dNc(backButton)) {
      buttons = (
        <div>
          <div className="pull-left">{backButton}</div>
          <div className="pull-right">{nextButton}</div>
          <div className="clearfix" />
        </div>
      );
    } else {
      buttons = nextButton;
    }

    return (
      <div>
        {resultsArr}
        {buttons}
      </div>
    );
  }
}

QuestionRenderer.propTypes = {
  unvalidatedAnswers: PropTypes.object,
  reduxState_questions: PropTypes.object,
  data: PropTypes.array.isRequired,
  backButton: PropTypes.any,
  nextButton: PropTypes.any.isRequired,
  nextStepCallback: PropTypes.func,
  showTitles: PropTypes.bool,
  questionMetaData: PropTypes.string.isRequired,
  currentAnswers: PropTypes.object,
  useMutatedTitles: PropTypes.bool,
};

QuestionRenderer.defaultProps = {
  unvalidatedAnswers: {},
  reduxState_questions: questionsInitialState,
  backButton: null,
  nextStepCallback: () => {},
  showTitles: true,
  currentAnswers: {},
  useMutatedTitles: true,
};

const mapStateToProps = state => ({
  reduxState_questions: state.questions,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionRenderer);
