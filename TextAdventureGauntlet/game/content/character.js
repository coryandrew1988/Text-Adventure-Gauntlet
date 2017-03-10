// TODO later, we'll instead load characters dyanamically

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

const createEnemy = (system, id, name) => {
  const getRoom = system.world.rooms.get;
  return {
    id,
    priority: 0,
    room: getRoom('only'),
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

const createTemp = (system) => {
  const getRoom = system.world.rooms.get;

  return {
    id: 'temp',
    priority: 1,
    room: getRoom('second'),
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
      maxBP: 4,
      bp: 4,
      power: 0,
      resistance: 0,
      accuracy: 0,
      evasion: 0
    }
  };
};

export const registerCharacters = (system) => {
  const characters = [
    createTemp(system),
    createPlayer(system),
    createEnemy(system, 'enemyA', 'Enemy A'),
    createEnemy(system, 'enemyB', 'Enemy B'),
    createEnemy(system, 'enemyC', 'Enemy C'),
    createEnemy(system, 'enemyD', 'Enemy D')
  ];

  characters.forEach(c => {
    system.world.characters.create(c);
  });
};
