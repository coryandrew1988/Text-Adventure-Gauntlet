import Realm from 'realm';

const configuration = {
  path: '/data/data/com.textadventuregauntlet/files/ui.realm',
  schema: [{
    name: 'Message',
    primaryKey: 'id',
    properties: {
      id: 'string',
      time: 'date',
      text: 'string'
    }
  }, {
    name: 'State',
    primaryKey: 'key',
    properties: {
      key: 'string',
      targetId: { type: 'string', optional: true },
      playerCharacterId: { type: 'string', optional: true }
    }
  }]
};

export const createRealm = () => {
  const realm = new Realm(configuration);

  realm.write(() => {
    realm.create('State', {
      key: 'only',
      targetId: null,
      playerCharacterId: 'player' // TODO initialize this in a clean way
    });
  });

  return realm;
};
