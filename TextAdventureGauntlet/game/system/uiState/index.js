export const createUIState = (realm) => {
  const getState = () => realm.objectForPrimaryKey('State', 'only');

  return {
    realm,
    getState,
    transaction: callback => {
      realm.write(callback);
    },
    addStateListener: callback => {
      realm.addListener('change', callback);
    },
    removeStateListener: callback => {
      realm.removeListener('change', callback);
    },
    createMessage: (text) => {
      realm.create('Message', {
        id: Date.now() + '' + Math.random(),
        time: new Date(Date.now()), // TODO tie this to the game clock?
        text
      });
    },
    getMessages: () => {
      return realm.objects('Message').sorted('time');
    }
  };
};
