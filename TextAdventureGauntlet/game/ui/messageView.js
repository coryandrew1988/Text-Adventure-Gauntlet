import {
  React,
  Component,
  Text,
  ListView,
  Panel
} from './basics';

import { withSystemState } from './hoc';

const renderMessage = (message) => <Text>{message.text}</Text>;

class MessageView extends Component {
  render() {
    return <Panel>
      <ListView
        shouldLockToBottom={this.props.shouldLockToBottom}
        dataSource={this.props.messageSource}
        renderRow={renderMessage}
        enableEmptySections={true} // TODO stop needing this; will a React update help?
      />
    </Panel>;
  }
}

MessageView.propTypes = {
  shouldLockToBottom: React.PropTypes.bool,
  messageSource: React.PropTypes.object.isRequired
};

export default withSystemState(MessageView, (system, prevState) => {
  const newMessages = system.ui.messages.getAll();
  const messageSource = (
    prevState.messageSource ||
    new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })
  ).cloneWithRows(newMessages);

  return {
    shouldLockToBottom: true, // TODO check if current scroll is bottom
    messageSource
  };
});
