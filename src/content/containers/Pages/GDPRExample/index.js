
import React from 'react';


const Viewer = () => (
  <div className="py-5 my-5">
    <div className="container">
      <h3 style={{ marginBottom: '24px' }}>You're GDPR Preferences</h3>
      <div className="px-5 lots-of-text text-left">
        <p>
              You're current opt-ins are listed below.
        </p>
        <p>
              If you wish to edit your perferences, make any changes you wish and then press the save button.
        </p>

        <div style={{ marginTop: '34px' }} />

        <dl className="row" style={{ marginBottom: '24px' }}>
          <dt className="col-sm-4"><div className="privacy-line" /><h4>Permission 1</h4><h6>Given on 11/11/11</h6></dt>
          <dd className="col-sm-8">
            <div className="form-check">
              <label className="form-check-label dark-grey-text" htmlFor="defaultCheck1">
                <input className="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck1" checked />
                  Lorem ipsum dolor sit amet, ea nisl efficiendi his, no liber tamquam nominati sit. Ut assum nostro contentiones usu, quo commodo volutpat eu, mel ut justo quando. His ullum fabellas moderatius te.
              </label>
            </div>
          </dd>
        </dl>

        <dl className="row" style={{ marginBottom: '24px' }}>
          <dt className="col-sm-4"><div className="privacy-line" /><h4>Permission 2</h4><h6>Given on 11/11/11</h6></dt>
          <dd className="col-sm-8">
            <div className="form-check">
              <label className="form-check-label dark-grey-text" htmlFor="defaultCheck2">
                <input className="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck2" checked />
                  in qui albucius copiosae conceptam, nam quaeque nominavi ex. Te quis sonet invenire sit, hendrerit assentior vix an, ancillae disputando reprehendunt at mei. Vero graeco at vis, case epicuri fierent et vis.
              </label>
            </div>
          </dd>
        </dl>

        <dl className="row" style={{ marginBottom: '24px' }}>
          <dt className="col-sm-4"><div className="privacy-line" /><h4>Permission 3</h4><h6>Given on 11/11/11</h6></dt>
          <dd className="col-sm-8">
            <div className="form-check">
              <label className="form-check-label dark-grey-text" htmlFor="defaultCheck3">
                <input className="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck3" checked />
                Ei mutat omittam quo, hinc vidit sea in. Mei alterum facilis disputando id, pri liber tation facilisi id. Verterem electram postulant per et, ius adhuc necessitatibus no. Vivendum consulatu qui ut, no perfecto incorrupte sit.
              </label>
            </div>
          </dd>
        </dl>

        <dl className="row" style={{ marginBottom: '24px' }}>
          <dt className="col-sm-4 text-truncate"><div className="privacy-line" /><h4>Permission 4</h4><h6>Removed on 11/11/11</h6></dt>
          <dd className="col-sm-8">
            <div className="form-check">
              <label className="form-check-label dark-grey-text" htmlFor="defaultCheck4">
                <input className="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck4" />
                Eos te virtute periculis. Nam detracto consequuntur in, id sea habeo etiam accumsan, ex facer molestiae sit. Cu summo blandit est, oporteat constituto mediocritatem quo ex. Ullum explicari sit ne, est recusabo invenire id.
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
