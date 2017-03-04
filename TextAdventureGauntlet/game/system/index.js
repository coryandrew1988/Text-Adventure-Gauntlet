import {
  createEvent,
  createValueEvent
} from '../utils';

import { createWorldState } from './worldState';
import { createUIState } from './uiState';

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
  loggerEvent.publish(JSON.stringify(data, null, 2));
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

  const worldState = createWorldState(events);
  const uiState = createUIState();

  const getCharacter = worldState.getCharacter;
  const getActiveCharacter = () => getCharacter(uiState.getState().playerCharacterId);

  const actionResolver = createActionResolver();
  actionResolver.define('useAbility', (params) => {
    worldState.executeAbility(params.abilityId, {
      actorId: uiState.getState().playerCharacterId,
      targetId: uiState.getState().targetId
    });
  });

  const actionHandle = events.action.getHandle();
  actionHandle.subscribe((action) => {
    actionResolver.resolve(action);
  });

  return {
    worldState,
    uiState,
    events, // TODO remove this and expose only what needs to be exposed
    doAction: (action) => {
      events.action.publish(action);
    },
    getMessageHandle: () => events.message.getHandle(),
    getStateHandle: () => events.state.getHandle(),
    addStateListener: (callback) => {
      worldState.realm.addListener('change', callback);
      uiState.realm.addListener('change', callback);
      // just manage all listeners through here, and keep separate state for world and UI
    },
    removeStateListener: (callback) => {
      worldState.realm.removeListener('change', callback);
      uiState.realm.removeListener('change', callback);
    },
    getCharacter,
    getActiveCharacter,
    getTargetId: () => {
      return uiState.getState().targetId;
    },
    setTargetId: (id) => {
      uiState.update(() => {
        uiState.getState().targetId = id;
      });
    }
  };
};
