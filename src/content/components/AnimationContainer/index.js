import React from 'react';
import PropTypes from 'prop-types';

class AnimationContainer extends React.Component {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      // stuff
      const $div = $(this.div);
      $div.removeClass('d-none');
      $div.addClass(this.props.animationClass);
    });
  }

  render() {
    return (
      <div
        ref={(div) => {
          this.div = div;
        }}
        className="animated d-none"
      >
        {this.props.children}
      </div>
    );
  }
}

AnimationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  animationClass: PropTypes.string,
};

AnimationContainer.defaultProps = {
  animationClass: 'bounceIn',
};

export default AnimationContainer;
