import { createGuid } from '../utils';

// TODO load/generate characters dynamically

const createEmptyBuild = () => {
  return {
    id: createGuid()
  };
};

const createDamageTypeStats = () => {
  return {
    id: createGuid()
  };
};

const createPlayer = (system) => {
  const getAbility = system.world.abilities.get;
  const getRoom = system.world.rooms.get;

  return {
    id: 'player',
    room: getRoom('only'),
    description: {
      id: 'playerDescription',
      name: 'Player'
    },
    stats: {
      id: createGuid(),
      //build: createEmptyBuild(),
      maxHP: 10,
      hp: 10,
      maxBP: 12,
      bp: 12,
      maxMP: 7,
      mp: 7,
      power: 0,
      resistance: 0,
      accuracy: 0,
      evasion: 50,
      relicAccess: 1,
      damageTypePowers: {
        id: createGuid(),
        physical: 1
      },
      damageTypeResistances: createDamageTypeStats(),
      damageTypeImmunities: createDamageTypeStats()
    },
    abilities: [getAbility('comboPunch'), getAbility('heavyPunch')]
  };
};

const createEnemy = (system, name) => {
  const getAbility = system.world.abilities.get;
  const getRoom = system.world.rooms.get;

  return {
    id: createGuid(),
    priority: 0,
    room: getRoom('only'),
    description: {
      id: createGuid(),
      name
    },
    stats: {
      id: createGuid(),
      hp: 2,
      mp: 1,
      bp: 2,
      maxHP: 2,
      maxMP: 1,
      maxBP: 2,
      power: 0,
      resistance: 0,
      accuracy: 0,
      evasion: 0,
      relicAccess: 1,
      damageTypePowers: createDamageTypeStats(),
      damageTypeResistances: {
        id: createGuid(),
        physical: -1
      },
      damageTypeImmunities: createDamageTypeStats()
    },
    abilities: [getAbility('comboPunch'), getAbility('heavyPunch')],
    controller: {
      id: createGuid(),
      aggression: 10,
      intelligence: 0
    }
  };
};

const createTemp = (system) => {
  const getRoom = system.world.rooms.get;
  const getAbility = system.world.abilities.get;

  return {
    id: createGuid(),
    priority: 1,
    room: getRoom('second'),
    description: {
      id: createGuid(),
      name: 'The Temporary One'
    },
    stats: {
      id: createGuid(),
      maxHP: 10,
      hp: 10,
      maxMP: 3,
      mp: 3,
      maxBP: 4,
      bp: 4,
      power: 0,
      resistance: 0,
      accuracy: 0,
      evasion: 0,
      relicAccess: 1,
      damageTypePowers: createDamageTypeStats(),
      damageTypeResistances: createDamageTypeStats(),
      damageTypeImmunities: createDamageTypeStats()
    },
    abilities: [getAbility('comboPunch'), getAbility('heavyPunch')],
    controller: {
      id: createGuid(),
      aggression: 25,
      intelligence: 0
    }
  };
};

export const registerCharacters = (system) => {
  const playerCharacter = createPlayer(system);
  const characters = [
    playerCharacter,
    createTemp(system),
    createEnemy(system, 'Enemy A'),
    createEnemy(system, 'Enemy B'),
    createEnemy(system, 'Enemy C'),
    createEnemy(system, 'Enemy D'),
    createEnemy(system, 'Enemy E'),
    createEnemy(system, 'Enemy F')
  ];

  characters.forEach(c => {
    system.world.characters.create(c);
  });
};
