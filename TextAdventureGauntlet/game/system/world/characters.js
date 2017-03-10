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

      return realm.create('Character', character);
    },
    get,
    getVisible: (character) => {
      return realm.objects('Character')
      .filtered('room == $0', character.room)
      .filtered('id != $0', character.id)
      .sorted('priority');
    },
    hasAnyStatusEffectWithKey: (id, key) => {
      return realm.objects('CharacterStatusEffect').filtered('characterId == $0 && key == $1', id, key).length > 0;
    }
  };
};

/*
const createCharacterSystem = (system) => { // TODO just put character logic straight into the effect code. there's no expected need for more indirection
  const getCharacter = system.world.characters.get;

  return {
    addAbility: (characterId, abilityId) => {
      const character = getCharacter(characterId);
      const abilities = character.abilities;

      if (abilities[abilityId]) { // could do a one-liner, but nah
        abilities[abilityId] += 1;
      } else {
        abilities[abilityId] = 1;
      }
    },
    removeAbility: (characterId, abilityId) => {
      const character = getCharacter(characterId);
      const abilities = character.abilities;

      if (abilities[abilityId]) { // could do a one-liner, but nah
        abilities[abilityId] -= 1;

        if (abilities[abilityId] <= 0) {
          delete abilities[abilityId];
        }
      }
    },
    modifyStat: (characterId, statKey, value) => {
      const character = getCharacter(characterId);
      character.stats[statKey] += value;
    }
  };
};
 */