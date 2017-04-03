import {
  React,
  Component,
  Animated,
  Easing,
  AnimatedPanel
} from '../basics';

export default class CharacterPanel extends Component {
  constructor() {
    super();

    this.state = {
      shakeMagnitude: new Animated.ValueXY({ x: 0, y: 0 }),
      flashValue: new Animated.Value(0)
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

  flash(duration) {
    return Animated.sequence([
      Animated.timing(this.state.flashValue, {
        duration: duration / 2,
        toValue: 1,
        easing: Easing.in(Easing.linear)
      }),
      Animated.timing(this.state.flashValue, {
        duration: duration / 2,
        toValue: 0,
        easing: Easing.out(Easing.linear)
      })
    ]);
  }

  subscribe(system, character) {
    if (this.subscription) {
      this.subscription.dispose();
    }

    this.subscription = system.world.events.subscribe('damage', {
      targetId: character.id
    }, () => {
      Animated.parallel([
        this.shake(8, 0),
        this.flash(200)
      ]).start();
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
    const { style } = this.props;
    const animatedBackgroundColor = this.state.flashValue.interpolate({
      inputRange: [0, 1],
      outputRange: [style.backgroundColor, '#fff']
    });

    return <AnimatedPanel style={[style, {
      backgroundColor: animatedBackgroundColor,
      transform: this.state.shakeMagnitude.getTranslateTransform()
    }]}>
      {this.props.children}
    </AnimatedPanel>
  }
}

CharacterPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  character: React.PropTypes.object.isRequired,
  style: React.PropTypes.any,
  children: React.PropTypes.any
};
