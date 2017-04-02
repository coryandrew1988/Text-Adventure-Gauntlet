import React, { Component } from 'react';
import { View } from 'react-native';

const style = {
  position: 'relative',
  margin: 1,
  flex: 1,
  flexDirection: 'row',
  borderStyle: 'solid',
  borderColor: '#fff',
  borderRadius: 4,
  borderWidth: 2,
  backgroundColor: '#777'
};

export default class MeterBar extends Component {
  render() {
    return <View {...this.props} style={[style, this.props.style]}>
      <View style={{
        flex: this.props.value,
        backgroundColor: this.props.color
      }}></View>
      <View style={{ flex: 1 - this.props.value }}></View>
      <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
      }}>{this.props.children}</View>
    </View>
  }
}

MeterBar.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  value: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired
};
