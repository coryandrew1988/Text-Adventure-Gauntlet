import {
  React,
  Component,
  Text,
  Panel,
  TextButton,
  MeterBar
} from '../basics';

const buttonStyle = {
  flex: 1,
  margin: 2,
  padding: 2,
  borderStyle: 'solid',
  borderWidth: 6,
  borderRadius: 8,
  borderColor: '#080',
  backgroundColor: '#2b2',
  justifyContent: 'center',
  alignItems: 'center'
};

class ActionButton extends Component {
  doAction() {
    this.props.system.doAction(this.props.action);
  }

  render() {
    // TODO if action doesn't exist, render a disabled button, or just empty space
    return <TextButton style={buttonStyle} onPress={() => {
      this.doAction();
    }}>{this.props.label}</TextButton>
  }
}

const rowStyle = {
  flex: 1,
  flexDirection: 'row'
};

export default class ActionView extends Component {
  renderButton(i) {
    // TODO get actionConfig from game ui config
    return <ActionButton
      key={i}
      system={this.props.system}
      label={i % 2 === 0 ? 'Heavy Punch' : 'Combo Punch'}
      action={{
        key: 'useAbility',
        params: {
          abilityId: i % 2 === 0 ? 'heavyPunch' : 'comboPunch'
        }
      }}
    />;
  }

  render() {
    return <Panel {...this.props}>
        {[0, 1].map((i) => {
          return <Panel key={i} style={rowStyle}>
            {[0, 1, 2, 3].map((j) => {
              return this.renderButton(j + 4 * i);
            })}
          </Panel>;
        })}
    </Panel>
  }
}
