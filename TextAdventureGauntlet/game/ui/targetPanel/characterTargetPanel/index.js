import {
  React,
  Component,

  Text,
  View,

  styles,
  colorSets
} from '../../basics';

import {
  CharacterPanel,
  StatusMeterBarPanel
} from '../../special';

import { withSystemState } from '../../hoc';

import TargetCharacterActionsPanel from './targetCharacterActionsPanel';

const textStyle = {
  fontSize: 12,
  fontWeight: 'bold'
};

class CharacterTargetPanel extends Component {
  render() {
    const { system, character } = this.props;

    return <View style={styles.panel}>
      <CharacterPanel
        system={system}
        character={character}
        style={{
          flex: 1,
          padding: 2,
          borderRadius: 4,
          backgroundColor: colorSets.negative[1]
        }}
      >
        <Text>{character.description.name}</Text>
        <StatusMeterBarPanel
          character={character}
          textStyle={textStyle}
          useLabels={true}
        />
      </CharacterPanel>
      <TargetCharacterActionsPanel
        system={system}
        targetCharacter={character}
        style={{ flex: 1 }}
      />
    </View>;
  }
}

CharacterTargetPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired
};

export default withSystemState(
  CharacterTargetPanel,
  (system, prevState, props) => {
    const character = system.world.characters.get(props.id);

    return { system, character };
  }
);

