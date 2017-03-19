import { createGuid } from '../utils';

// TODO load/generate characters dyanamically

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
      resistance: -2,
      accuracy: 0,
      evasion: 0
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
      evasion: 0
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
