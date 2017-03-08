export const defineStatusEffects = (system) => {
  const getCharacter = system.world.characters.get;

  const hasStatus = system.world.characters.hasAnyStatusEffectWithKey;

  const defineStatusEffect = system.world.statusEffects.define;

  defineStatusEffect('prone', {
    isAllowed: (characterId, params) => {
      return !hasStatus(characterId, 'prone');
    },
    onAdded: (characterId, params) => {
      const character = getCharacter(characterId);

      character.stats.resistance -= 2;
    },
    onRemoved: (characterId, params) => {
      const character = getCharacter(characterId);

      character.stats.resistance += 2;
    }
  });

  defineStatusEffect('poisoned', {
    onAdded: (characterId, params) => {
      system.scheduleTransaction(6000, () => {
        const character = getCharacter(characterId);
        character.stats.hp -= params.value;
      });
    },
    onRemoved: (characterId, params) => {
    }
  });
};
