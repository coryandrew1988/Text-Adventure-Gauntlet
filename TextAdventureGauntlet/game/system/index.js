import {
  createClock,
  createScheduler
} from '../utils';

import { createRealm } from './realm';
import { createWorld } from './world';

import { createUI } from './ui';

const createActionResolver = () => {
  const actionDefinitions = {};

  return {
    define: (key, callback) => {
      if (actionDefinitions[key] !== void 0) {
        throw new Error(`An action is already defined for key "${key}".`);
      }

      actionDefinitions[key] = callback;
    },
    resolve: (action, context) => {
      const callback = actionDefinitions[action.key];
      return callback(action.params, context);
    }
  };
};

// TEMP for easy logging in development
global.log = (data) => {
  global.console.log(data);
};

export const createSystem = () => {
  const realm = createRealm();

  const clock = createClock();
  // TODO move all scheduling into this realm as well
  const scheduler = createScheduler();

  const update = () => {
    scheduler.update(clock.getTime());

    global.setTimeout(update, 50);
  };

  update();

  const world = createWorld(realm);
  const ui = createUI(realm, world);

  // TODO just let the ui call methods on the ui object
  const actionResolver = createActionResolver();
  actionResolver.define('useAbility', (params) => {
    world.abilities.execute(params.abilityId, {
      actorId: ui.state.get().playerCharacterId,
      targetId: ui.state.get().targetId
    });
  });

  const transaction = (action) => {
    realm.write(action);
  };

  // TODO
  // system provides access to world and ui apis
  // system also provides clock, transaction and scheduleTransaction
  // world provides access to characters, effects, abilities, statusEffects
  // ui provides access to actions, messages

  return {
    world,
    ui,

    clock,

    transaction,
    scheduleTransaction: (delay, action) => {
      scheduler.schedule(clock.getTime() + delay, () => {
        transaction(action);
      });
    },

    addStateListener: (callback) => {
      realm.addListener('change', callback);
    },
    removeStateListener: (callback) => {
      realm.removeListener('change', callback);
    },

    getActiveCharacter: () => {
      return world.characters.get('player'); // TODO get the id from ui
    },

    setTargetId: (id) => {
      transaction(() => {
        ui.state.get().targetId = id;
      });
    }
  };
};
