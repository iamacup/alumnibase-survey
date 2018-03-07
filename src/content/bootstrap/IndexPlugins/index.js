
import React from 'react';

import { getEnvironment } from '../../../foundation/utils/utilityFunctions';

const result = {
  headTop: [],
  headBottom: [],
  bodyTop: [],
  bodyBottom: [],
};

/*
  HEAD TOP SCRIPTS
*/

// font
result.headTop.push(<link key="5" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet" type="text/css" />);

// Bootstrap Stylesheets
result.headTop.push(<link key="6" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />);

// Select2 Stylesheets
result.headTop.push(<link key="8" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />);

// Slider Stylesheets
result.headTop.push(<link key="9" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.9.0/css/bootstrap-slider.min.css" rel="stylesheet" />);

/*
  HEAD BOTTOM SCRIPTS
*/


/*
  BODY TOP SCRIPTS
*/



/*
  BODY BOTTOM SCRIPTS
*/

// Jquery CDN
result.bodyBottom.push(<script key="17" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />);

// Select2 JS *
result.bodyBottom.push(<script key="18" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js" />);

// Slider JS
result.bodyBottom.push(<script key="19" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.9.0/bootstrap-slider.min.js" />);

// inputmask was added as it stopped working after minification for some reason - would like to put this back into the bundle if possible!
result.bodyBottom.push(<script key="24" src="https://unpkg.com/inputmask@3.3.11/dist/min/jquery.inputmask.bundle.min.js" />);

//bootstrap stuff
result.bodyBottom.push(<script key="25" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous" />);
result.bodyBottom.push(<script key="26" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous" />);


export default result;
