import {
  React,
  Component,
  Text,
  MainPanel,
  TextButton
} from './basics';

import { withSystemState } from './hoc';

class RoomPanel extends Component {
  render() {
    return <MainPanel>
      <Text>{this.props.room.description.name}</Text>
      {this.props.paths.map(path => <TextButton
        key={path.id}
        style={{
          margin: 1,
          padding: 1,
          backgroundColor: '#dd0',
          borderRadius: 2
        }}
        onPress={() => {
          this.props.onPressPath(path);
        }}
      >
        {path.targetRoom.description.name}
      </TextButton>)}
    </MainPanel>;
  }
}

RoomPanel.propTypes = {
  room: React.PropTypes.object.isRequired,
  paths: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
  onPressPath: React.PropTypes.func.isRequired
};

export default withSystemState(RoomPanel, (system) => {
  const activeCharacter = system.getActiveCharacter();
  const room = activeCharacter.room;
  const paths = system.world.rooms.getPaths(room).slice();

  return {
    room,
    paths,
    onPressPath: (path) => {
      system.action.travel(path.targetRoom)
    }
  };
});
