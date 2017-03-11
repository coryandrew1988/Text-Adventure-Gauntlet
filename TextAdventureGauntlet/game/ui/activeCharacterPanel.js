import {
  React,
  Component,
  MainPanel
} from './basics';

import { StatusMeterBarPanel } from './special';

import { withSystemState } from './hoc';

const textStyle = {
  fontSize: 18,
  fontWeight: 'bold'
};

class ActiveCharacterPanel extends Component {
  render() {
    return <MainPanel style={{ flex: 1 }}>
      <StatusMeterBarPanel
        character={this.props.character}
        textStyle={textStyle}
        useLabels={true}
      />
    </MainPanel>
  }
}

ActiveCharacterPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired
};

export default withSystemState(ActiveCharacterPanel, (system) => {
  return {
    system,
    character: system.getActiveCharacter()
  };
});
