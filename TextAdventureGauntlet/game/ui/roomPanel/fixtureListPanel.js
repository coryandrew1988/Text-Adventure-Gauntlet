import {
  React,
  Component,
  Panel,
  TextButton
} from '../basics';

import { withSystemState } from '../hoc';

class FixturePanel extends Component {
  render() {
    const { system, fixture, isTarget } = this.props;

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
        borderColor: isTarget ? '#fff' : '#666',
        backgroundColor: '#444'
      }}
      onPress={() => {
        system.action.setTarget({
          type: 'fixture',
          id: fixture.id
        });
      }}
    >
      {fixture.description.name}
    </TextButton>;
  }
}

FixturePanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  fixture: React.PropTypes.object.isRequired,
  isTarget: React.PropTypes.bool.isRequired
};

const isTarget = (fixture, target) => {
  return Boolean(target && target.type === 'fixture' && target.id == fixture.id);
};

class FixtureListPanel extends Component {
  render() {
    const { system, fixtures, target } = this.props;

    return <Panel style={{
      flexDirection: 'row',
      flex: 1,
      padding: 2,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {fixtures.map(fixture => <FixturePanel
        key={fixture.id}
        system={system}
        fixture={fixture}
        isTarget={isTarget(fixture, target)}
      />)}
    </Panel>;
  }
}

FixtureListPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  fixtures: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
  target: React.PropTypes.object
};

export default withSystemState(FixtureListPanel, (system, prevState, props) => {
  return {
    system,
    fixtures: props.fixtures,
    target: system.ui.getTarget()
  };
});
