import React, { Component } from 'react';

import Button from './button';
import Text from './text';
import styles from './styles';

export default class TextButton extends Component {
  render() {
    return <Button {...this.props}>
      <Text style={[styles.buttonText, this.props.textStyle]}>
        {this.props.children}
      </Text>
    </Button>
  }
}

TextButton.propTypes = {
  children: React.PropTypes.node,
  textStyle: React.PropTypes.any
};
