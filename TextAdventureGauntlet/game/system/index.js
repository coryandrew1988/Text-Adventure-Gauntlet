import {
  createClock,
  createScheduler
} from '../utils';

import { createRealm } from './realm';
import { createWorld } from './world';

import { createUI } from './ui';

// TEMP for easy logging in development
global.log = (data) => {
  global.console.log(data);
};

export const createSystem = () => {
  const realm = createRealm();

  const clock = createClock();
  // TODO move all scheduling into the realm as well
  const scheduler = createScheduler();

  const update = () => {
    scheduler.update(clock.getTime());

    global.setTimeout(update, 50);
  };

  update();

  const world = createWorld(realm);
  const ui = createUI(realm);

  const transaction = (action) => {
    realm.write(action);
  };

  const getActiveCharacter = () => {
    return world.characters.get(ui.state.get().playerCharacterId);
  };

  const action = {
    useAbility: (abilityId) => {
      transaction(() => {
        world.abilities.execute(abilityId, {
          actorId: ui.state.get().playerCharacterId,
          targetId: ui.state.get().targetId
        });
      });
    },
    travel: (room) => {
      transaction(() => {
        const activeCharacter = getActiveCharacter();

        activeCharacter.room = room;
      });
    }
  };

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

    action,

    getActiveCharacter
  };
};
