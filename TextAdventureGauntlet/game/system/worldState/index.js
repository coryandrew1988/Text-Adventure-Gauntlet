import {
  createCollection
} from '../../utils';

import { createStatusEffectSystem } from './statusEffectSystem';

export const createWorldState = () => {
  const characters = createCollection();
  const abilities = createCollection();
  const statusEffects = createCollection();

  const effectMap = new Map();
  const statusEffectSystem = createStatusEffectSystem(statusEffects);

  const executeEffect = (effect, context) => {
    if (!effect) { return; }

    if (Array.isArray(effect)) {
      effect.forEach((e) => {
        executeEffect(e, context);
      });

      return;
    }

    const effectCallback = effectMap.get(effect.key);
    if (!effectCallback) {
      throw new Error(`There is no effect with key "${effect.key}".`);
    }

    effectCallback(effect.params, context);
  };

  const worldState = {
    collections: {
      characters,
      abilities,
      statusEffects
    },

    statusEffectSystem,
    // TODO effectSystem,

    registerEffect: (key, callback) => {
      effectMap.set(key, callback);
    },
    executeEffect,

    executeAbility: (id, context) => {
      const ability = abilities.get(id);
      executeEffect(ability.effect, context);
    }
  };

  return worldState;
};
