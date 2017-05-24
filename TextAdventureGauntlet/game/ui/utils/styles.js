import { StyleSheet } from 'react-native';

import colorSets from './colorSets';

export default StyleSheet.create({
  panel: {
    flex: 1,
    margin: 2,
    padding: 2
  },
  text: {
    fontFamily: 'serif',
    fontSize: 11,
    color: colorSets.positive[4]
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
    backgroundColor: colorSets.neutral[0]
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
  },
  targetSelector: {
    margin: 2,
    padding: 2,
    width: 72,
    height: 72,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: colorSets.negative[3]
  },
  activeTargetSelector: {
    backgroundColor: colorSets.negative[4]
  }
});
