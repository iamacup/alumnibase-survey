import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { dNc, whenLoaded } from '../../../content/scripts/custom/utilities';

import '../../../content/theme/custom/scss/application.scss';

// FontAwesome
import '../../../../fontawesome-pro-5.0.4/web-fonts-with-css/css/fontawesome-all.css';

class App extends React.Component {
  componentDidMount() {
    whenLoaded(() => {
      require('animate.css');
    });
  }

  render() {
    const path = 'http://www.example.org/';

    return (
      <div>
        <Helmet
          meta={[
              {
                property: 'og:url',
                content: path,
              },
            ]}
        />
      </div>
    );
  }
}

// we have to bind the location to the state of this component so navigation updates work properly (i.e. so it detects a change in the location props and thus re renderds the app)
const mapStateToProps = state => ({
  location: state.router.location,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
