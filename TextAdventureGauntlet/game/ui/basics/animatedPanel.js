import React, { Component } from 'react';
import { Animated } from 'react-native';

import styles from './styles';

export default class AnimatedPanel extends Component {
  render() {
    return <Animated.View {...this.props} style={[styles.panel, this.props.style]}>
      {this.props.children}
    </Animated.View>
  }
}

AnimatedPanel.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.any
};
