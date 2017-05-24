import {
  React,
  Component,
  View,
  styles
} from '../basics';

import { withSystemState } from '../hoc';

import CharacterTargetPanel from './characterTargetPanel';
import FixtureTargetPanel from './fixtureTargetPanel';

const targetRendererMap = new Map();

targetRendererMap.set('character', (system, target) => {
  return <CharacterTargetPanel system={system} id={target.id} />
});
targetRendererMap.set('fixture', (system, target) => {
  return <FixtureTargetPanel system={system} id={target.id} />
});

class TargetPanel extends Component {
  renderTarget() {
    const { system, target } = this.props;
    if (target == null) { return null; }

    const targetRenderer = targetRendererMap.get(target.type);
    if (targetRenderer == null) { return null; }

    return targetRenderer(system, target);
  }

  render() {
    return <View style={styles.panel}>{this.renderTarget()}</View>;
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
