import React from 'react';
import PropTypes from 'prop-types';
// import Navigation from '../../../../content/containers/Pages/NewTheme/navigation';


class NotFoundPage extends React.PureComponent {
  render() {
    const uniName = this.context.router.route.location.pathname.split('/')[1].toLowerCase();
    let uniBranding = (<div><span className="dark-text">University</span><span className="light-grey-text">Branding</span></div>);
    let directTo = 'http://www.alumnibaseapp.com/';

    if (uniName === 'aristotle' || uniName === 'cranfield' || uniName === 'kings' || uniName === 'loughborough' || uniName === 'oxford-brookes' || uniName === 'sheffield' || uniName === 'sheffield-hallam' || uniName === 'ucl' || uniName === 'uwe' || uniName === 'durham') {
      directTo = '/' + uniName;
      if (uniName === 'aristotle') uniBranding = (<div><span className="dark-text">University</span><span className="light-grey-text">Branding</span></div>);
      else {
      // eslint-disable-next-line import/no-dynamic-require
        uniBranding = <img className={`${uniName}-logo`} alt={uniName} src={require(`../../../../content/theme/custom/images/${uniName}.png`)} height="100px" />;
      }
    }

    return (
      <div className="not-found-page">
        <div className="container">
          <div style={{ paddingTop: '10%', textAlign: 'center' }}>
            {uniBranding}
          </div>
          <div className="row text-center justify-content-center">
            <div className="col-lg-10 page-box-404">
              <div className="p-4 p-lg-5">
                <h1 className="colour heading">404</h1>
                <p>We can't seem to find the page you're looking for.</p>
              </div>
              <div className="row justify-content-center align-content-end pb-5">
                <div className="col-sm-4">
                  <p>To get back to the home page click here.</p>
                </div>
                <div className="col-sm-4">
                  <a href={directTo}> <button type="button" className="list-group-item list-group-item-action button">Home Page</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NotFoundPage.contextTypes = {
  router: PropTypes.object,
};

export default NotFoundPage;
