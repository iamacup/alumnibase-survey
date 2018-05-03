import React from 'react';
import Navigation from '../../../../content/containers/Pages/NewTheme/navigation';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <div className="container" style={{ padding: '25px' }}>
          <div className="row">
            <div className="col-md-8">
              <div className="circle-one">
                <div className="circle-two">
                  <div className="circle-three">
                    <div className="circle-four">
                      <div className="row">
                        <div style={{ paddingLeft: '40px' }}>
                          <h1 style={{
                             fontWeight: '700',
                             fontSize: '100px',
                             color: '#354950',
                             paddingTop: '150px',
                             paddingLeft: '40px',
                            }}
                          >404
                          </h1>
                          <hr style={{ backgroundColor: '#f4f6f8', width: '550px' }} />
                          <h1
                            className="text-right"
                            style={{
                             fontWeight: '300',
                             fontSize: '30px',
                             marginTop: '10px',
                             color: '#a7b0be',
                             marginRight: '40px',
                            }}
                          >Page not found
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 align-self-center">
              <ul>
                <div className="row mt-2">
                  <button type="button" className="btn btn-secondary btn-lg btn-block">Section 1 - About You</button>
                </div>
                <div className="row mt-2">
                  <button type="button" className="btn btn-secondary btn-lg btn-block">Section 2 - Uni Study</button>
                </div>
                <div className="row mt-2">
                  <button type="button" className="btn btn-secondary btn-lg btn-block">Section 3 - Pre Uni</button>
                </div>
                <div className="row mt-2">
                  <button type="button" className="btn btn-secondary btn-lg btn-block">Section 4 - Employment</button>
                </div>
                <div className="row mt-2">
                  <button type="button" className="btn btn-secondary btn-lg btn-block">Section 5 - Retrospective</button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
