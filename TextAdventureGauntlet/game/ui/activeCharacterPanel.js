import {
  React,
  Component,
  Panel
} from './basics';

import { StatusMeterBarPanel } from './special';

import { withSystemState } from './hoc';

const textStyle = {
  fontSize: 18,
  fontWeight: 'bold'
};

class ActiveCharacterPanel extends Component {
  render() {
    return <Panel style={{
      padding: 2
    }}>
      <StatusMeterBarPanel
        character={this.props.character}
        textStyle={textStyle}
        useLabels={true}
      />
    </Panel>
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
