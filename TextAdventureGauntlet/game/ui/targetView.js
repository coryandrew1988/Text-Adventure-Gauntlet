import {
  React,
  Component,
  Text,
  Panel,
  PanelButton
} from './basics';

import { StatusMeterBarPanel } from './special';

const textStyle = {
  fontSize: 12,
  fontWeight: 'bold'
};

class EnemyPanel extends Component {
  updateState() {
    this.setState({
      enemy: this.props.system.getCharacter(this.props.characterId),
      targetId: this.props.system.getTargetId()
    });
  }

  componentWillMount() {
    this.stateHandle = this.props.system.getStateHandle();
    this.stateHandle.subscribe(() => {
      this.updateState();
    });

    this.updateState();
  }

  componentWillUnmount() {
    this.stateHandle.dispose();
  }

  render() {
    const enemy = this.state.enemy;
    const isTarget = this.state.targetId === this.props.characterId;

    return <PanelButton onPress={() => {
      this.props.system.setTargetId(this.props.characterId);
    }} style={{
      position: 'relative',
      top: isTarget ? -4 : 0,
      flex: 1,
      margin: 2,
      marginTop: 4,
      padding: 2,
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 4,
      borderColor: isTarget ? '#fff' : '#888',
      backgroundColor: isTarget ? '#332' : '#000'
    }}>
      <Text>{enemy.name}</Text>
      <StatusMeterBarPanel
        character={enemy}
        textStyle={textStyle}
      />
    </PanelButton>;
  }
}

EnemyPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  characterId: React.PropTypes.string.isRequired,
};

const rowStyle = {
  flex: 1,
  flexDirection: 'row'
};

export default class TargetView extends Component {
  render() {
    return <Panel style={{ flex: 1 }}>
      <Panel style={{ flex: 1 }}>
        {[0, 1].map((i) => {
          return <Panel key={i} style={rowStyle}>
            {[0, 1, 2].map(j => j + 3 * i).map((i) => {
              // TODO use a room to find all possible targets
              if (i >= 2) {
                return <Panel key={i} style={rowStyle}></Panel>;
              }

              const id = i === 0 ? 'enemyA' : 'enemyB';

              return <Panel key={i} style={rowStyle}>
                <EnemyPanel system={this.props.system} characterId={id} />
              </Panel>;
            })}
          </Panel>;
        })}
      </Panel>
    </Panel>;
  }
}

TargetView.propTypes = {
  system: React.PropTypes.object.isRequired
};
