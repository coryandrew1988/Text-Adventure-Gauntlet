import {
  React,
  Component,
  Panel
} from './basics';

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
      <Panel style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1000,
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
      }}></Panel>
      <Panel style={{ flex: 2, zIndex: -100 }}>
        <MessageView system={this.props.system} />
      </Panel>
      <Panel style={{ flex: 1, zIndex: -100 }}>
        <RoomPanel system={this.props.system} />
      </Panel>
      <Panel style={{ flex: 1, zIndex: 100 }}>
        <TargetView system={this.props.system} />
      </Panel>
      <Panel style={{ flex: 2 }}>
        <CharacterView system={this.props.system} />
      </Panel>
    </Panel>
  }
}

UI.propTypes = {
  system: React.PropTypes.object.isRequired
};
