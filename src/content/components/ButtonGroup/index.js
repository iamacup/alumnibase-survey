import React from 'react';
import PropTypes from 'prop-types';

class ButtonGroup extends React.PureComponent {
  componentDidMount() {
    // wait for document to be ready
    $(() => {
      $(this.div)
        .find('button')
        .each((index, vertex) => {
          const button = $(vertex);

          // iterate over all the buttons and attach click handlers
          button.on('click', () => {
            const clickedButtons = [];
            // set the class of teh button that was just pressed
            if (!button.hasClass(this.props.clickedClass)) {
              // set teh button as clicked
              button.addClass(this.props.clickedClass);
            } else {
              // remove the class
              button.removeClass(this.props.clickedClass);
            }

            // do something about single clicks
            if (this.props.singleSelect === true) {
              // remove the click class from all other buttons
              $(this.div)
                .find('button')
                .each((index2, vertex2) => {
                  const button2 = $(vertex2);

                  if (button2.attr('value') !== button.attr('value')) {
                    button2.removeClass(this.props.clickedClass);
                  }
                });
            } else if (this.props.clearButtonID !== null) {
              // if the button we just pressed was the clear button
              if (button.attr('value') === this.props.clearButtonID && button.hasClass(this.props.clickedClass)) {
                // remove the click class from all other buttons
                $(this.div)
                  .find('button')
                  .each((index2, vertex2) => {
                    const button2 = $(vertex2);

                    if (button2.attr('value') !== this.props.clearButtonID) {
                      button2.removeClass(this.props.clickedClass);
                    }
                  });
              } else if (button.attr('value') !== this.props.clearButtonID) {
                // remove the click class from the clear button
                $(this.div)
                  .find('button')
                  .each((index2, vertex2) => {
                    const button2 = $(vertex2);

                    if (button2.attr('value') === this.props.clearButtonID) {
                      button2.removeClass(this.props.clickedClass);
                    }
                  });
              }
            }


            // build the clickedButtons array
            $(this.div)
              .find('button')
              .each((index2, vertex2) => {
                const button2 = $(vertex2);

                if (button2.hasClass(this.props.clickedClass)) {
                  clickedButtons.push(button2.attr('value'));
                }
              });

            $(this.div)
              .find('button')
              .each((index2, vertex2) => {
                const button2 = $(vertex2);
                // each sub array is the optionIDs of buttons that can't both be selected together, eg working full time, working part time, unemployed.
                const doubleButtons = [['options/42960338843', 'options/42960338844'], ['options/42960338847', 'options/42960338840', 'options/42960338841']];

                // looping through the double buttons, if they are both selected the first one added will be removed.
                doubleButtons.forEach((idArray) => {
                  idArray.forEach((id, i) => {
                    if (button.attr('value') === id) {
                      idArray.forEach((options) => {
                        if (options !== id && options === button2.attr('value') && button2.hasClass(this.props.clickedClass)) {
                          console.log(id, options, button2.attr('value'));
                          button2.removeClass(this.props.clickedClass);
                          clickedButtons.splice(clickedButtons.indexOf(options), 1);
                        }
                      });
                    }
                  });
                });
              });

            // return the array
            this.props.callback(clickedButtons);
          });
        });
    });
  }

  render() {
    return (
      <div
        className={this.props.wrapperClass}
        ref={(div) => {
          this.div = div;
        }}
      >
        {this.props.buttons}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  callback: PropTypes.func.isRequired,
  buttons: PropTypes.any.isRequired,
  clickedClass: PropTypes.string,
  singleSelect: PropTypes.bool,
  wrapperClass: PropTypes.string,
  clearButtonID: PropTypes.string,
};

ButtonGroup.defaultProps = {
  clickedClass: 'btn-default-selected',
  singleSelect: false,
  wrapperClass: '',
  clearButtonID: null,
};

export default ButtonGroup;
