import {
  createEvent,
  createValueEvent,
  createClock,
  createScheduler
} from '../utils';

import { createWorldState } from './worldState';

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
const loggerEvent = createValueEvent();
global.log = (data) => {
  loggerEvent.publish(JSON.stringify(data));
};

export const createSystem = () => {
  const events = {
    action: createValueEvent(),
    message: createValueEvent(),
    state: createEvent()
  };

  // TEMP for easy logging in development
  const loggerHandle = loggerEvent.getHandle();
  loggerHandle.subscribe((text) => {
    events.message.publish(text);
  });

  const worldState = createWorldState();

  const state = {
    ui: {
      activeCharacterId: 'player',
      targetCharacterId: null,
      characterAbilities: {
        'player': ['punch']
      }
    }
  };

  const getCharacter = (id) => worldState.collections.characters.get(id);
  const getActiveCharacter = () => getCharacter(state.ui.activeCharacterId);

  const getActiveCharacterAbilities = () => state.ui.characterAbilities[state.ui.activeCharacterId];

  const actionResolver = createActionResolver();
  actionResolver.define('useAbility', (params) => {
    worldState.executeAbility(params.abilityId, {
      actorId: state.ui.activeCharacterId,
      targetId: state.ui.targetCharacterId
    });
  });

  const actionHandle = events.action.getHandle();
  actionHandle.subscribe((action) => {
    actionResolver.resolve(action);
  });

  return {
    worldState,
    events, // TODO remove this and expose only what needs to be exposed
    doAction: (action) => {
      events.action.publish(action);
    },
    getMessageHandle: () => events.message.getHandle(),
    getStateHandle: () => events.state.getHandle(),
    getCharacter,
    getActiveCharacter,
    getActiveCharacterAbilities,
    getTargetId: () => state.ui.targetCharacterId,
    setTargetId: (id) => {
      state.ui.targetCharacterId = id;
      events.state.publish();
    }
  };
};
