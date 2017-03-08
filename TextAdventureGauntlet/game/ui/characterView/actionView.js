import {
  React,
  Component,
  Panel,
  TextButton
} from '../basics';

import { withSystemState } from '../hoc';

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
    this.props.action(this.props.system.action);
  }

  render() {
    // TODO if action doesn't exist, render a disabled button, or just empty space
    return <TextButton style={buttonStyle} onPress={() => {
      this.doAction();
    }}>{this.props.label}</TextButton>
  }
}

ActionButton.propTypes = {
  system: React.PropTypes.object.isRequired,
  action: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
};

const rowStyle = {
  flex: 1,
  flexDirection: 'row'
};

class ActionView extends Component {
  renderButton(i) {
    const character = this.props.character;

    if (i >= character.abilities.length) {
      return null;
    }

    const ability = character.abilities[i];

    return <ActionButton
      key={i}
      system={this.props.system}
      label={ability.name}
      action={action => {
        action.useAbility(ability.id);
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

ActionView.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired
};

export default withSystemState(ActionView, (system) => {
  return {
    system,
    character: system.getActiveCharacter()
  };
});
