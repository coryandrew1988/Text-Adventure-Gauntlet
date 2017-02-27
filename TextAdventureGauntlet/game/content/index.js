import {
  createEvent,
  createClock,
  createScheduler
} from '../utils';

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
      resistance: -2,
      accuracy: 0,
      evasion: 50
    },
    abilities: ['punch']
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
      resistance: 0,
      accuracy: 0,
      evasion: 0
    },
    abilities: ['punch']
  };
};

const delayEffect = (delay, effect) => {
  return {
    key: 'delayEffect',
    params: { delay, effect }
  };
};

const requireActor = (status, effect) => {
  return {
    key: 'requireActor',
    params: { status, effect }
  };
};

const requireTarget = (status, effect) => {
  return {
    key: 'requireTarget',
    params: { status, effect }
  };
};

const requireActorAndTarget = (statuses, effect) => {
  return requireActor(statuses.actor, requireTarget(statuses.target, effect));
};

const delayAndRequire = (delay, statuses, effect) => {
  return delayEffect(delay, requireActorAndTarget(statuses, effect));
};

const publishMessage = (text) => {
  return {
    key: 'publishMessage',
    params: { text }
  };
};

const createHit = (delay, accuracy, power, hitText, missText) => {
  return delayAndRequire(delay, {
    actor: { isAlive: true },
    target: { isAlive: true }
  }, {
    key: 'attackTarget',
    params: {
      accuracy,
      hitEffect: [
        {
          key: 'damageTarget',
          params: { power }
        },
        { key: 'knockTarget' },
        publishMessage(hitText)
      ],
      missEffect: publishMessage(missText)
    }
  });
};

const createAttack = (abilityId, actorDelay, startText, effect) => {
  return requireActorAndTarget(
    {
      actor: {
        isAlive: true,
        isAvailable: true
      },
      target: { isAlive: true }
    },
    [
      {
        key: 'setActorActivity',
        params: {
          delay: actorDelay,
          abilityId
        }
      },
      publishMessage(startText),
      effect
    ]
  );
};

const createHeavyPunchAbility = () => {
  return {
    id: 'heavyPunch',
    name: 'Heavy Punch',
    effect: createAttack('heavyPunch', 2000, 'Attacking with a heavy punch!', createHit(1000, 100, 2, 'hit!', 'miss!'))
  };
};

const createComboPunchAbility = () => {
  return {
    id: 'comboPunch',
    name: 'Combo Punch',
    effect: createAttack('punch', 3000, 'Attacking with a punch combo!', [
      createHit(1000, 100, -2, 'hit!', 'miss!'),
      createHit(1500, 100, -2, 'hit!', 'miss!'),
      createHit(2000, 100, -2, 'hit!', 'miss!')
    ])
  };
};

const createOnlyRoom = () => {
  return {
    characterIds: ['player', 'enemy']
  };
};

export const initializeSystem = (system) => {
  const clock = createClock();
  const scheduler = createScheduler();

  const update = () => {
    scheduler.update(clock.getTime());

    setTimeout(update, 50);
  };

  update();

  const worldState = system.worldState;
  const events = system.events; // TODO remove this

  const flagStateChange = () => {
    events.state.publish();
  };
  const getCharacter = worldState.collections.characters.get;

  worldState.registerEffect('delayEffect', (params, context) => {
    scheduler.schedule(clock.getTime() + params.delay, () => {
      worldState.executeEffect(params.effect, context);
    });
  });

  worldState.registerEffect('publishMessage', (params, context) => {
    log(params.text);
    // TODO determine the best way to publish a message
    // TODO actually render some templates here
    // TODO use context to communicate about the results of other effects
  });

  worldState.registerEffect('setActorActivity', (params, context) => {
    const actor = getCharacter(context.actorId);
    const now = clock.getTime();
    actor.activity = {
      delayStartTime: now + params.delay,
      delayEndTime: now + params.delay,
      abilityId: params.abilityId
    };
    flagStateChange();
  });

  const requireCharacter = (id, status, callback) => {
    const character = getCharacter(id);
    if (!character) { return; }

    if (status) {
      if (status.isAlive) {
        if (character.hp <= 0) { return; }
      }

      if (status.isAvailable) {
        const activity = character.activity;
        if (activity && clock.getTime() < activity.delayEndTime) { return; }
      }

      if (typeof status.payMP === 'number') {
        if (character.mp < status.payMP) { return; }
        character.mp -= status.payMP; // TODO separate mp payment from this stuff, so order can be controlled
        flagStateChange();
      }

      // TODO also do optional checks for other statuses
    }

    callback();
  };

  worldState.registerEffect('requireActor', (params, context) => {
    requireCharacter(context.actorId, params.status, () => {
      worldState.executeEffect(params.effect, context);
    });
  });

  worldState.registerEffect('requireTarget', (params, context) => {
    requireCharacter(context.targetId, params.status, () => {
      worldState.executeEffect(params.effect, context);
    });
  });

  worldState.registerEffect('damageTarget', (params, context) => {
    const actor = getCharacter(context.actorId);
    const target = getCharacter(context.targetId);

    const power = params.power + actor.stats.power;
    const resistance = params.ignoresResistance ? 0 : target.stats.resistance;

    const damage = Math.max(0, power - resistance);

    target.hp -= damage;
    if (target.hp <= 0) {
      target.hp = 0;
    }

    flagStateChange();
  });

  worldState.registerEffect('knockTarget', (params, context) => {
    const actor = getCharacter(context.actorId);
    const target = getCharacter(context.targetId);

    target.bp -= 1; // TODO we probably want moves that can take off more than 1 BP at a time, right?
    if (target.bp <= 0) {
      target.bp = 0;
    }

    flagStateChange();
  });

  worldState.registerEffect('attackTarget', (params, context) => {
    const actor = getCharacter(context.actorId);
    const target = getCharacter(context.targetId);

    // TODO check that actor and target are not yet defeated

    const accuracy = params.accuracy + actor.stats.accuracy;
    const evasion = target.stats.evasion;

    const isHit = Math.random() * 100 < accuracy - evasion;

    if (isHit) {
      if (params.hitEffect) {
        worldState.executeEffect(params.hitEffect, context);
      }
    } else {
      if (params.missEffect) {
        worldState.executeEffect(params.missEffect, context);
      }
    }
  });

  worldState.collections.characters.insert(createPlayer());
  worldState.collections.characters.insert(createEnemy('enemyA'));
  worldState.collections.characters.insert(createEnemy('enemyB'));

  worldState.collections.abilities.insert(createHeavyPunchAbility());
  worldState.collections.abilities.insert(createComboPunchAbility());
};
