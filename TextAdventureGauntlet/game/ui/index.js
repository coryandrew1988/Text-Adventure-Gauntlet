import {
  React,
  Component,
  Panel
} from './basics';

import ActiveCharacterPanel from './activeCharacterPanel';
import MessageView from './messageView';
import RoomPanel from './roomPanel';
import TargetPanel from './targetPanel';

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
    const { system } = this.props;

    return <Panel style={style}>
      <Panel style={{ flex: 1 }}>
        <ActiveCharacterPanel system={system} />
      </Panel>
      <Panel style={{ flex: 4 }}>
        <MessageView system={system} />
      </Panel>
      <Panel style={{ flex: 4 }}>
        <RoomPanel system={system} />
      </Panel>
      <Panel style={{ flex: 3 }}>
        <TargetPanel system={system} />
      </Panel>
    </Panel>
  }
}

UI.propTypes = {
  system: React.PropTypes.object.isRequired
};
