import {
  React,
  Component,
  MainPanel
} from '../basics';

import { withSystemState } from '../hoc';

import CharacterTargetPanel from './characterTargetPanel';

const targetRendererMap = new Map();

targetRendererMap.set('character', (system, target) => {
  return <CharacterTargetPanel system={system} id={target.id} />
});

class TargetPanel extends Component {
  renderTarget() {
    const target = this.props.target;
    if (target == null) { return null; }

    const targetRenderer = targetRendererMap.get(target.type);
    if (targetRenderer == null) { return null; }

    return targetRenderer(this.props.system, target);
  }

  render() {
    return <MainPanel>
      {this.renderTarget()}
    </MainPanel>;
  }
}

TargetPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  target: React.PropTypes.object
};

export default withSystemState(TargetPanel, (system) => {
  const target = system.ui.getTarget();

  return { system, target };
});
