import {
  React,
  Component,
  Text,
  View,
  styles,
  colorSets
} from '../../basics';

import { withSystemState } from '../../hoc';

import FixtureActionsPanel from './fixtureActionsPanel';

class FixtureTargetPanel extends Component {
  render() {
    const { system, fixture } = this.props;

    return <View style={[{
      backgroundColor: colorSets.negative[2]
    }, styles.panel]}>
      <Text style={styles.text}>{fixture.description.name}</Text>
      <FixtureActionsPanel
        system={system}
        fixture={fixture}
      />
    </View>;
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
