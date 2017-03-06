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
        {
          key: 'tiltTarget',
          params: { tilt: 1 }
        },
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

export const registerAbilities = (system) => {
  const registerAbility = system.world.abilities.register;

  registerAbility(createHeavyPunchAbility());
  registerAbility(createComboPunchAbility());
};
