import { createGuid } from '../../utils';

export const createStatusEffectSystem = (realm) => {
  const map = new Map();

  return {
    define: (key, { isAllowed, onAdded, onRemoved }) => {
      map.set(key, { isAllowed, onAdded, onRemoved });
    },
    apply: (key, character, params) => {
      const config = map.get(key);
      if (!config) {
        throw new Error(`No status effect has the key "${key}".`);
      }

      if (config.isAllowed && !config.isAllowed(character, params)) {
        return null;
      }

      const statusEffect = realm.create('CharacterStatusEffect', {
        id: createGuid(),
        key,
        character,
        paramsJSON: JSON.stringify(params)
        // TODO startTime and/or duration?
      });

      config.onAdded(character, params, statusEffect);

      return statusEffect;
    }
  };
};
