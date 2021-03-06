/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Game from './game';

export default class TextAdventureGauntlet extends Component {
  render() {
    return (<Game />);
  }
}

AppRegistry.registerComponent('TextAdventureGauntlet', () => TextAdventureGauntlet);
