import {
  React,
  Component,
  View,
  colorSets
} from './utils';

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
  backgroundColor: colorSets.negative[0]
};

export default class UI extends Component {
  render() {
    const { system } = this.props;

    return <View style={style}>
      <View style={{ flex: 4 }}>
        <MessageView system={system} />
      </View>
      <View style={{ flex: 4 }}>
        <RoomPanel system={system} />
      </View>
      <View style={{ flex: 3 }}>
        <TargetPanel system={system} />
      </View>
      <View style={{ flex: 1 }}>
        <ActiveCharacterPanel system={system} />
      </View>
    </View>
  }
}

UI.propTypes = {
  system: React.PropTypes.object.isRequired
};
