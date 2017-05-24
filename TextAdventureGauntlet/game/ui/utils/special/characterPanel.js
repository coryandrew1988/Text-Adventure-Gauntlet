import {
  React,
  Component,
  Animated,
  Easing
} from '../basics';

import styles from '../styles';
import colorSets from '../colorSets';

export default class CharacterPanel extends Component {
  shake(x, y) {
    return Animated.sequence([
      Animated.timing(this.state.shakeMagnitude, {
        duration: 250,
        toValue: { x, y },
        easing: Easing.linear
      }),
      Animated.spring(this.state.shakeMagnitude, {
        toValue: { x: 0, y: 0 },
        friction: 1.75
      })
    ]);
  }

  flash(duration, endOnGray) {
    return Animated.sequence([
      Animated.timing(this.state.flashValue, {
        duration: duration / 2,
        toValue: 1,
        easing: Easing.in(Easing.linear)
      }),
      Animated.timing(this.state.flashValue, {
        duration: duration / 2,
        toValue: endOnGray ? -1 : 0,
        easing: Easing.out(Easing.linear)
      })
    ]);
  }

  cleanup() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  initialize(system, character) {
    this.cleanup();

    this.setState({
      shakeMagnitude: new Animated.ValueXY({ x: 0, y: 0 }),
      flashValue: new Animated.Value(character.stats.hp === 0 ? -1 : 0)
    });

    this.subscription = system.world.events.subscribe('damage', {
      targetId: character.id
    }, ({ totalDamage, becameDefeated }) => {
      const shakeMagnitude = 4 + 4 * (
        becameDefeated ?
          1 :
          totalDamage / character.stats.maxHP
      );
      const shakeAngle = Math.random() * Math.PI * 2;
      let animation = Animated.parallel([
        this.shake(
          shakeMagnitude * Math.cos(shakeAngle),
          shakeMagnitude * Math.sin(shakeAngle)
        ),
        this.flash(200, becameDefeated)
      ]);

      animation.start()
    });
  }

  componentWillMount() {
    this.initialize(this.props.system, this.props.character);
  }

  componentWillUnmount() {
    this.cleanup();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.character.id === nextProps.character.id) { return; }

    this.initialize(nextProps.system, nextProps.character);
  }

  render() {
    const { style } = this.props;
    const animatedBackgroundColor = this.state.flashValue.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [
        colorSets.negative[0],
        style.backgroundColor || colorSets.negative[0],
        colorSets.neutral[0]
      ]
    });

    return <Animated.View style={[style, {
      backgroundColor: animatedBackgroundColor,
      transform: this.state.shakeMagnitude.getTranslateTransform()
    }, styles.panel]}>
      {this.props.children}
    </Animated.View>
  }
}

CharacterPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired,
  style: React.PropTypes.any,
  children: React.PropTypes.any
};
