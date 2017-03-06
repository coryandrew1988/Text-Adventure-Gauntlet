import Realm from 'realm';

import { schema } from './schema';

// TEST PURPOSES ONLY
Realm.clearTestState();

const config = {
  path: '/data/data/com.textadventuregauntlet/files/000.realm',
  schema: schema
};

export const createRealm = () => {
  return new Realm(config);
};
