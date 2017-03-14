import {
  React,
  Component,
  MainPanel,
  TextButton
} from '../basics';

import { withSystemState } from '../hoc';

class CharacterPanel extends Component {
  render() {
    const { system, character } = this.props;

    return <TextButton onPress={() => {
      system.action.setTarget({
        type: 'character',
        id: character.id
      });
    }}>{character.description.name}</TextButton>;
  }
}

CharacterPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired
};

class CharacterListPanel extends Component {
  render() {
    const { system, characters } = this.props;

    return <MainPanel>
      {characters.map(character => <CharacterPanel
        key={character.id}
        system={system}
        character={character}
      />)}
    </MainPanel>;
  }
}

CharacterListPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  characters: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
};

export default withSystemState(CharacterListPanel, (system, prevState, props) => {
  const activeCharacter = system.getActiveCharacter();
  const characters = system.world.characters.getVisible(activeCharacter).slice(); // TODO take a room prop and use that to get visible characters?

  return { system, characters };
});
