import {
  React,
  Component,
  Text,
  Panel
} from '../../basics';

import { StatusMeterBarPanel } from '../../special';

import { withSystemState } from '../../hoc';

import TargetCharacterActionsPanel from './targetCharacterActionsPanel';

const textStyle = {
  fontSize: 12,
  fontWeight: 'bold'
};

class CharacterTargetPanel extends Component {
  render() {
    const character = this.props.character;

    return <Panel
      style={{
        flex: 1,
        margin: 2,
        marginTop: 4,
        padding: 2,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#fff',
        backgroundColor: '#000'
      }}
    >
      <Text>{character.description.name}</Text>
      <StatusMeterBarPanel
        character={character}
        textStyle={textStyle}
      />
      <TargetCharacterActionsPanel
        system={this.props.system}
        targetCharacter={character}
      />
    </Panel>;
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

