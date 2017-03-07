export const createCharacterSystem = (realm, statusEffects) => {
  const get = (id) => {
    if (!id) { return null; }

    return realm.objectForPrimaryKey('Character', id);
  };

  return {
    create: (character) => {
      if (!character.id) {
        character.id = new Date() + '' + Math.random(); // TODO
      }

      realm.create('Character', character);
    },
    get,
    hasAnyStatusEffectWithKey: (id, key) => {
      return realm.objects('CharacterStatusEffect').filtered('characterId == $0 && key == $1', id, key).length > 0;
    }
  };
};
