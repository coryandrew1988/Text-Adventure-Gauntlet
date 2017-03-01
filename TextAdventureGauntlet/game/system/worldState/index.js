import {
  createCollection
} from '../../utils';

import { createStatusEffectSystem } from './statusEffectSystem';
import { createEffectSystem } from './effectSystem';

export const createWorldState = () => {
  const characters = createCollection();
  const abilities = createCollection();
  const statusEffects = createCollection();

  const statusEffectSystem = createStatusEffectSystem(statusEffects);
  const effectSystem = createEffectSystem();

  const worldState = {
    collections: {
      characters,
      abilities,
      statusEffects
    },

    statusEffectSystem,
    effectSystem,

    executeAbility: (id, context) => {
      const ability = abilities.get(id);
      effectSystem.execute(ability.effect, context);
    }
  };

  return worldState;
};
