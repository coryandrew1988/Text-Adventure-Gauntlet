import {
  React,
  Component,
  Text
} from '../basics';

import MeterBar from './meterBar';

export default class StatusMeterBar extends Component {
  render() {
    const {
      value, maxValue,
      color, textStyle,
      useLabels, valueName
    } = this.props;

    return <MeterBar value={value / maxValue} color={color}>
      <Text style={textStyle}>
        {value}/{maxValue}{useLabels ? ` ${valueName}` : ''}
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
