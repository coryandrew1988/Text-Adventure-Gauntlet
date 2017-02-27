// TODO later, we'll instead register characters dyanamically

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
    abilities: {
      'heavyPunch': 1
    }
  };
};

export const registerCharacters = (worldState) => {
  worldState.collections.characters.insert(createPlayer());
  worldState.collections.characters.insert(createEnemy('enemyA'));
  worldState.collections.characters.insert(createEnemy('enemyB'));
};

export const createCharacterSystem = (worldState) => {
  const getCharacter = worldState.collections.characters.get;

  return {
    applyDamage: (characterId, value) => {
      const character = getCharacter(characterId);
      character.hp -= value;

      if (character.hp <= 0) {
        character.hp = 0;

        // TODO add status effect 'defeated'
      }
    },
    applyTilt: (characterId, value) => {
      const character = getCharacter(characterId);
      character.bp -= value;

      if (character.bp <= 0) {
        character.bp = 0;

        // TODO add status effect 'prone'
      }
    },
    testHit: (attackerId, targetId, bonusAccuracy) => {
      const actor = getCharacter(attackerId);
      const target = getCharacter(targetId);

      const accuracy = bonusAccuracy + actor.stats.accuracy;
      const evasion = target.stats.evasion;

      return Math.random() * 100 < accuracy - evasion;
    },
    setActivity: (characterId, startTime, delay, abilityId) => {
      const character = getCharacter(characterId);

      character.activity = {
        delayStartTime: startTime,
        delayEndTime: startTime + delay,
        abilityId
      };
    },
    modifyStat: (characterId, statKey, value) => {
      const character = getCharacter(characterId);
      character.stats[statKey] += value;
    }
  };
};
