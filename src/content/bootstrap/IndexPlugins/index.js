
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


result.headTop.push(<link key="ico1" rel="apple-touch-icon-precomposed" sizes="57x57" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-57x57.png" />);
result.headTop.push(<link key="ico2" rel="apple-touch-icon-precomposed" sizes="114x114" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-114x114.png" />);
result.headTop.push(<link key="ico3" rel="apple-touch-icon-precomposed" sizes="72x72" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-72x72.png" />);
result.headTop.push(<link key="ico4" rel="apple-touch-icon-precomposed" sizes="144x144" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-144x144.png" />);
result.headTop.push(<link key="ico5" rel="apple-touch-icon-precomposed" sizes="60x60" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-60x60.png" />);
result.headTop.push(<link key="ico6" rel="apple-touch-icon-precomposed" sizes="120x120" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-120x120.png" />);
result.headTop.push(<link key="ico7" rel="apple-touch-icon-precomposed" sizes="76x76" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-76x76.png" />);
result.headTop.push(<link key="ico8" rel="apple-touch-icon-precomposed" sizes="152x152" href="https://files.alumnibaseapp.com/images/favicomatic/apple-touch-icon-152x152.png" />);
result.headTop.push(<link key="ico9" rel="icon" type="image/png" href="https://files.alumnibaseapp.com/images/favicomatic/favicon-196x196.png" sizes="196x196" />);
result.headTop.push(<link key="ico10" rel="icon" type="image/png" href="https://files.alumnibaseapp.com/images/favicomatic/favicon-96x96.png" sizes="96x96" />);
result.headTop.push(<link key="ico11" rel="icon" type="image/png" href="https://files.alumnibaseapp.com/images/favicomatic/favicon-32x32.png" sizes="32x32" />);
result.headTop.push(<link key="ico12" rel="icon" type="image/png" href="https://files.alumnibaseapp.com/images/favicomatic/favicon-16x16.png" sizes="16x16" />);
result.headTop.push(<link key="ico13" rel="icon" type="image/png" href="https://files.alumnibaseapp.com/images/favicomatic/favicon-128.png" sizes="128x128" />);
result.headTop.push(<meta key="ico14" name="application-name" content="AlumniBase"/>);
result.headTop.push(<meta key="ico15" name="msapplication-TileColor" content="#FFFFFF" />);
result.headTop.push(<meta key="ico16" name="msapplication-TileImage" content="https://files.alumnibaseapp.com/images/favicomatic/mstile-144x144.png" />);
result.headTop.push(<meta key="ico17" name="msapplication-square70x70logo" content="https://files.alumnibaseapp.com/images/favicomatic/mstile-70x70.png" />);
result.headTop.push(<meta key="ico18" name="msapplication-square150x150logo" content="https://files.alumnibaseapp.com/images/favicomatic/mstile-150x150.png" />);
result.headTop.push(<meta key="ico19" name="msapplication-wide310x150logo" content="https://files.alumnibaseapp.com/images/favicomatic/mstile-310x150.png" />);
result.headTop.push(<meta key="ico20" name="msapplication-square310x310logo" content="https://files.alumnibaseapp.com/images/favicomatic/mstile-310x310.png" />);
// swifty library
result.headTop.push(<link key="nn9" href="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/switchery/switchery.min.css" rel="stylesheet" />);


// font
result.headTop.push(<link key="5" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet" type="text/css" />);

// Bootstrap Stylesheets
result.headTop.push(<link key="6" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />);

// Select2 Stylesheets
result.headTop.push(<link key="8" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />);

// Slider Stylesheets
result.headTop.push(<link key="9" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.0.0/css/bootstrap-slider.min.css" rel="stylesheet" />)
// result.headTop.push(<link key="fa1" rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.0.8/css/solid.css" integrity="sha384-+iHwwKZGTdlVFbv4fsKmLkogfdKlp47zQGkSMDN3ANc8kXjyKudKvQwinI5VH+2C" crossorigin="anonymous" />);
// result.headTop.push(<link key="fa2" rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.0.8/css/fontawesome.css" integrity="sha384-+5VkSw5C1wIu2iUZEfX77QSYRb5fhjmEsRn8u4r9Ma8mvu/GvTag4LDSEAw7RjXl" crossorigin="anonymous" />);


/*
  HEAD BOTTOM SCRIPTS
*/


/*
  BODY TOP SCRIPTS
*/

// Jquery CDN
result.bodyTop.push(<script key="17" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />);



/*
  BODY BOTTOM SCRIPTS
*/

// Select2 JS *
result.bodyBottom.push(<script key="18" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js" />);

// Slider JS
result.bodyBottom.push(<script key="19" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.0.0/bootstrap-slider.min.js" />)

// inputmask was added as it stopped working after minification for some reason - would like to put this back into the bundle if possible!
result.bodyBottom.push(<script key="24" src="https://unpkg.com/inputmask@3.3.11/dist/min/jquery.inputmask.bundle.min.js" />);

//bootstrap stuff
result.bodyBottom.push(<script key="25" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous" />);
result.bodyBottom.push(<script key="26" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous" />);

// swifty library
result.bodyBottom.push(<script key="nn23" src="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/switchery/switchery.min.js" />);


export default result;
