export const createUI = (realm) => {
  // TODO detemine best place to create initial UI state (maybe the content loader?)
  realm.write(() => {
    realm.create('State', {
      key: 'only',
      playerCharacterId: 'player' // TODO initialize this in a clean way
    });
  });

  const messages = {
    create: text => realm.create('Message', {
      id: Date.now() + '' + Math.random(),
      time: Date.now(), // TODO tie this to the game clock?
      text
    }),
    getAll: () => {
      return realm.objects('Message').sorted('time');
    }
  };

  const getState = () => realm.objectForPrimaryKey('State', 'only');

  const state = {
    get: getState // TODO flatten out the state properties into here
  };

  let target = JSON.parse(getState().targetJSON);

  return {
    messages,
    state,
    getTarget: () => target,
    setTarget: (value) => {
      target = value;
      getState().targetJSON = JSON.stringify(target);
    }
  };
};
