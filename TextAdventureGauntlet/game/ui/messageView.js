import {
  React,
  Component,
  Text,
  ListView,
  MainPanel
} from './basics';

class Message extends Component {
  render() { // TODO Message should be responsible for rendering message templates.
    return <Text>{this.props.text}</Text>
  }
}

Message.propTypes = {
  text: React.PropTypes.node
};

const intRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default class MessageView extends Component {
  constructor() {
    super();

    this.state = {
      shouldLockToBottom: true,
      messages: intRange.slice(),
      messageSource: new ListView.DataSource({
        rowHasChanged: (a, b) => a !== b
      }).cloneWithRows(intRange)
    };

    this.renderMessage = (text) => <Message text={text} />;
  }

  componentDidMount() {
    this.messageHandle = this.props.system.getMessageHandle();
    this.messageHandle.subscribe((text) => {
      this.setState((prevState) => {
        const newMessages = prevState.messages.slice();
        newMessages.push(text);

        return {
          shouldLockToBottom: true, // TODO check if current scroll is bottom
          messages: newMessages,
          messageSource: prevState.messageSource.cloneWithRows(newMessages)
        };
      });
    });
  }

  componentWillUnmount() {
    this.messageHandle.dispose();
  }

  render() {
    return <MainPanel>
      <ListView shouldLockToBottom={this.state.shouldLockToBottom} dataSource={this.state.messageSource} renderRow={this.renderMessage} />
    </MainPanel>;
  }
}

MessageView.propTypes = {
  system: React.PropTypes.object.isRequired
};
