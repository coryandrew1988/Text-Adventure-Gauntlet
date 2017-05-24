import React, { Component } from 'react';
import { Text as ReactText } from 'react-native';

import styles from './styles';

export default class Text extends Component {
  render() {
    return <ReactText {...this.props} style={[styles.text, this.props.style]}>
      {this.props.children}
    </ReactText>
  }
}

Text.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.any
};
