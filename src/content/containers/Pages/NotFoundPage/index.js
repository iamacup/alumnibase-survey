import React from 'react';
import Navigation from '../../../../content/containers/Pages/NewTheme/navigation';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <div className="row">
          <div className="col-3">
            <Navigation />
          </div>
          <div className="col-9" style={{ backgroundColor: '#f4f6f8' }}>
            <div className="container" style={{ backgroundColor: '#fff', marginTop: '50px' }} >
              <h1>404</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
