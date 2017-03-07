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

export default class MessageView extends Component {
  constructor() {
    super();

    this.state = {
      shouldLockToBottom: true,
      messageSource: new ListView.DataSource({
        rowHasChanged: (a, b) => a !== b
      })
    };

    this.updateState = () => {
      this.setState((prevState) => {
        const newMessages = this.props.system.ui.messages.getAll();

        return {
          shouldLockToBottom: true, // TODO check if current scroll is bottom
          messageSource: prevState.messageSource.cloneWithRows(newMessages)
        };
      });
    };

    this.renderMessage = (message) => <Message text={message.text} />;
  }

  componentDidMount() { // TODO use a "withSystemState" higher-order component to eliminate this repetitive code from components
    this.updateState();

    this.props.system.addStateListener(this.updateState);
  }

  componentWillUnmount() {
    this.props.system.removeStateListener(this.updateState);
  }

  render() {
    return <MainPanel>
      <ListView shouldLockToBottom={this.state.shouldLockToBottom} dataSource={this.state.messageSource} renderRow={this.renderMessage} enableEmptySections={true} />
    </MainPanel>;
  }
}

MessageView.propTypes = {
  system: React.PropTypes.object.isRequired
};
