import { createGuid } from '../utils';

export const defineEffects = (system) => {
  const clock = system.clock;

  const defineEffect = system.world.effects.define;
  const executeEffect = system.world.effects.execute;

  const applyStatusEffect = system.world.statusEffects.apply;
  const getRoom = system.world.rooms.get;

  const renderMessage = system.ui.messages.render;
  const createMessage = system.ui.messages.create;

  defineEffect('delayEffect', ({ delay, effect }, context) => {
    system.scheduleTransaction(delay, () => {
      executeEffect(effect, context);
    });

    return null;
  });

  defineEffect('publishMessage', ({ template, effect }, context) => {
    const effectResult = executeEffect(effect, context);

    const text = renderMessage(template, {
      effectResult
    });

    createMessage(text);

    return effectResult;
  });

  defineEffect('setActivity', ({ prop, delay, abilityId }, context) => {
    const startTime = clock.getTime();
    const character = context[prop];
    const ability = system.world.abilities.get(abilityId);

    character.nextAvailableTime = startTime + delay;
    character.activity = {
      id: createGuid(),
      startTime: startTime,
      endTime: startTime + delay,
      ability
    };

    return { character, ability };
  });

  defineEffect('require', ({ prop, status, effect }, context) => {
    const character = context[prop];
    if (!character) { return null; }

    if (status) {
      if (status.isAlive) {
        if (character.stats.hp <= 0) { return null; }
      }

      if (status.isAvailable) {
        const activity = character.activity;
        if (activity && clock.getTime() < activity.endTime.valueOf()) { return null; }
      }

      if (typeof status.payMP === 'number') {
        if (character.stats.mp < status.payMP) { return null; }
        character.stats.mp -= status.payMP; // TODO separate mp payment from this stuff, so the order of operations can be controlled
      }

      // TODO also do optional checks for other statuses
    }

    return executeEffect(effect, context);
  });

  defineEffect('damage', ({
    prop, targetProp, power, ignoresResistance
  }, context) => {
    const attacker = context[prop];
    const target = context[targetProp];

    const totalPower = power + attacker.stats.power;
    const totalResistance = ignoresResistance ? 0 : target.stats.resistance;

    const damage = Math.max(0, totalPower - totalResistance);

    const isAlreadyDefeated = target.stats.hp <= 0;

    target.stats.hp -= damage;

    const isDefeated = target.stats.hp <= 0;
    const becameDefeated = isDefeated && !isAlreadyDefeated;

    if (isDefeated) {
      target.stats.hp = 0;

      // TODO add status effect 'defeated'
    }

    return { attacker, target, damage, becameDefeated };
  });

  defineEffect('tilt', ({ targetProp, tilt }, context) => {
    const target = context[targetProp];

    const isAlreadyProne = target.stats.bp <= 0;

    target.stats.bp -= tilt;

    const isProne = target.stats.bp <= 0;
    const becameProne = isProne && !isAlreadyProne;

    if (isProne) {
      target.stats.bp = 0;

      applyStatusEffect('prone', target, {});
    }

    return { target, tilt, becameProne }
  });

  defineEffect('attack', ({
    prop, targetProp, accuracy, hitEffect, missEffect
  }, context) => {
    const attacker = context[prop];
    const target = context[targetProp];

    const totalAccuracy = accuracy + attacker.stats.accuracy;
    const totalEvasion = target.stats.evasion;

    const isHit = Math.random() * 100 < totalAccuracy - totalEvasion;

    return {
      isHit,
      attacker,
      target,
      subEffect: isHit ? (
        hitEffect ? executeEffect(hitEffect, context) : null
      ) : ( // Deliberately using ?:, not &&, so we get null and avoid undefined.
        missEffect ? executeEffect(missEffect, context) : null
      )
    };
  });

  defineEffect('move', ({ prop, roomId }, context) => {
    const character = context[prop];

    character.room = getRoom(roomId);

    if (character.id === system.getActiveCharacter().id) {
      system.ui.setTarget(null);
    }

    return { character, roomId }
  });
};
