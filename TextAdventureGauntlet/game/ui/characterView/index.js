import {
  React,
  Component,
  MainPanel
} from '../basics';

import { StatusMeterBarPanel } from '../special';

import { withSystemState } from '../hoc';

import ActionView from './actionView';

const textStyle = {
  fontSize: 18,
  fontWeight: 'bold'
};

class CharacterView extends Component {
  render() {
    return <MainPanel style={{ flex: 1 }}>
      <ActionView style={{ flex: 4 }} system={this.props.system} />
      <StatusMeterBarPanel
        character={this.props.character}
        textStyle={textStyle}
        useLabels={true}
      />
    </MainPanel>
  }
}

CharacterView.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired
};

export default withSystemState(CharacterView, (system) => {
  return {
    system,
    character: system.getActiveCharacter()
  };
});
