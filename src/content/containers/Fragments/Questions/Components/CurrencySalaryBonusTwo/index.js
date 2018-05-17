import React from 'react';
import PropTypes from 'prop-types';

import QuestionContainer from '../../../../../../content/components/Questions/questionContainer';
import Currency from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonusTwo/Parts/currency';
import Salary from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonusTwo/Parts/salary';
import TimePeriod from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonusTwo/Parts/timePeriod';
import Bonus from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonusTwo/Parts/bonus';
import Unpaid from '../../../../../../content/containers/Fragments/Questions/Components/CurrencySalaryBonusTwo/Parts/Unpaid';
import {
  dNc,
  currencySymbolLookup,
  getUsefulQuestionBits,
} from '../../../../../../content/scripts/custom/utilities';

const CurrencySalaryBonusQuestionComponent = ({
  data,
  answer,
  nextStepCallback,
  title,
}) => {
  const { questionID, options } = data;
  const { answerBits, errorBits } = getUsefulQuestionBits(
    options,
    answer.answer,
  );

  let unpaidValidity = false;

  if (answerBits.unpaid.optionValue === 'Yes') {
    unpaidValidity = true;
  }

  const obj = {
    questionID,
    unpaidValidity,
    forceValidate: answer.forceValidate,
    nextStepCallback,
    currencySymbol: '£',
  };

  if (dNc(answerBits.currency.optionValue)) {
    obj.currencySymbol = currencySymbolLookup(answerBits.currency.optionValue);
  }

  const sumElement = (period) => {
    if (period === 'Annually') return 1;
    if (period === 'Monthly') return 12;
    if (period === 'Weekly') return 52;
    if (period === 'Daily') return 365;
    return null;
  };

  let symbol = '£';
  const currencyObj = {
    GBP: '£', USD: '$', EURO: '€', Other: '',
  };

  if (dNc(answerBits.currency.optionValue)) {
    symbol = currencyObj[answerBits.currency.optionValue];
  }

  let totalValue = null;

  if (dNc(answerBits.salary.optionValue) && dNc(answerBits.salaryPeriod.optionValue) && dNc(answerBits.bonus.optionValue) && dNc(answerBits.bonusPeriod.optionValue) && dNc(answerBits.currency.optionValue)) {
    let bonusNum = answerBits.bonus.optionValue;
    if (bonusNum === '_NO_BONUS_') bonusNum = 0;

    const salary = answerBits.salary.optionValue * sumElement(answerBits.salaryPeriod.optionValue);
    const bonus = bonusNum * sumElement(answerBits.bonusPeriod.optionValue);
    totalValue = symbol + (salary + bonus);
  }
  let className;
  if (answer.answer.unpaid) {
    if (answer.answer.unpaid.optionValue === 'No') {
      className = 'show-container';
    } else if (answer.answer.unpaid.optionValue === 'Yes') {
      className = 'hidden-container';
    }
  }

  const question = (
    <div>
      <div className={className}>
        <div className="row flex-v-center-sm">
          <div className="col-sm-12">
            <Currency
              {...obj}
              answer={answerBits.currency}
              options={options.currency}
              questionIdentifier="currency"
            />
          </div>
        </div>

        <h4 className="mt-3">Salary</h4>

        <div className="row flex-v-center-sm">
          <div className="col-sm-6">
            <Salary
              {...obj}
              answer={answerBits.salary}
              options={options.salary}
              questionIdentifier="salary"
              currencySymbol={symbol}
            />
          </div>
          <div className="col-sm-6">
            <TimePeriod
              {...obj}
              answer={answerBits.salaryPeriod}
              options={options.salaryPeriod}
              questionIdentifier="salaryPeriod"
              allowAdd={false}
              typeAnswer={answerBits.salaryPeriod}
            />
          </div>
        </div>

        <h4 className="mt-3">Bonus</h4>

        <div className="row flex-v-center-sm">
          <div className="col-sm-6">
            <Bonus
              {...obj}
              answer={answerBits.bonus}
              options={options.bonus}
              questionIdentifier="bonus"
              currencySymbol={symbol}
            />
          </div>
          <div className="col-sm-6 align-self-center">
            <TimePeriod
              {...obj}
              answer={answerBits.bonusPeriod}
              options={options.bonusPeriod}
              questionIdentifier="bonusPeriod"
              allowAdd={false}
            />
          </div>
        </div>

        <div className="row justify-content-between mt-3">
          <div className="col-6">
            <h4>Total Salary:</h4>
          </div>
          <div className="col-6 text-right">
            <h5>{totalValue} / year</h5>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10">
          <Unpaid
            {...obj}
            answer={answer.answer}
            options={options.unpaid}
            questionIdentifier="unpaid"
            names={['salary', 'bonus']}
          />
        </div>
      </div>

    </div>
  );

  // This is just a temporary fix, theres a bigger problem that i can't figure out yet.
const arr = [];
let answered = answer.answered;
//  eslint-disable-next-line no-restricted-syntax, guard-for-in
for (let key in answer.answer) {
  arr.push(key)
}

if (arr.length !== 6) answered = false


  return (
    <QuestionContainer
      title={title}
      question={question}
      error={answer.error}
      errorMessages={errorBits}
      answered={answered}
    />
  );
};

CurrencySalaryBonusQuestionComponent.propTypes = {
  answer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  nextStepCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
};

CurrencySalaryBonusQuestionComponent.defaultProps = {
  nextStepCallback: () => {},
};

export default CurrencySalaryBonusQuestionComponent;
