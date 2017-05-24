import {
  React,
  Text,
  styles
} from '../../basics';

import {
  friendlyStyle,
  hostileStyle,
  importantStyle
} from './styles';

export const renderAttackMessage = ({
  effectResult: { isHit, attacker, target, subEffect }
}, { activeCharacter }) => {
  const attackerStyle = attacker.id === activeCharacter.id ? friendlyStyle : hostileStyle;
  if (!isHit) {
    return <Text style={styles.text}>
      <Text style={attackerStyle}>
        {attacker.description.name}
      </Text> missed {target.description.name}!
    </Text>;
  }

  const { totalDamage, damageType, becameDefeated } = subEffect[0];
  const { becameProne } = subEffect[1];

  const statusMessage = becameDefeated ? ` ${target.description.name} was defeated!` : (
    becameProne ? ` ${target.description.name} was knocked down!` : ''
  );

  return <Text style={styles.text}>
    <Text style={attackerStyle}>
      {attacker.description.name}
    </Text> hit {target.description.name} for <Text style={importantStyle}>
      {totalDamage}
    </Text> {damageType} damage!<Text style={importantStyle}>{statusMessage}</Text>
  </Text>;
};

renderAttackMessage.propTypes = {
  effectResult: React.PropTypes.object
};
