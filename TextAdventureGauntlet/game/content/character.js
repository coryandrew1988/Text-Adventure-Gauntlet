// TODO later, we'll instead load characters dyanamically

const createPlayer = () => {
  return {
    id: 'player',
    roomId: 'only',
    name: 'Player',
    build: {}, // TODO later
    activity: null,
    hp: 10,
    mp: 7,
    bp: 12,
    stats: {
      maxHP: 10,
      maxMP: 7,
      maxBP: 12,
      power: 0,
      resistance: 0,
      accuracy: 0,
      evasion: 50
    },
    statusEffects: {},
    abilities: {
      'heavyPunch': 1
    }
  };
};

const createEnemy = (id) => {
  return {
    id,
    roomId: 'only',
    name: 'Enemy',
    build: null, // omitted on template-based characters
    activity: null,
    hp: 2,
    mp: 1,
    bp: 2,
    stats: {
      maxHP: 2,
      maxMP: 1,
      maxBP: 2,
      power: 0,
      resistance: -2,
      accuracy: 0,
      evasion: 0
    },
    statusEffects: {},
    abilities: {
      'heavyPunch': 1
    }
  };
};

export const registerCharacters = (worldState) => {
  [
    createPlayer(),
    createEnemy('enemyA'),
    createEnemy('enemyB'),
    createEnemy('enemyC'),
    createEnemy('enemyD')
  ].forEach(c => {
    worldState.collections.characters.insert(c);
  });
};

export const createCharacterSystem = (worldState) => {
  const getCharacter = worldState.collections.characters.get;

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
