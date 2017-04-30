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

const createHit = ({ delay, accuracy, damage }) => {
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
            damage
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

const createAttack = ({ abilityId, actorDelay, effect }) => {
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
    effect: createAttack({
      abilityId: 'heavyPunch',
      actorDelay: 6000,
      effect: createHit({
        delay: 3000,
        accuracy: 100,
        damage: {
          type: 'physical',
          power:  2
        }
      })
    })
  };
};

const createComboPunchAbility = () => {
  return {
    id: 'comboPunch',
    name: 'Combo Punch',
    effect: createAttack({
        abilityId: 'comboPunch',
        actorDelay: 6000,
        effect: [
          createHit({
            delay: 2000,
            accuracy: 100,
            damage: {
              type: 'physical',
              power:  -2
            }
          }),
          createHit({
            delay: 3000,
            accuracy: 100,
            damage: {
              type: 'physical',
              power:  -2
            }
          }),
          createHit({
            delay: 4000,
            accuracy: 100,
            damage: {
              type: 'physical',
              power:  -2
            }
          })
        ]
    })
  };
};

export const registerAbilities = (system) => {
  const registerAbility = system.world.abilities.register;

  registerAbility(createHeavyPunchAbility());
  registerAbility(createComboPunchAbility());
};
