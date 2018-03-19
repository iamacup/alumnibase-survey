
import React from 'react';
import Helmet from 'react-helmet';

import Navigation from '../../../../content/containers/Pages/NewTheme/navigation';
import TopProgress from '../../../../content/containers/Pages/NewTheme/topProgress';
import BottomProgress from '../../../../content/containers/Pages/NewTheme/bottomProgress';
 
class Viewer extends React.PureComponent {
  render() {
    return (
      <div className="d-flex">
        <div className="left">
          <Navigation />
        </div>
        <div className="right">
          <div className="new-content container-fluid">
            <div className="section-padding">
              <h3 className="mb-0 dark-text">Welcome!</h3>
              <div style={{ marginTop: '4px' }} />
              <h6 className="grey-text mb-0">Hey there, welcome to YourAlumni.com - a tool to see what happened after university!</h6>
              <div style={{ marginTop: '20px' }} />
              <TopProgress />
              <div style={{ marginTop: '44px' }} />

              <div className="d-flex justify-content-center">
                <div className="center-rectangle border-corners">
                  <div className="main-content-padding d-flex justify-content-center">
                    <div>
                      <h3>Content Goes Here</h3>

                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '44px' }} />
              <BottomProgress />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
