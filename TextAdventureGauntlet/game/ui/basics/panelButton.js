import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  View
} from 'react-native';

export default class PanelButton extends Component {
  render() {
    return <TouchableNativeFeedback onPress={this.props.onPress}>
      <View {...this.props}>
        {this.props.children}
      </View>
    </TouchableNativeFeedback>
  }
}

PanelButton.propTypes = {
  children: React.PropTypes.node,
  onPress: React.PropTypes.func.isRequired
};
