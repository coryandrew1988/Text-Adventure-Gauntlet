export const defineStatusEffects = (system) => {
  const getCharacter = system.world.characters.get;

  const hasStatus = system.world.characters.hasAnyStatusEffectWithKey;

  const defineStatusEffect = system.world.statusEffects.define;

  defineStatusEffect('prone', {
    isAllowed: (character, params) => {
      return !hasStatus(character, 'prone');
    },
    onAdded: (character, params) => {
      character.stats.resistance -= 2;
    },
    onRemoved: (character, params) => {
      character.stats.resistance += 2;
    }
  });

  defineStatusEffect('poisoned', {
    onAdded: (character, params) => {
      system.scheduleTransaction(6000, () => {
        character.stats.hp -= params.value;
      });
    },
    onRemoved: (character, params) => {
    }
  });
};
