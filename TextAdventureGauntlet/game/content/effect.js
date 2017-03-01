export const registerEffects = (worldState, characterSystem, clock, scheduler, flagStateChange) => {
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
    const startTime = clock.getTime();
    const character = getCharacter(context.actorId);

    character.activity = {
      delayStartTime: startTime,
      delayEndTime: startTime + params.delay,
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
        character.mp -= status.payMP; // TODO separate mp payment from this stuff, so the order of operations can be controlled
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

      // TODO add status effect 'defeated'
    }

    flagStateChange();
  });

  worldState.registerEffect('tiltTarget', (params, context) => {
    const target = getCharacter(context.targetId);

    target.bp -= params.tilt;

    if (target.bp <= 0) {
      target.bp = 0;

      worldState.statusEffectSystem.apply('prone', context.targetId, {});
    }

    flagStateChange();
  });

  worldState.registerEffect('attackTarget', (params, context) => {
    const actor = getCharacter(context.actorId);
    const target = getCharacter(context.targetId);

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
};
