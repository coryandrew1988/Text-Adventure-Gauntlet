import { createGuid } from '../../utils';

export const createStatusEffectSystem = (realm) => {
  const map = new Map();

  return {
    define: (key, { isAllowed, onAdded, onRemoved }) => {
      map.set(key, { isAllowed, onAdded, onRemoved });
    },
    apply: (key, characterId, params) => {
      const config = map.get(key);
      if (!config) {
        throw new Error(`No status effect has the key "${key}".`);
      }

      if (config.isAllowed && !config.isAllowed(characterId, params)) {
        return null;
      }

      const statusEffect = realm.create('CharacterStatusEffect', {
        id: createGuid(),
        key,
        characterId,
        paramsJSON: JSON.stringify(params)
        // TODO startTime and/or duration?
      });

      config.onAdded(characterId, params, statusEffect);

      return statusEffect;
    }
  };
};
