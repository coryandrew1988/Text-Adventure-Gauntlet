import React, { Component } from 'react';

import PanelButton from './panelButton';
import Text from './text';

const textStyle = {
  fontWeight: 'bold',
  //color: '#000',
  alignItems: 'center'
};

export default class TextButton extends Component {
  render() {
    return <PanelButton {...this.props}>
      <Text style={[textStyle, this.props.textStyle]}>
        {this.props.children}
      </Text>
    </PanelButton>
  }
}

TextButton.propTypes = {
  children: React.PropTypes.node,
  textStyle: React.PropTypes.object
};
