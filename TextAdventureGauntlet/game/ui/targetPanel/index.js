import {
  React,
  Component,
  Text,
  MainPanel,
  TextButton
} from '../basics';

import { withSystemState } from '../hoc';

class TargetPanel extends Component {
  render() {
    return <MainPanel>
    </MainPanel>;
  }
}

TargetPanel.propTypes = {
  room: React.PropTypes.object.isRequired,
  paths: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
  onPressPath: React.PropTypes.func.isRequired
};

export default withSystemState(TargetPanel, (system) => {
  const target = system.ui.getTarget();

  return {
    target
  };
});
