import {
  React,
  Component,
  ScrollView,
  TextButton,
  colorSets,

  CharacterPanel as BasicCharacterPanel,

  withSystemState
} from '../utils';

class CharacterPanel extends Component {
  render() {
    const { system, character, isTarget } = this.props;

    return <BasicCharacterPanel
      system={system}
      character={character}
      style={{
        margin: 2,
        padding: 0,
        width: 72,
        height: 72,
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: isTarget ? colorSets.negative[4] : colorSets.negative[3]
      }}
    >
      <TextButton
        style={{ padding: 2, flex: 1 }}
        onPress={() => {
          system.action.setTarget({
            type: 'character',
            id: character.id
          });
        }}
      >{character.description.name}</TextButton>
    </BasicCharacterPanel>;
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
  componentWillReceiveProps(nextProps) {
    const oldCharacters = this.props.characters;
    const newCharacters = nextProps.characters;
    if (
      (
        oldCharacters.length !== newCharacters.length ||
        oldCharacters.length > 0 && oldCharacters[0]._id !== newCharacters[0]._id
      ) &&
      this.scrollView
    ) {
      this.scrollView.scrollTo({ y: 0 });
    }
  }

  render() {
    const { system, characters, target } = this.props;

    return <ScrollView
      horizontal={true}
      style={{
        flex: 1
      }}
      contentContainerStyle={{
        flexDirection: 'row',
        padding: 2
      }}
      ref={scrollView => { this.scrollView = scrollView; }}
    >
      {characters.map(character => <CharacterPanel
        key={character.id}
        system={system}
        character={character}
        isTarget={isTarget(character, target)}
      />)}
    </ScrollView>;
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
