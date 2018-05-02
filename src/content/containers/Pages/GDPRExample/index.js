
import React from 'react';


const Viewer = () => (
  <div className="py-5 my-5">
    <div className="container">
      <h3 style={{ marginBottom: '24px' }}>You're GDPR Preferences</h3>
      <div className="px-5 lots-of-text text-left">
        <p>You're current opt-ins are listed below.</p>
        <p>If you wish to edit your perferences, make any changes you wish and then press the save button.</p>

        <div style={{ marginTop: '34px' }} />

        <dl className="row" style={{ marginBottom: '24px' }}>
          <dt className="col-sm-5"><div className="privacy-line" /><h4>Holding your Personal Information:</h4><h6>Given on 11/11/11</h6></dt>
          <dd className="col-sm-7">
            <div className="form-check">
              <label className="form-check-label dark-grey-text" htmlFor="defaultCheck1">
                <input className="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck1" checked />
                 You consent to AlumniBase holding and processing your personal information and sensitive personal information that you submit as part of taking this survey. This is vital so that we can provide the anonymised and aggregate insights to your university so they can improve their service. No personally identifiable information is shared with anyone.
              </label>
            </div>
          </dd>
        </dl>

        <dl className="row" style={{ marginBottom: '24px' }}>
          <dt className="col-sm-5"><div className="privacy-line" /><h4>Our Marketing by email.</h4><h6>Given on 11/11/11</h6></dt>
          <dd className="col-sm-7">
            <div className="form-check">
              <label className="form-check-label dark-grey-text" htmlFor="defaultCheck2">
                <input className="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck2" checked />
                You consent to receiving our emails in future if there are any further questions we add to the survey that might be applicable to you. For example, we might ask you to update us on your career in three years time, while also sending you new information about where you stand in your peer group.  These emails will not be frequent!
              </label>
            </div>
          </dd>
        </dl>

        <dl className="row" style={{ marginBottom: '24px' }}>
          <dt className="col-sm-5"><div className="privacy-line" /><h4>3rd Party Marketing via Email.</h4><h6>Given on 11/11/11</h6></dt>
          <dd className="col-sm-7">
            <div className="form-check">
              <label className="form-check-label dark-grey-text" htmlFor="defaultCheck3">
                <input className="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck3" checked />
             Your university may launch a further study course or some professional development that our algorithms may identify as being useful for your career. By ticking this box you consent to us emailing you to let you know about these opportunities for further professional development.
              </label>
            </div>
          </dd>
        </dl>

      </div>

      <div className="text-right">
        <button
          type="submit"
          className="btn btn-next-step answered"
        >
          <span>Save Changes <i className="far fa-save" /></span>
        </button>
      </div>


      <hr style={{ marginTop: '44px' }} />

      <h3 style={{ marginBottom: '24px' }}>Data Export</h3>

      <div className="row">
        <div className="col-8">
          <div className="px-5 lots-of-text text-left">
            <p>
              You can export all data we hold on you.
            </p>
            <p>
              Once you press the export button, a link to the export will be emailed to you.
            </p>
            <div style={{ marginTop: '34px' }} />
          </div>
        </div>
        <div className="col-4">
          <div className="text-right">
            <button
              type="submit"
              className="btn btn-next-step answered"
            >
              <span>Perform Data Export <i className="far fa-download" /></span>
            </button>
          </div>
        </div>
      </div>


      <hr style={{ marginTop: '44px' }} />

      <h3 style={{ marginBottom: '24px' }}>Data Delete</h3>

      <div className="row">
        <div className="col-8">
          <div className="px-5 lots-of-text text-left">
            <p>
              You can delete all data we hold on you.
            </p>
            <p>
              Once you press the delete button, all data we hold on you will be deleted, you will be logged out and your account removed.
            </p>
            <div style={{ marginTop: '34px' }} />
          </div>
        </div>
        <div className="col-4">
          <div className="text-right">
            <button
              type="submit"
              className="btn btn-next-step answered"
            >
              <span>Delete All Data <i className="far fa-trash-alt" /></span>
            </button>
          </div>
        </div>
      </div>


    </div>
  </div>
);

export default Viewer;
