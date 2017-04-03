import {
  React,
  Component,
  Text,
  MeterBar
} from '../basics';

export default class StatusMeterBar extends Component {
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

StatusMeterBar.propTypes = {
  value: React.PropTypes.number.isRequired,
  maxValue: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired,
  textStyle: React.PropTypes.any,
  useLabels: React.PropTypes.bool,
  valueName: React.PropTypes.string
};

