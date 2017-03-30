import {
  createClock,
  createScheduler
} from '../utils';

import { createRealm } from './realm';
import { createStateEventEmitter } from './stateEventEmitter';
import { createWorld } from './world';
import { createUI } from './ui';

import { createControlSystem } from './control';

// TEMP for easy logging in development
global.log = data => {
  global.console.log(data);
};

export const createSystem = () => {
  const realm = createRealm();

  const clock = createClock();
  // TODO move all scheduling into the realm!
  const scheduler = createScheduler();

  const transaction = action => {
    realm.write(action);
  };

  const stateEventEmitter = createStateEventEmitter(realm);
  const world = createWorld(realm);
  const ui = createUI(realm, stateEventEmitter);

  const getActiveCharacter = () => {
    return world.characters.get(ui.getActiveCharacterId());
  };

  const control = createControlSystem(world);

  const update = () => {
    const now = clock.getTime();
    scheduler.update(now);

    transaction(() => {
      const activeCharacter = getActiveCharacter();
      if (!activeCharacter) { return; }

      control.update(now, activeCharacter);
    });

    global.setTimeout(update, 250);
  };

  update();

  const action = {
    setTarget: (target) => {
      transaction(() => {
        ui.setTarget(target);
      });
    },
    useAbility: (ability, actor, target) => {
      transaction(() => {
        world.abilities.execute(ability, { actor, target });
      });
    },
    useFixtureAction: (action, actor, fixture) => {
      transaction(() => {
        world.effects.execute(JSON.parse(action.effectJSON), { actor, fixture });
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
      stateEventEmitter.addListener('change', callback);
    },
    removeStateListener: (callback) => {
      stateEventEmitter.removeListener('change', callback);
    },

    action,

    getActiveCharacter
  };
};
