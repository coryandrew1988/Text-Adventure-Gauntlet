export const createStatusEffectSystem = (realm) => {
  const map = new Map();

  return {
    register: (key, { onAdded, onRemoved }) => {
      map.set(key, { onAdded, onRemoved });
    },
    apply: (key, characterId, params) => {
      const config = map.get(key);
      if (!config) {
        throw new Error(`No status effect has the key "${key}".`);
      }

      const statusEffect = {
        id: 'some-new-unique-id', // TODO
        key,
        characterId,
        params
      };

      config.onAdded(characterId, statusEffect);

      //statusEffectCollection.insert(statusEffect);

      return statusEffect;
    }
  };
};
