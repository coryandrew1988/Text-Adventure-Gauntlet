import {
  React,
  Component,
  MainPanel
} from '../basics';

import { StatusMeterBarPanel } from '../special';

import ActionView from './actionView';

const textStyle = {
  fontSize: 18,
  fontWeight: 'bold'
};

export default class CharacterView extends Component {
  constructor() {
    super();

    this.handleUpdate = () => {
      this.setState({
        character: this.props.system.getActiveCharacter()
      });
    };
  }

  componentWillMount() {
    this.handleUpdate();

    this.props.system.addStateListener(this.handleUpdate);
  }

  componentWillUnmount() {
    this.props.system.removeStateListener(this.handleUpdate);
  }

  render() {
    return <MainPanel style={{ flex: 1 }}>
      <ActionView style={{ flex: 4 }} system={this.props.system} />
      <StatusMeterBarPanel
        character={this.state.character}
        textStyle={textStyle}
        useLabels={true}
      />
    </MainPanel>
  }
}

CharacterView.propTypes = {
  system: React.PropTypes.object.isRequired
};
