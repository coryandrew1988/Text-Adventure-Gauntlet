export const registerStatusEffects = (system) => {
  const getCharacter = system.world.characters.get;

  const registerStatusEffect = system.world.statusEffects.register;

  registerStatusEffect('prone', {
    onAdded: (characterId, params) => {
      const character = getCharacter(characterId);

      character.stats.resistance -= 2;
      // TODO complete this
    },
    onRemoved: (characterId, params) => {
      const character = getCharacter(characterId);

      character.stats.resistance += 2;
      // TODO complete this
    }
  });
};
