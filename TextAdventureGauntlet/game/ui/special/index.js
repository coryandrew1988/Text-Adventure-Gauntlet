import {
  React,
  Component,
  Text,
  Panel,
  MeterBar
} from '../basics';

export class StatusMeterBar extends Component {
  render() {
    const value = this.props.value;
    const maxValue = this.props.maxValue;
    return <MeterBar value={value / maxValue} color={this.props.color}>
      <Text style={this.props.textStyle}>
        {value}/{maxValue}{this.props.useLabels ? ` ${this.props.valueName}` : ''}
      </Text>
    </MeterBar>;
  }
}

export class StatusMeterBarPanel extends Component {
  render() {
    const character = this.props.character;
    const textStyle = this.props.textStyle;
    const useLabels = this.props.useLabels;

    return <Panel style={{
      flexDirection: 'row',
      flex: 1
    }}>
      <StatusMeterBar
        value={character.hp}
        maxValue={character.stats.maxHP}
        valueName="HP"
        textStyle={textStyle}
        color="#d00"
        useLabels={useLabels}
      />
      <StatusMeterBar
        value={character.bp}
        maxValue={character.stats.maxBP}
        valueName="BP"
        textStyle={textStyle}
        color="#bbb"
        useLabels={useLabels}
      />
      <StatusMeterBar
        value={character.mp}
        maxValue={character.stats.maxMP}
        valueName="MP"
        textStyle={textStyle}
        color="#00d"
        useLabels={useLabels}
      />
    </Panel>;
  }
}
