import {
  React,
  Component,
  Panel
} from './basics';

import TargetPanel from './targetPanel';
import TargetView from './targetView';
import MessageView from './messageView';
import CharacterView from './characterView';
import RoomPanel from './roomPanel';

const style = {
  position: 'relative',
  flex: 1,
  margin: 0,
  padding: 2,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  backgroundColor: '#000'
};

export default class UI extends Component {
  render() {
    return <Panel style={style}>
      <Panel style={{ flex: 1 }}>
        <CharacterView system={this.props.system} />
      </Panel>
      <Panel style={{ flex: 2 }}>
        <MessageView system={this.props.system} />
      </Panel>
      <Panel style={{ flex: 2 }}>
        <RoomPanel system={this.props.system} />
      </Panel>
      <Panel style={{ flex: 1 }}>
        <TargetPanel system={this.props.system} />
      </Panel>
    </Panel>
  }
}

UI.propTypes = {
  system: React.PropTypes.object.isRequired
};
