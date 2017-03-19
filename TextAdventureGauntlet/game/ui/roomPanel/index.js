import {
  React,
  Component,
  Text,
  Panel
} from '../basics';

import { withSystemState } from '../hoc';

import CharacterListPanel from './characterListPanel';
import FixtureListPanel from './fixtureListPanel';

class RoomPanel extends Component {
  render() {
    const { system, fixtures } = this.props;

    return <Panel style={{
      margin: 0,
      padding: 2,
      borderWidth: 2,
      borderColor: '#bbb'
    }}>
      <Text>{this.props.room.description.name}</Text>
      <CharacterListPanel system={system} />
      <FixtureListPanel system={system} fixtures={fixtures} />
    </Panel>;
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
