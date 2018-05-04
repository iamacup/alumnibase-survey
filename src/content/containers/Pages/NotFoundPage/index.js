import React from 'react';
import Navigation from '../../../../content/containers/Pages/NewTheme/navigation';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh', backgroundColor: '#f4f6f8' }}>
        <div className="row">

          {/* -----------------------------------Left----------------------------------------------*/}
          <div className="col-lg-3" style={{ backgroundColor: '#fff' }}> {/* media query for height: '100vh' */}
            <div className="new-nav">
              <div className="d-flex justify-content-center mt-3 mt-lg-0">
                <span className="dark-text">University</span> <span className="light-grey-text">Branding</span>
              </div>
              <div className="list-group list-group-flush" data-toggle="collapse" aria-expanded="false" id="margin-sidebar">
                <a href="/"> <button type="button" className="list-group-item list-group-item-action button">Home Page</button></a>
                <a href="/login"> <button type="button" className="list-group-item list-group-item-action button">Sign In</button></a>
              </div>
              <hr style={{ marginTop: '8px' }} />
            </div>
          </div>

          {/* ---------------------------------------Right------------------------------------------*/}

          <div className="col-lg-9">
            <div className="row justify-content-center">
              <div className="col-8">
                <div
                  className="page-box p-4 p-lg-5"
                  style={{
 backgroundColor: '#fff', marginTop: '80px', borderRadius: '2%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}}
                >
                  <h1>404</h1>
                  <p>We can't seem to find the page you're looking for.</p>
                  <br />
                  <br />
                  <div className="row">
                    <p>If you think this might be a problem on our end, here's how to let us know</p>
                    <div className="col-6">
                      <a href="mailto:hello@alumnibaseapp.com?Subject=Hello"><button type="button" className="btn btn-light"><i className="fal fa-envelope" /><br />Email us</button></a>
                    </div>
                    <div className="col-6">
                      <a href="http://alumnibaseapp.com/meet-me"><button type="button" className="btn btn-light"><i className="fal fa-comments" /><br />Chat Now</button></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default NotFoundPage;
