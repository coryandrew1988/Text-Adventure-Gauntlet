import {
  React,
  Component,
  Text,
  Panel,
  PanelButton
} from './basics';

import { StatusMeterBarPanel } from './special';

import { withSystemState } from './hoc';

const textStyle = {
  fontSize: 12,
  fontWeight: 'bold'
};

class EnemyPanel extends Component {
  render() {
    const enemy = this.props.enemy;
    const isTarget = this.props.isTarget;

    return <PanelButton
      onPress={this.props.onPress}
      style={{
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
      }}
    >
      <Text>{enemy.description.name}</Text>
      <StatusMeterBarPanel
        character={enemy}
        textStyle={textStyle}
      />
    </PanelButton>;
  }
}

EnemyPanel.propTypes = {
  enemy: React.PropTypes.object.isRequired,
  isTarget: React.PropTypes.bool,
  onPress: React.PropTypes.func
};

const EnemyPanelWithSystemState = withSystemState(
  EnemyPanel,
  (system, prevState, props) => {
    const enemy = system.world.characters.get(props.enemyId);

    return {
      enemy,
      isTarget: system.ui.state.get().targetId === enemy.id,
      onPress: () => {
        system.ui.state.setTargetId(enemy.id);
      }
    };
  }
);

const rowStyle = {
  flex: 1,
  flexDirection: 'row'
};

class TargetView extends Component {
  render() {
    // TODO use a room to find allowed targets
    const ids = this.props.ids;

    return <Panel style={{ flex: 1 }}>
      <Panel style={{ flex: 1 }}>
        {[0, 1].map((i) => {
          return <Panel key={i} style={rowStyle}>
            {[0, 1, 2].map(j => j + 3 * i).map((i) => {
              if (i >= ids.length) {
                return null;
              }

              return <Panel key={ids[i]} style={rowStyle}>
                <EnemyPanelWithSystemState
                  system={this.props.system}
                  enemyId={ids[i]}
                />
              </Panel>;
            })}
          </Panel>;
        })}
      </Panel>
    </Panel>;
  }
}

TargetView.propTypes = {
  system: React.PropTypes.object.isRequired,
  ids: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
};

export default withSystemState(TargetView, (system) => {
  const activeCharacter = system.getActiveCharacter();

  return {
    ids: (
      system.world.characters.getVisible(activeCharacter)
      .map(c => (log(c.priority), c.id))
    )
  }
});
