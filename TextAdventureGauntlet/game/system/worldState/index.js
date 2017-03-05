import { createRealm } from './realm';

import {
  createClock,
  createScheduler,
  createCollection
} from '../../utils';

import { registerEffects } from './effect';

import { createStatusEffectSystem } from './statusEffectSystem';
import { createEffectSystem } from './effectSystem';

const createAbilitySystem = (realm) => {
  const map = new Map();
  const convertFromJSON = ({ id, name, effectJSON }) => {
    return {
      id,
      name,
      effect: JSON.parse(effectJSON)
    };
  };
  return {
    register: ({ id, name, effect }) => {
      realm.create('Ability', {
        id,
        name,
        effectJSON: JSON.stringify(effect)
      });
    },
    get: (id) => {
      let result = map.get(id);
      if (result) { return result; }

      result = convertFromJSON(realm.objectForPrimaryKey('Ability', id));
      map.set(id, result);
      return result;
    }
  };
};

export const createWorldState = (events) => {
  const clock = createClock();
  const scheduler = createScheduler();

  const update = () => {
    scheduler.update(clock.getTime());

    global.setTimeout(update, 50);
  };

  update();

  const realm = createRealm();

  const statusEffects = createCollection();

  const statusEffectSystem = createStatusEffectSystem(statusEffects);
  const effectSystem = createEffectSystem(realm);
  const abilitySystem = createAbilitySystem(realm);

  const worldState = {
    realm,

    transaction: (action) => {
      realm.write(action);
    },

    statusEffectSystem,

    registerAbility: (ability) => {
      abilitySystem.register(ability);
    },
    getCharacter: (id) => {
      if (!id) { return null; }

      return realm.objectForPrimaryKey('Character', id);
    },

    executeAbility: (id, context) => {
      const ability = abilitySystem.get(id);
      // TODO determine the optimal places for transactions
      realm.write(() => {
        effectSystem.execute(ability.effect, context);
      });
    }
  };

  registerEffects(worldState, effectSystem, clock, scheduler);

  return worldState;
};
