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
  constructor() {
    super();

    this.handleUpdate = () => {
      this.setState({
        enemy: this.props.system.world.characters.get(this.props.characterId),
        targetId: this.props.system.ui.state.get().targetId
      });
    };
  }

  componentWillMount() {
    this.handleUpdate();

    this.props.system.addStateListener(this.handleUpdate);
  }

  componentWillUnmount() {
    this.props.system.removeStateListener(this.handleUpdate);
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
      <Text>{enemy.description.name}</Text>
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
    // TODO use a room to find all possible targets
    const ids = ['enemyA', 'enemyB', 'enemyC', 'enemyD', 'temp'];

    return <Panel style={{ flex: 1 }}>
      <Panel style={{ flex: 1 }}>
        {[0, 1].map((i) => {
          return <Panel key={i} style={rowStyle}>
            {[0, 1, 2].map(j => j + 3 * i).map((i) => {
              if (i >= ids.length) {
                return null;
              }

              const id = ids[i];

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
