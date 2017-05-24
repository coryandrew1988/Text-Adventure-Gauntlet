import { StyleSheet } from 'react-native';

import {
  positive,
  neutral
} from './colorSets';

export default StyleSheet.create({
  panel: {
    flex: 1,
    margin: 2,
    padding: 2
  },
  text: {
    fontFamily: 'serif',
    fontSize: 11,
    color: positive[4]
  },
  buttonText: {
    fontWeight: 'bold',
    alignItems: 'center'
  },
  meterBar: {
    position: 'relative',
    margin: 1,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: neutral[0]
  },
  meterBarInner: {
    borderRadius: 6
  },
  meterBarOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
