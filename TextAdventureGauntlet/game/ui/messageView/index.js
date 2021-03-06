import {
  React,
  Component,
  View,
  Text,
  ListView,
  styles,

  withSystemState
} from '../utils';

import { rendererMap } from './messages';

class MessageView extends Component {
  constructor() {
    super();

    this.renderMessage = ({ type, data }) => {
      const render = rendererMap.get(type);
      if (!render) {
        return <Text style={styles.text}>
          Not sure what to say about "{type}".
        </Text>;
      }

      return render(data, {
        activeCharacter: this.props.activeCharacter
      });
    };
  }

  render() {
    return <View style={styles.panel}>
      <ListView
        shouldLockToBottom={this.props.shouldLockToBottom}
        dataSource={this.props.messageSource}
        renderRow={this.renderMessage}
        enableEmptySections={true} // TODO stop needing this; will a React update help?
      />
    </View>;
  }
}

MessageView.propTypes = {
  shouldLockToBottom: React.PropTypes.bool,
  messageSource: React.PropTypes.object.isRequired,
  activeCharacter: React.PropTypes.object
};

export default withSystemState(MessageView, (system, prevState) => {
  const newMessages = system.ui.messages.getAll();
  const messageSource = (
    (prevState && prevState.messageSource) ||
    new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })
  ).cloneWithRows(newMessages.slice());

  return {
    activeCharacter: system.getActiveCharacter(),
    shouldLockToBottom: true, // TODO check if current scroll is bottom
    messageSource
  };
});
