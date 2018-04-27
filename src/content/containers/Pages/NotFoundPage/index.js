import React from 'react';
import Navigation from '../../../../content/containers/Pages/NewTheme/navigation'

class NotFoundPage extends React.Component {
        //   <div className="row">
        //     <div className="col-6 text-center">
        //       <div style={{borderRadius: '50%', backgroundColor: '#0d5dc2', width: '500px', height: '500px'}}>
        //         <div style={{borderRadius: '50%', backgroundColor: '#157df9', width: '400px', height: '400px', border: 'solid', borderWidth: '5px', borderColor: '#f4f6f8'}}>
        //         <h1 className="mt-5 pt-3" style={{ fontWeight: '700', fontSize: '100px', color: '#f4f6f8' }}>Oops!</h1>
        //         <h1 style={{ fontWeight: '700', fontSize: '100px', color: '#f4f6f8' }}>404</h1>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="col-6" style={{ paddingTop: '100px'}}>
        //       <div className="row justify-content-center">
        //       <h1 className="text-center" style={{ fontWeight: '300', fontSize: '30px', marginTop: '10px', color: '#a7b0be' }}>We can't seem to find the page you're looking for.</h1>
        //       </div>
        //       <hr style={{backgroundColor: '#0d5dc2', width: '300px'}} />
        //       <div className="row justify-content-center">
        //       <h1 className="text-left" style={{ fontWeight: '300', fontSize: '25px', marginTop: '10px', color: '#a7b0be', paddingTop: '20px' }}>Here are some helpful links instead:</h1>
        //       </div>
        //         <div className="row text-left justify-content-center">
        //         <ul>
        //           <div className="row mt-2">
        //           <a id="button" className="btn btn-light btn-lg btn-block" role="button">Section 1 - About You</a>
        //           </div>
        //           <div className="row mt-2">
        //           <a id="button" className="btn btn-light btn-lg btn-block" role="button">Section 2 - Uni Study</a>
        //           </div>
        //           <div className="row mt-2">
        //           <button type="button" class="btn btn-light btn-lg btn-block">Section 3 - Pre Uni</button>
        //           </div>
        //           <div className="row mt-2">
        //           <button type="button" class="btn btn-light btn-lg btn-block">Section 4 - Employment</button>
        //           </div>
        //           <div className="row mt-2">
        //           <button type="button" class="btn btn-light btn-lg btn-block">Section 5 - Retrospective</button>
        //           </div>
        //       </ul>
        //       </div>
        //     </div>
        //   </div>
        // </div>
  render() {
    return (
      <div style={{ backgroundColor: '#354950', height: '100vh'}}>
        <div className="container" style={{ padding: '20px'}}>
          <div className="row">
          <div className="col-md-8">
            <div style={{borderRadius: '50%', backgroundColor: '#354950', width: '750px', height: '700px', borderRight: 'dashed white'}}>
              <div style={{borderRadius: '50%', backgroundColor: '#a7b0be', width: '700px', height: '700px', paddingTop: '50px'}}>
                <div style={{borderRadius: '50%', backgroundColor: '#f4f6f8', width: '600px', height: '600px', paddingTop: '50px'}}>
                  <div style={{borderRadius: '50%', backgroundColor: '#fff', width: '500px', height: '500px'}}>
                    <div className="row">
                      <div style={{ paddingLeft: '40px' }}>
                      <h1 style={{ fontWeight: '700', fontSize: '100px', color: '#354950', paddingTop: '150px', paddingLeft: '40px' }}>404</h1>
                      <hr  style={{ backgroundColor: '#f4f6f8', width: '550px' }} />
                      <h1 className="text-right" style={{ fontWeight: '300', fontSize: '30px', marginTop: '10px', color: '#a7b0be', marginRight: '40px' }}>Page not found</h1>
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
            <button type="button" class="btn btn-secondary btn-lg btn-block">Section 1 - About You</button>
            </div>
            <div className="row mt-2">
            <button type="button" class="btn btn-secondary btn-lg btn-block">Section 2 - Uni Study</button>
            </div>
            <div className="row mt-2">
            <button type="button" class="btn btn-secondary btn-lg btn-block">Section 3 - Pre Uni</button>
            </div>
            <div className="row mt-2">
            <button type="button" class="btn btn-secondary btn-lg btn-block">Section 4 - Employment</button>
            </div>
            <div className="row mt-2">
            <button type="button" class="btn btn-secondary btn-lg btn-block">Section 5 - Retrospective</button>
            </div>
          </ul>
          </div>
        </div>
        </div>
      </div>
      )
  }
}

export default NotFoundPage;