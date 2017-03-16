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
    scheduler.update(clock.getTime());

    transaction(() => {
      const activeCharacter = getActiveCharacter();
      if (!activeCharacter) { return; }

      world.characters.getAvailable(clock.getTime()).forEach((character) => {
        if (!character || character === activeCharacter) { return; }

        log(['character is ', character]);
        const abilities = character.abilities;
        if (abilities.length <= 0) { return; }

        const ability = abilities[Math.floor(Math.random() * abilities.length)];
        // TODO use CharacterController to select ability or to wait
        // TODO check factions to get target
        world.abilities.execute(ability, {
          actor: character,
          target: activeCharacter
        });
      });
    });

    global.setTimeout(update, 50);
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
      realm.addListener('change', callback);
    },
    removeStateListener: (callback) => {
      realm.removeListener('change', callback);
    },

    action,

    getActiveCharacter
  };
};
