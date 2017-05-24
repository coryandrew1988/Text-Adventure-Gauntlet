import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  View
} from 'react-native';

export default class Button extends Component {
  render() {
    return <TouchableNativeFeedback onPress={this.props.onPress}>
      <View {...this.props}>
        {this.props.children}
      </View>
    </TouchableNativeFeedback>
  }
}

Button.propTypes = {
  children: React.PropTypes.node,
  onPress: React.PropTypes.func.isRequired
};
