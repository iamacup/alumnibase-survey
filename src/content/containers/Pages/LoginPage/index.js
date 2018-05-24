import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../content/scripts/custom/utilities';

// import * as fetchActions from '../../../../foundation/redux/globals/DataTransactions/actions';

const dataStoreID = 'login';
const FetchData = fetchDataBuilder('login');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    // wait for component to load.
    require('formvalidation');
    require('../../../../../node_modules/formvalidation/dist/js/framework/bootstrap.js');

    $(() => {
      $(this.form).formValidation({
        framework: 'bootstrap',
        icon: {
          valid: 'fa fa-check',
          invalid: 'fa fa-times',
          validating: 'fa fa-refresh',
        },
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'The username is required',
              },
              emailAddress: {
                onError() {
                  console.log('error with email');
                },
                onSuccess() {
                  console.log('email success');
                },
              },
            },
          },
        },
      }).on('success.form.fv', (e) => {
        e.preventDefault();
        this.handleChange();
      });
    });
  }

  handleChange() {
    this.setState({
      email: this.email.value,
    });
  }

  render() {
    let payload = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default)) {
      ({ payload } = this.props.reduxState_fetchDataTransaction.default);
    }

    const { email } = this.state;
    const sendData = { username: email };

    let active = false;
    if (dNc(email)) active = true;

    const errorHandler = () => {
      $(this.errorDiv).addClass('errored');
      $(this.errorText).toggleClass('d-block');
      $(this.errorText2).toggleClass('d-block mb-3 ml-2');
    };

    const uni = this.context.router.route.location.pathname.split('/')[1]
    const uniName = uni[0].toUpperCase() + uni.slice(1);
    
    return (
      <div style={{ backgroundColor: '#f2f4f7', padding: '50px' }}>
        <div className="text-center pb-sm-3">
          <img src={require('../../../../content/theme/custom/images/alumni_base_logo.png')} alt="Alumni Base" height="90" />
        </div>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div
            className="p-4 p-sm-5"
            style={{
               backgroundColor: '#fff',
               borderWidth: '0.5px',
               borderColor: '#a9a9a9',
               borderStyle: 'solid',
               marginTop: '80px',
               borderRadius: '2%',
               boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              }}
          >
            <div className="row justify-content-center text-left">
              <div className="col-sm-8">
                <p>If you have completed the survey and wish to manage preferences, or if you wish to continue,</p>
                <p>Please enter your email address below and follow the link we send to you.</p>
                {/* <p> If you need to finsh the survey, or if you have completed it, please follow the link that will be sent to you by email</p> */}
              </div>
            </div>
            <div className="errorContainer" ref={(element) => { this.errorDiv = element; }}>
              <form ref={(element) => { this.form = element; }}>
                <div className="row justify-content-center pt-5">
                  <div className="col-sm-8">
                    <div className="input-group mb-3">
                      <div className="d-none" ref={(element) => { this.errorText = element; }} style={{ color: 'red', fontSize: '30px' }}>*</div>
                      <input
                        type="email"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Email"
                        ref={(input) => { this.email = input; }}
                        name="username"
                        id="username"
                      />
                    </div>
                    <div className="d-none" ref={(element) => { this.errorText2 = element; }} style={{ color: 'red', fontSize: '13px' }}>{payload}</div>
                  </div>
                </div>
                <div className="row justify-content-center text-center pb-3">
                  <div className="col-sm-8">
                    <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>Go</button>
                    <FetchData
                      active={active}
                      fetchURL="api/AB/survey/login"
                      sendData={sendData}
                      noRender
                      errorCallback={payLoad => errorHandler(payLoad)}
                      fatalCallback={() => errorHandler('The backend was broken')}
                      successCallback={() => { this.context.router.history.push('/GDPRExample'); }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="pt-5 mt-sm-5" />
          <div className="row justify-content-center text-center mt-5">
            <div className="col-10 col-sm-4 mb-5 mb-sm-1 mt-sm-5">
              <a href={`/${uniName}/`}>Privacy</a>
            </div>
            <div className="col-10 col-sm-4 mb-5 mb-sm-1 mt-sm-5">
              <a href={`/${uniName}/`}>Terms and Conditions</a>
            </div>
            <div className="col-10 col-sm-4 mb-5 mb-sm-1 mt-sm-5">
              <a href={`/${uniName}/`}>Cookies</a>
            </div>
            <hr style={{ width: '400px' }} />
          </div>
        </div>
        <div className="pb-sm-5" />
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object,
};

Login.propTypes = {
  reduxState_fetchDataTransaction: PropTypes.object,
};

Login.defaultProps = {
  reduxState_fetchDataTransaction: {},
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
});

export default connect(mapStateToProps)(Login);
