import {
  React,
  Component,
  Text,
  MainPanel,
  TextButton
} from '../basics';

import { withSystemState } from '../hoc';

class CharacterPanel extends Component {
  render() {
    const character = this.props.character;

    return <TextButton onPress={() => {
      this.props.system.ui.setTarget({
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
    return <MainPanel>
      {this.props.characters.map(character => {
        return <CharacterPanel key={character.id} system={this.props.system} character={character} />
      })}
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
