import {
  React,
  Component,

  CharacterPanel,
  StatusMeterBarPanel,

  withSystemState
} from './utils';

const textStyle = {
  fontSize: 18,
  fontWeight: 'bold'
};

class ActiveCharacterPanel extends Component {
  render() {
    return <CharacterPanel
      system={this.props.system}
      character={this.props.character}
      style={{
        borderRadius: 4,
        padding: 2
      }}
    >
      <StatusMeterBarPanel
        character={this.props.character}
        textStyle={textStyle}
        useLabels={true}
      />
    </CharacterPanel>
  }
}

ActiveCharacterPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired
};

export default withSystemState(ActiveCharacterPanel, (system) => {
  return {
    system,
    character: system.getActiveCharacter()
  };
});
