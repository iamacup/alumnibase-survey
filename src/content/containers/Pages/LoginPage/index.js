import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  componentDidMount() {
    // wait for component to load.
    $(() => {
      // $(this.input).on('change', this.handleChange());
    });
  }

   handleChange = (e) => {
     e.preventDefault();

     const email = this.email.value;
     if (email === 'tom@sliips.com') {
       this.context.router.history.push('/GDPRExample');
     } else {
       $(this.errorDiv).addClass('errored');
       $(this.errorText).toggleClass('d-block');
       $(this.errorText2).toggleClass('d-block mb-3');
     }
   }

   render() {
     return (
       <div style={{ backgroundColor: '#f2f4f7', padding: '50px' }}>
         <div className="text-center pb-sm-3">
           <img src={require('../../../../content/theme/custom/images/alumni_base_logo.png')} alt="Alumni Base" height="90" />
         </div>
         <div className="container" style={{ maxWidth: '700px' }}>
           <div
             className="p-4 p-sm-5"
             style={{
 backgroundColor: '#fff', borderWidth: '0.5px', borderColor: '#a9a9a9', borderStyle: 'solid', marginTop: '80px', borderRadius: '2%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
               <div className="row justify-content-center pt-5">
                 <div className="col-sm-8">
                   <div className="input-group mb-3">
                     <div className="d-none" ref={(element) => { this.errorText = element; }} style={{ color: 'red', fontSize: '30px' }}>*</div>
                     <input type="email" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Email" ref={(input) => { this.email = input; }} />
                   </div>
                   <div className="d-none" ref={(element) => { this.errorText2 = element; }} style={{ color: 'red', fontSize: '13px' }}>Please enter a valid email address</div>
                 </div>
               </div>
               <div className="row justify-content-center text-center pb-3">
                 <div className="col-sm-8">
                   <button type="submit" className="btn btn-secondary" style={{ width: '100%' }} onClick={e => this.handleChange(e)}>Go</button>
                 </div>
               </div>
             </div>
           </div>

           <div className="pt-5 mt-sm-5" />
           <div className="row justify-content-center text-center mt-5">
             <div className="col-10 col-sm-4 mb-5 mb-sm-1 mt-sm-5">
               <a href="/">Privacy</a>
             </div>
             <div className="col-10 col-sm-4 mb-5 mb-sm-1 mt-sm-5">
               <a href="/">Terms and Conditions</a>
             </div>
             <div className="col-10 col-sm-4 mb-5 mb-sm-1 mt-sm-5">
               <a href="/">Cookies</a>
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

export default Login;
