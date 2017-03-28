const delayEffect = (delay, effect) => {
  return {
    key: 'delayEffect',
    params: { delay, effect }
  };
};

const requireCharacter = (prop, status, effect) => {
  return {
    key: 'require',
    params: { status, effect, prop }
  };
};

const requireActorAndTarget = (statuses, effect) => {
  return requireCharacter(
    'actor',
    statuses.actor,
    requireCharacter('target', statuses.target, effect)
  );
};

const delayAndRequire = (delay, statuses, effect) => {
  return delayEffect(delay, requireActorAndTarget(statuses, effect));
};

const publishMessage = (type, effect) => {
  return {
    key: 'publishMessage',
    params: { template: type, effect, type }
  };
};

const createHit = (delay, accuracy, power, hitText, missText) => {
  return delayAndRequire(delay, {
    actor: { isAlive: true },
    target: { isAlive: true }
  }, publishMessage('attack', {
    key: 'attack',
    params: {
      prop: 'actor',
      targetProp: 'target',
      accuracy,
      hitEffect: [
        {
          key: 'damage',
          params: {
            prop: 'actor',
            targetProp: 'target',
            power
          }
        },
        {
          key: 'tilt',
          params: {
            targetProp: 'target',
            tilt: 1
          }
        }
      ]
    }
  }));
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
      publishMessage('setActivity', {
        key: 'setActivity',
        params: {
          prop: 'actor',
          delay: actorDelay,
          abilityId
        }
      }),
      effect
    ]
  );
};

const createHeavyPunchAbility = () => {
  return {
    id: 'heavyPunch',
    name: 'Heavy Punch',
    effect: createAttack('heavyPunch', 6000, 'Attacking with a heavy punch!', createHit(3000, 100, 2, 'hit!', 'miss!'))
  };
};

const createComboPunchAbility = () => {
  return {
    id: 'comboPunch',
    name: 'Combo Punch',
    effect: createAttack('comboPunch', 6000, 'Attacking with a punch combo!', [
      createHit(3000, 100, -2, 'hit!', 'miss!'),
      createHit(4000, 100, -2, 'hit!', 'miss!'),
      createHit(5000, 100, -2, 'hit!', 'miss!')
    ])
  };
};

export const registerAbilities = (system) => {
  const registerAbility = system.world.abilities.register;

  registerAbility(createHeavyPunchAbility());
  registerAbility(createComboPunchAbility());
};
