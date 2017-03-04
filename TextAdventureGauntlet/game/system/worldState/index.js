import { createRealm } from './realm';

import {
  createClock,
  createScheduler,
  createCollection
} from '../../utils';

import { registerEffects } from './effect';

import { createStatusEffectSystem } from './statusEffectSystem';
import { createEffectSystem } from './effectSystem';

export const createWorldState = (events) => {
  const clock = createClock();
  const scheduler = createScheduler();

  const update = () => {
    scheduler.update(clock.getTime());

    global.setTimeout(update, 50);
  };

  update();

  const realm = createRealm();

  const abilities = createCollection();
  const statusEffects = createCollection();

  const statusEffectSystem = createStatusEffectSystem(statusEffects);
  const effectSystem = createEffectSystem(realm);

  const worldState = {
    realm,

    statusEffectSystem,

    registerAbility: (value) => {
      abilities.insert(value);
    },
    getCharacter: (id) => {
      if (!id) { return null; }

      return realm.objectForPrimaryKey('Character', id);
    },

    executeAbility: (id, context) => {
      const ability = abilities.get(id);
      // TODO determine the optimal places for transactions
      realm.write(() => {
        effectSystem.execute(ability.effect, context);
      });
    }
  };

  registerEffects(realm, worldState, effectSystem, clock, scheduler);

  return worldState;
};
