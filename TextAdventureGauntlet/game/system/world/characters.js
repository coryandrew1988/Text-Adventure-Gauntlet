export const createCharacterSystem = (realm) => {
  return {
    create: (character) => {
      if (!character.id) {
        character.id = new Date() + '' + Math.random(); // TODO
      }

      realm.create('Character', character);
    },
    get: (id) => {
      if (!id) { return null; }

      return realm.objectForPrimaryKey('Character', id);
    }
  };
};
