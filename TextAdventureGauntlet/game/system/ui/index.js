import { createMessageSystem } from './messages';

export const createUI = (realm, stateEventEmitter) => {
  const messages = createMessageSystem(realm, stateEventEmitter);

  const getState = () => realm.objectForPrimaryKey('State', 'only') || {};

  const state = {
    get: getState // TODO flatten out the state properties into here
  };

  let target = null;

  return {
    initialize: ({ playerCharacterId }) => {
      realm.create('State', {
        key: 'only',
        playerCharacterId
      });
      
      // TODO find the optimal place to check whether data already exists, instead of starting from scratch every time we load

      target = JSON.parse(getState().targetJSON);
    },
    messages,
    getActiveCharacterId: () => getState().playerCharacterId,
    getTarget: () => target,
    setTarget: (value) => {
      target = value;
      getState().targetJSON = JSON.stringify(target);
    }
  };
};
