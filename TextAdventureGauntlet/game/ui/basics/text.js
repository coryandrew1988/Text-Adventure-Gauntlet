import React, { Component } from 'react';
import { Text as ReactText } from 'react-native';

const style = {
  fontFamily: 'times',
  color: '#fff'
};

export default class Text extends Component {
  render() {
    return <ReactText {...this.props} style={[style, this.props.style]}>
      {this.props.children}
    </ReactText>
  }
}
