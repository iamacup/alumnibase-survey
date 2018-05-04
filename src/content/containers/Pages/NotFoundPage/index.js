import React from 'react';
import Navigation from '../../../../content/containers/Pages/NewTheme/navigation';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <div className="row text-center">

          <div className="col-lg-9">
            <div className="row justify-content-center">
              <div className="col-8">
                <div className="page-box-404 p-4 p-lg-5">
                  <h1 className="colour heading">404</h1>
                  <p>We can't seem to find the page you're looking for.</p>
                  <br />
                  <br />
                  
                <a href="/"> <button type="button" className="list-group-item list-group-item-action button">Home Page</button></a>

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
