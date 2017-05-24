import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';

export default class MeterBar extends Component {
  render() {
    const { children, style, value, color } = this.props;

    return <View {...this.props} style={[styles.meterBar, style]}>
      <View style={[
        { flex: value, backgroundColor: color },
        styles.meterBarInner
      ]}></View>
      <View style={{ flex: 1 - value }}></View>
      <View style={styles.meterBarOverlay}>{children}</View>
    </View>
  }
}

MeterBar.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.any,
  value: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired
};
