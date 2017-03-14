import {
  React,
  Component,
  Text,
  Panel
} from '../../basics';

import { withSystemState } from '../../hoc';

import FixtureActionsPanel from './fixtureActionsPanel';

class FixtureTargetPanel extends Component {
  render() {
    const { system, fixture } = this.props;

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
      <Text>{fixture.description.name}</Text>
      <FixtureActionsPanel
        system={system}
        fixture={fixture}
      />
    </Panel>;
  }
}

FixtureTargetPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  fixture: React.PropTypes.object.isRequired
};

export default withSystemState(
  FixtureTargetPanel,
  (system, prevState, props) => {
    const fixture = system.world.rooms.getFixture(props.id);

    return { system, fixture };
  }
);

