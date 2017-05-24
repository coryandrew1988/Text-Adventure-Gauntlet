import {
  React,
  Component,
  View,
  TextButton,
  colorSets,

  withSystemState
} from '../utils';

class FixturePanel extends Component {
  render() {
    const { system, fixture, isTarget } = this.props;

    return <TextButton
      style={{
        margin: 2,
        padding: 2,
        flex: 1,
        aspectRatio: 1,
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: isTarget ? colorSets.negative[4] : colorSets.negative[3]
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

    return <View style={{
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
    </View>;
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
