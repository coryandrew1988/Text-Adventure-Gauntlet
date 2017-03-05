import { createRealm } from './realm';

export const createUIState = () => {
  const realm = createRealm();

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
    }
  };
};
