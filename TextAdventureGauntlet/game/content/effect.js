export const registerEffects = (system) => {
  const getCharacter = system.world.characters.get;

  const clock = system.clock;

  const executeEffect = system.world.effects.execute;
  const registerEffect = system.world.effects.register;
  const applyStatusEffect = system.world.statusEffects.apply;

  registerEffect('delayEffect', (params, context) => {
    system.scheduleTransaction(params.delay, () => {
      executeEffect(params.effect, context);
    });
  });

  registerEffect('publishMessage', (params, context) => {
    system.uiState.createMessage(params.text);
    // TODO determine the best way to publish a message
    // TODO actually render some templates here
    // TODO use context to communicate about the results of other effects
  });

  registerEffect('setActorActivity', (params, context) => {
    const startTime = clock.getTime();
    const character = getCharacter(context.actorId);

    character.activity = {
      id: Date.now() + '' + Math.random(), // TODO get actual ids
      startTime: new Date(startTime),
      endTime: new Date(startTime + params.delay),
      ability: null // params.abilityId // TODO
    };
  });

  const requireCharacter = (id, status, callback) => {
    const character = getCharacter(id);
    if (!character) { return; }

    if (status) {
      if (status.isAlive) {
        if (character.stats.hp <= 0) { return; }
      }

      if (status.isAvailable) {
        const activity = character.activity;
        if (activity && clock.getTime() < activity.endTime.valueOf()) { return; }
      }

      if (typeof status.payMP === 'number') {
        if (character.stats.mp < status.payMP) { return; }
        character.stats.mp -= status.payMP; // TODO separate mp payment from this stuff, so the order of operations can be controlled
      }

      // TODO also do optional checks for other statuses
    }

    callback();
  };

  registerEffect('requireActor', (params, context) => {
    requireCharacter(context.actorId, params.status, () => {
      executeEffect(params.effect, context);
    });
  });

  registerEffect('requireTarget', (params, context) => {
    requireCharacter(context.targetId, params.status, () => {
      executeEffect(params.effect, context);
    });
  });

  registerEffect('damageTarget', (params, context) => {
    const actor = getCharacter(context.actorId);
    const target = getCharacter(context.targetId);

    const power = params.power + actor.stats.power;
    const resistance = params.ignoresResistance ? 0 : target.stats.resistance;

    const damage = Math.max(0, power - resistance);

    target.stats.hp -= damage;

    if (target.stats.hp <= 0) {
      target.stats.hp = 0;

      // TODO add status effect 'defeated'
    }
  });

  registerEffect('tiltTarget', (params, context) => {
    const target = getCharacter(context.targetId);
    if (target.stats.bp <= 0) { return; }

    target.stats.bp -= params.tilt;

    if (target.stats.bp <= 0) {
      target.stats.bp = 0;

      applyStatusEffect('prone', context.targetId, {});
    }
  });

  registerEffect('attackTarget', (params, context) => {
    const actor = getCharacter(context.actorId);
    const target = getCharacter(context.targetId);

    const accuracy = params.accuracy + actor.stats.accuracy;
    const evasion = target.stats.evasion;

    const isHit = Math.random() * 100 < accuracy - evasion;

    if (isHit) {
      if (params.hitEffect) {
        executeEffect(params.hitEffect, context);
      }
    } else {
      if (params.missEffect) {
        executeEffect(params.missEffect, context);
      }
    }
  });
};
