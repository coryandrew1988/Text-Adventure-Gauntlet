import Realm from 'realm';

import { worldSchema } from './world/schema';
import { uiSchema } from './ui/schema';

const schema = worldSchema.concat(uiSchema);

// TEST PURPOSES ONLY
Realm.clearTestState();

const config = {
  path: '/data/data/com.textadventuregauntlet/files/000.realm',
  schema: schema
};

export const createRealm = () => {
  return new Realm(config);
};
