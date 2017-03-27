import EventEmitter from 'EventEmitter';

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

  const world = createWorld(realm);
  const ui = createUI(realm);

  const transaction = (action) => {
    realm.write(action);
  };

  const getActiveCharacter = () => {
    return world.characters.get(ui.state.get().playerCharacterId);
  };

  const update = () => {
    const now = clock.getTime();
    scheduler.update(now);
    // TODO move character control logic into world hierarchy
    transaction(() => {
      const activeCharacter = getActiveCharacter();
      if (!activeCharacter) { return; }

      const activeRoom = activeCharacter.room;

      world.characters.getAvailable(now).snapshot().forEach(character => {
        if (!character) { return; }

        const { controller } = character;
        if (controller == null) { return; }

        if (character.room.id !== activeRoom.id) {
          character.nextAvailableTime = now + 3000;
          return;
        }

        if (controller.aggression < 100 * Math.random()) {
          character.nextAvailableTime = now + 3000;
        } else {
          const abilities = character.abilities;
          if (abilities.length <= 0) { return; }

          // TODO use controller to select ability

          const ability = abilities[Math.floor(Math.random() * abilities.length)];
          // TODO check factions to get target
          world.abilities.execute(ability, {
            actor: character,
            target: activeCharacter
          });
        }
      });
    });

    global.setTimeout(update, 200);
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

  let updateIsScheduled = false;
  const stateEventEmitter = new EventEmitter();
  realm.addListener('change', () => {
    if (updateIsScheduled) { return; }
    updateIsScheduled = true;

    requestAnimationFrame(() => {
      updateIsScheduled = false;
      stateEventEmitter.emit('change');
    });
  });

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
