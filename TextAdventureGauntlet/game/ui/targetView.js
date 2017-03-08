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
    const isTarget = this.props.targetId === this.props.enemy.id;

    return <PanelButton onPress={() => {
      this.props.system.ui.state.setTargetId(this.props.enemy.id);
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
  enemyId: React.PropTypes.string.isRequired,
  enemy: React.PropTypes.object.isRequired,
  targetId: React.PropTypes.string
};

const rowStyle = {
  flex: 1,
  flexDirection: 'row'
};

const EnemyPanelWithSystemState = withSystemState(
  EnemyPanel,
  (system, prevState, props) => {
    return {
      system,
      enemy: system.world.characters.get(props.enemyId),
      targetId: system.ui.state.get().targetId
    };
  }
);

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
                <EnemyPanelWithSystemState
                  system={this.props.system}
                  enemyId={id}
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
  system: React.PropTypes.object.isRequired
};
