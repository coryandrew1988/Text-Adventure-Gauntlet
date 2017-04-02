import {
  React,
  Component,
  Animated,
  AnimatedPanel
} from './basics';

import { StatusMeterBarPanel } from './special';

import { withSystemState } from './hoc';

const textStyle = {
  fontSize: 18,
  fontWeight: 'bold'
};

class ActiveCharacterPanel extends Component {
  constructor() {
    super();

    this.state = {
      shakeMagnitude: new Animated.ValueXY({ x: 0, y: 0 })
    };
  }

  shake(x, y) {
    this.setState({
      shakeMagnitude: new Animated.ValueXY({ x, y })
    });
    return Animated.spring(
      this.state.shakeMagnitude,
      {
        toValue: { x: 0, y: 0 },
        friction: 1.5
      }
    );
  }

  subscribe(system, character) {
    if (this.subscription) {
      this.subscription.dispose();
    }

    this.subscription = system.world.events.subscribe('damage', {
      targetId: character.id
    }, () => {
      this.shake(16, 0).start();
    });
  }

  componentWillMount() {
    this.subscribe(this.props.system, this.props.character);
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.character.id === nextProps.character.id) { return; }

    this.subscribe(nextProps.system, nextProps.character);
  }

  render() {
    return <AnimatedPanel style={{
      padding: 2,
      transform: this.state.shakeMagnitude.getTranslateTransform()
    }}>
      <StatusMeterBarPanel
        character={this.props.character}
        textStyle={textStyle}
        useLabels={true}
      />
    </AnimatedPanel>
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
