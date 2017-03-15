import React, { Component } from 'react';
import { View } from 'react-native';

const style = {
  flex: 1,
  margin: 0,
  padding: 0,
  borderStyle: 'solid',
  borderWidth: 0,
  borderRadius: 0,
  borderColor: '#fff'
};

export default class Panel extends Component {
  render() {
    return <View {...this.props} style={[style, this.props.style]}>
      {this.props.children}
    </View>
  }
}

Panel.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};
