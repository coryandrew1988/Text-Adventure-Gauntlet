import {
  React,
  Component,
  Panel,
  TextButton
} from '../basics';

import { withSystemState } from '../hoc';

class CharacterPanel extends Component {
  render() {
    const { system, character, isTarget } = this.props;

    return <TextButton
      style={{
        position: 'relative',
        top: isTarget ? -2 : 0,
        margin: 2,
        padding: 2,
        flex: 1,
        aspectRatio: 1,
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: isTarget ? '#fff' : '#600',
        backgroundColor: '#400'
      }}
      onPress={() => {
        system.action.setTarget({
          type: 'character',
          id: character.id
        });
      }}
    >{character.description.name}</TextButton>;
  }
}

CharacterPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired,
  isTarget: React.PropTypes.bool.isRequired
};

const isTarget = (character, target) => {
  return Boolean(target && target.type === 'character' && target.id == character.id);
};

class CharacterListPanel extends Component {
  render() {
    const { system, characters, target } = this.props;

    return <Panel style={{
      flexDirection: 'row',
      flex: 1,
      padding: 2,
      justifyContent: 'space-around',
      alignItems: 'center',
      overflow: 'scroll'
    }}>
      {characters.map(character => <CharacterPanel
        key={character.id}
        system={system}
        character={character}
        isTarget={isTarget(character, target)}
      />)}
    </Panel>;
  }
}

CharacterListPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  characters: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
  target: React.PropTypes.object
};

export default withSystemState(CharacterListPanel, (system, prevState, props) => {
  const activeCharacter = system.getActiveCharacter();
  const characters = system.world.characters.getVisible(activeCharacter).slice(); // TODO take a room prop and use that to get visible characters?
  const target = system.ui.getTarget();

  return { system, characters, target };
});
