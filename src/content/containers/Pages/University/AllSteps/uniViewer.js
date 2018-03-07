
import React from 'react';
import PropTypes from 'prop-types';

import { dNc } from '../../../../../content/scripts/custom/utilities';

class Viewer extends React.PureComponent {
  getItems(data) {
    const finalResult = [];
    let count = 0;

    data.forEach((value) => {
      let degreeLevel = null;
      let courseType = null;
      let courseFTPT = null;
      let graduationYear = null;
      let startYear = null;
      let subject = null;

      value.data.forEach((value2) => {
        if (value2.friendlyName === 'degreeLevel') {
          degreeLevel = value2.optionValue;
        } else if (value2.friendlyName === 'courseType') {
          courseType = value2.optionValue;
        } else if (value2.friendlyName === 'courseFTPT') {
          courseFTPT = value2.optionValue;
        } else if (value2.friendlyName === 'graduationYear') {
          graduationYear = value2.optionValue;
        } else if (value2.friendlyName === 'startYear') {
          startYear = value2.optionValue;
        } else if (value2.friendlyName === 'subject') {
          subject = value2.optionValue;
        }
      });

      const obj = (
        <div key={count + 'key'}>
          <div className="education-seperator" />
          <div className="row justify-content-between" key={count + 'key'}>
            <div className="col-auto mr-auto">
              <div>
                <h6 style={{ marginBottom: '0px' }}>{courseType} {dNc(subject) ? ' - ' + subject : null} <span className="grey-text">({startYear} - {graduationYear})</span></h6>
              </div>
            </div>
            <div className="col-auto">
              <h6 style={{ marginBottom: '0px' }} className="green-text">Complete</h6>
            </div>
          </div>
        </div>
      );

      finalResult.push(obj);
      count++;
    });

    return finalResult;
  }

  render() {
    const { statusCode, data } = this.props;

    if (statusCode.endsWith('-1')) {
      // we know nothing came back so we render null
      return null;
    }

    const keys = Object.keys(data);
    const finalResult = [];
    let count = 0;

    keys.forEach((value) => {
      let style = {};

      if (count > 0) {
        style = { marginTop: '28px' };
      }

      const res = (
        <div key={value}>
          <h4 style={style}>{data[value][0].name}</h4>
          {this.getItems(data[value])}
        </div>
      );

      finalResult.push(res);

      count++;
    });

    return finalResult;
  }
}

Viewer.propTypes = {
  data: PropTypes.any.isRequired,
  statusCode: PropTypes.string.isRequired,
};

export default Viewer;
