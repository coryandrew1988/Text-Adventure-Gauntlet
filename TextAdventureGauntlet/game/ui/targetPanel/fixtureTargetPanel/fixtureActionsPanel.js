import {
  React,
  Component,
  View,
  TextButton,
  styles
} from '../../basics';

import { withSystemState } from '../../hoc';

class ActionButton extends Component {
  render() {
    const {
      system,
      activeCharacter,
      action,
      fixture
    } = this.props;

    return <TextButton
      style={{
        margin: 1,
        padding: 2,
        backgroundColor: '#dd0',
        borderRadius: 4
      }}
      textStyle={{
        color: '#000'
      }}
      onPress={() => {
        system.action.useFixtureAction(action, activeCharacter, fixture);
      }}
    >
      {action.name}
    </TextButton>;
  }
}

ActionButton.propTypes = {
  system: React.PropTypes.object.isRequired,
  action: React.PropTypes.object.isRequired,
  activeCharacter: React.PropTypes.object.isRequired,
  fixture: React.PropTypes.object.isRequired
};

class FixtureActionsPanel extends Component {
  render() {
    const {
      system,
      activeCharacter,
      fixture
    } = this.props;

    return <View style={styles.panel}>
      {fixture.actions.map((action) => {
        return <ActionButton
          key={action.id}
          system={system}
          action={action}
          activeCharacter={activeCharacter}
          fixture={fixture}
        />
      })}
    </View>;
  }
}

FixtureActionsPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  activeCharacter: React.PropTypes.object.isRequired,
  fixture: React.PropTypes.object.isRequired
};

export default withSystemState(
  FixtureActionsPanel,
  (system, prevState, props) => {
    const { fixture } = props;
    const activeCharacter = system.getActiveCharacter();

    return {
      system,
      activeCharacter,
      fixture
    };
  }
);

