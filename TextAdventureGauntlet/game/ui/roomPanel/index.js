import {
  React,
  Component,
  Text,
  View,
  styles,
  colorSets
} from '../basics';

import { withSystemState } from '../hoc';

import CharacterListPanel from './characterListPanel';
import FixtureListPanel from './fixtureListPanel';

class RoomPanel extends Component {
  render() {
    const { system, fixtures } = this.props;

    return <View style={[styles.panel, {
      margin: 2,
      padding: 2,
      backgroundColor: colorSets.negative[1]
    }]}>
      <Text>{this.props.room.description.name}</Text>
      <CharacterListPanel system={system} />
      <FixtureListPanel system={system} fixtures={fixtures} />
    </View>;
  }
}

RoomPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  room: React.PropTypes.object.isRequired,
  fixtures: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
};

export default withSystemState(RoomPanel, (system) => {
  const activeCharacter = system.getActiveCharacter();
  const room = activeCharacter.room;
  const fixtures = system.world.rooms.getFixtures(room).slice();

  return {
    system,
    room,
    fixtures
  };
});
