import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Text as ReactText,
  View,
  ScrollView,
  ListView as ReactListView,
  TouchableHighlight as TouchableNativeFeedback // TODO research best practice
} from 'react-native';

import styles from './styles';
import colorSets from './colorSets';
import Text from './text';

import TextButton from './textButton';
import Button from './button';

import ListView from './listView';

import MeterBar from './meterBar';

export {
  React,
  Component,
  Animated,
  Easing,

  View,
  ScrollView,
  ReactText,
  ReactListView,
  TouchableNativeFeedback,

  styles,
  colorSets,

  Text,

  Button,
  TextButton,

  ListView,

  MeterBar
};
