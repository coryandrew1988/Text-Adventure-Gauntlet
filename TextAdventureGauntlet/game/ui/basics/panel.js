import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';

export default class Panel extends Component {
  render() {
    return <View {...this.props} style={[styles.panel, this.props.style]}>
      {this.props.children}
    </View>
  }
}

Panel.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.any
};
