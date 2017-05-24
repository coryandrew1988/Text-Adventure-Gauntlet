import {
  React,
  Component,
  View,
  TextButton,
  colorSets
} from '../../basics';

import { withSystemState } from '../../hoc';

class AbilityButton extends Component {
  render() {
    const {
      system,
      ability,
      activeCharacter,
      targetCharacter
    } = this.props;

    return <TextButton
      style={{
        margin: 1,
        padding: 2,
        backgroundColor: colorSets.cool[4],
        borderRadius: 4
      }}
      textStyle={{
        color: colorSets.negative[2]
      }}
      onPress={() => {
        system.action.useAbility(ability, activeCharacter, targetCharacter);
      }}
    >
      {ability.name}
    </TextButton>;
  }
}

AbilityButton.propTypes = {
  system: React.PropTypes.object.isRequired,
  ability: React.PropTypes.object.isRequired,
  activeCharacter: React.PropTypes.object.isRequired,
  targetCharacter: React.PropTypes.object.isRequired
};

class TargetCharacterActionsPanel extends Component {
  render() {
    const {
      system,
      activeCharacter,
      targetCharacter
    } = this.props;

    return <View
      style={{
        flex: 1,
        margin: 1,
        padding: 1
      }}
    >
      {activeCharacter.abilities.map((ability) => {
        return <AbilityButton
          key={ability.id}
          system={system}
          ability={ability}
          activeCharacter={activeCharacter}
          targetCharacter={targetCharacter}
        />
      })}
    </View>;
  }
}

TargetCharacterActionsPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  activeCharacter: React.PropTypes.object.isRequired,
  targetCharacter: React.PropTypes.object.isRequired
};

export default withSystemState(
  TargetCharacterActionsPanel,
  (system, prevState, props) => {
    const activeCharacter = system.getActiveCharacter();

    return {
      system,
      activeCharacter
    };
  }
);

