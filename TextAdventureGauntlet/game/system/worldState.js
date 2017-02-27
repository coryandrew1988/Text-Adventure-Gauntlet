import {
  createClock,
  createScheduler,
  createCollection
} from '../utils';

export const createWorldState = () => {
  const effects = {};
  const characters = createCollection();
  const abilities = createCollection();

  const executeEffect = (effect, context) => {
    if (!effect) { return; }

    if (Array.isArray(effect)) {
      effect.forEach((e) => {
        executeEffect(e, context);
      });

      return;
    }

    const effectCallback = effects[effect.key];
    if (!effectCallback) { throw new Error(`There is no effect with key "${effect.key}".`); }

    effectCallback(effect.params, context);
  };

  return {
    collections: {
      characters,
      abilities
    },
    registerEffect: (key, callback) => {
      effects[key] = callback;
    },
    executeEffect,
    executeAbility: (id, context) => {
      const ability = abilities.get(id);
      executeEffect(ability.effect, context);
    }
  };
};
