import React, { Component } from 'react';
import { View } from 'react-native';

const style = {
  flex: 1,
  margin: 2,
  padding: 2,
  justifyContent: 'flex-start'
};

export default class MainPanel extends Component {
  render() {
    return <View {...this.props} style={[style, this.props.style]}>
      {this.props.children}
    </View>
  }
}
