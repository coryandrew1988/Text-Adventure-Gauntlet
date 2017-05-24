import {
  React,
  Text,
  styles
} from '../../utils';

import {
  friendlyStyle,
  hostileStyle,
  importantStyle
} from './styles';

export const renderSetActivityMessage = ({
  effectResult: { character, ability }
}, { activeCharacter }) => {
  const characterStyle = character.id === activeCharacter.id ? friendlyStyle : hostileStyle;
  return <Text style={styles.text}>
    <Text style={characterStyle}>
      {character.description.name}
    </Text> started using <Text style={importantStyle}>
      {ability.name}
    </Text>!
  </Text>;
};

renderSetActivityMessage.propTypes = {
  effectResult: React.PropTypes.object
};
