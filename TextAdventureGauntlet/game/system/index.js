import {
  createClock,
  createScheduler
} from '../utils';

import { createRealm } from './realm';
import { createWorld } from './world';

import { createUIState } from './uiState';

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

  // TODO detemine best place for this to be done (maybe the content loader?)
  realm.write(() => {
    realm.create('State', {
      key: 'only',
      targetId: null,
      playerCharacterId: 'player' // TODO initialize this in a clean way
    });
  });

  const uiState = createUIState(realm);

  const world = createWorld(realm);

  // TODO just let the ui call methods on the ui object
  const actionResolver = createActionResolver();
  actionResolver.define('useAbility', (params) => {
    world.abilities.execute(params.abilityId, {
      actorId: uiState.getState().playerCharacterId,
      targetId: uiState.getState().targetId
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
    // ui, // TODO

    clock,

    realm, // TODO hide this
    uiState,

    transaction,
    scheduleTransaction: (delay, action) => {
      scheduler.schedule(clock.getTime() + delay, () => {
        transaction(action);
      });
    },

    doAction: (action) => {
      actionResolver.resolve(action);
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

    getTargetId: () => {
      return uiState.getState().targetId;
    },
    setTargetId: (id) => {
      transaction(() => {
        uiState.getState().targetId = id;
      });
    }
  };
};
