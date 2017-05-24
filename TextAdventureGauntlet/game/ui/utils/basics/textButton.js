import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from '../styles';

import Button from './button';

export default class TextButton extends Component {
  render() {
    return <Button {...this.props}>
      <Text style={[
        styles.text,
        styles.buttonText,
        this.props.textStyle
      ]}>
        {this.props.children}
      </Text>
    </Button>
  }
}

TextButton.propTypes = {
  children: React.PropTypes.node,
  textStyle: React.PropTypes.any
};
