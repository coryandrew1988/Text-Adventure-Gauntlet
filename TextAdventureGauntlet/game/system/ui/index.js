export const createUI = (realm, world) => {
  // TODO detemine best place to create initial UI state (maybe the content loader?)
  realm.write(() => {
    realm.create('State', {
      key: 'only',
      targetId: null,
      playerCharacterId: 'player' // TODO initialize this in a clean way
    });
  });

  const messages = {
    create: (text) => {
      realm.create('Message', {
        id: Date.now() + '' + Math.random(),
        time: new Date(Date.now()), // TODO tie this to the game clock?
        text
      });
    },
    getAll: () => {
      return realm.objects('Message').sorted('time');
    }
  };

  const getState = () => realm.objectForPrimaryKey('State', 'only');

  const state = {
    get: getState, // TODO flatten out the state properties into here
    setTargetId: (id) => {
      realm.write(() => {
        getState().targetId = id;
      });
    }
  };

  const action = {
    useAbility: (abilityId) => {
      world.abilities.execute(abilityId, {
        actorId: state.get().playerCharacterId,
        targetId: state.get().targetId
      });
    }
  };

  return {
    messages,
    state,
    action
  };
};
