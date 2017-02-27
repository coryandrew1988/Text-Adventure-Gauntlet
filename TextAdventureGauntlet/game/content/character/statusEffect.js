export const createStatusEffectSystem = (worldState) => {
  const getCharacter = worldState.collections.characters.get;

  const statusEffects = {};

  return {
    registerStatusEffect: (key, { onAdded, onRemoved }) => {
      statusEffects[key] = { onAdded, onRemoved };
    },
    addStatusEffect: (characterId, statusEffectKey, params) => {
      const character = getCharacter(characterId);
      const characterStatusEffects = character.statusEffects;

      if (!characterStatusEffects[statusEffectKey]) {
        characterStatusEffects[statusEffectKey] = [];
      }

      statusEffects[statusEffectKey].onAdded(character, params);
    },
    removeMatchingStatusEffects: (characterId, statusEffectKey) => {
      const character = getCharacter(characterId);
      const characterStatusEffects = character.statusEffects;

      if (!characterStatusEffects[statusEffectKey]) { return; }

      characterStatusEffects[statusEffectKey].forEach((params) => {
        statusEffects[statusEffectKey].onRemoved(character, params);
      });
    }
  };
};

export const registerStatusEffects = (statusEffectSystem) => {
  statusEffectSystem.registerStatusEffect('prone', {
    onAdded: (character, params) => {
      character.stats.resistance -= 2;
    },
    onRemoved: (character, params) => {
      character.stats.resistance += 2;
    }
  });
};
