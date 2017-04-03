import {
  React,
  Component,
  Panel
} from '../basics';

import StatusMeterBar from './statusMeterBar';

export default class StatusMeterBarPanel extends Component {
  render() {
    const character = this.props.character;
    const textStyle = this.props.textStyle;
    const useLabels = this.props.useLabels;

    return <Panel style={{
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
    </Panel>;
  }
}

StatusMeterBarPanel.propTypes = {
  character: React.PropTypes.object,
  textStyle: React.PropTypes.any,
  useLabels: React.PropTypes.bool
};
