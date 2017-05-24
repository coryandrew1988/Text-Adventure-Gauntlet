import {
  React,
  Component,
  View
} from '../basics';

import StatusMeterBar from './statusMeterBar';

export default class StatusMeterBarPanel extends Component {
  render() {
    const { character, textStyle, useLabels } = this.props;

    return <View style={{
      flexDirection: 'row',
      flex: 1
    }}>
      <StatusMeterBar
        value={character.stats.hp}
        maxValue={character.stats.maxHP}
        valueName="HP"
        textStyle={textStyle}
        color="#d00"
        useLabels={useLabels}
      />
      <StatusMeterBar
        value={character.stats.bp}
        maxValue={character.stats.maxBP}
        valueName="BP"
        textStyle={textStyle}
        color="#bbb"
        useLabels={useLabels}
      />
      <StatusMeterBar
        value={character.stats.mp}
        maxValue={character.stats.maxMP}
        valueName="MP"
        textStyle={textStyle}
        color="#00d"
        useLabels={useLabels}
      />
    </View>;
  }
}

StatusMeterBarPanel.propTypes = {
  character: React.PropTypes.object,
  textStyle: React.PropTypes.any,
  useLabels: React.PropTypes.bool
};
