// TODO later, we'll instead load characters dyanamically

const createPlayer = () => {
  return {
    id: 'player',
    description: {
      id: 'playerDescription',
      name: 'Player'
    },
    stats: {
      // TODO add build, including race, classes, equipment, upgrades, and any other customizing factors
      id: 'playerStats',
      hp: 10,
      mp: 7,
      bp: 12,
      maxHP: 10,
      maxMP: 7,
      maxBP: 12,
      power: 0,
      resistance: 0,
      accuracy: 0,
      evasion: 50
    }
  };
};

const createEnemy = (id, name) => {
  return {
    id,
    description: {
      id: id + 'Description',
      name
    },
    stats: {
      id: id + 'Stats',
      hp: 2,
      mp: 1,
      bp: 2,
      maxHP: 2,
      maxMP: 1,
      maxBP: 2,
      power: 0,
      resistance: -2,
      accuracy: 0,
      evasion: 0
    }
  };
};

export const registerCharacters = (worldState) => {
  const characters = [
    {
      id: 'temp',
      description: {
        id: 'tempDescription',
        name: 'The Temporary One'
      },
      stats: {
        id: 'tempStats',
        maxHP: 10,
        hp: 10,
        maxMP: 3,
        mp: 3,
        maxBP: 2,
        bp: 2,
        power: 0,
        resistance: 0,
        accuracy: 0,
        evasion: 0
      }
    },
    createPlayer(),
    createEnemy('enemyA', 'Enemy A'),
    createEnemy('enemyB', 'Enemy B'),
    createEnemy('enemyC', 'Enemy C'),
    createEnemy('enemyD', 'Enemy D')
  ];

  const realm = worldState.realm;

  worldState.transaction(() => {
    characters.forEach(c => {
      realm.create('Character', c);
    });
  });

  //setTimeout(() => {
    //const characters = realm.objects('Character');
    //log(characters.map(v=>v));
  //});
};

export const createCharacterSystem = (worldState) => { // TODO just put character logic straight into the effect code. there's currently no need for more indirection
  const getCharacter = worldState.getCharacter;

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
