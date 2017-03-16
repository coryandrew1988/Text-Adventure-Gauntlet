import { createGuid } from '../utils';

export const defineEffects = (system) => {
  const clock = system.clock;

  const executeEffect = system.world.effects.execute;
  const defineEffect = system.world.effects.define;
  const applyStatusEffect = system.world.statusEffects.apply;

  defineEffect('delayEffect', ({ delay, effect }, context) => {
    system.scheduleTransaction(delay, () => {
      executeEffect(effect, context);
    });
  });

  defineEffect('publishMessage', ({ text }, context) => {
    system.ui.messages.create(text);
    // TODO determine the best way to publish a message
    // TODO actually render some templates here
    // TODO use context to communicate about the results of other effects
  });

  defineEffect('setActivity', ({ prop, delay, abilityId }, context) => {
    const startTime = clock.getTime();
    const character = context[prop];

    character.nextAvailableTime = startTime + delay;
    character.activity = {
      id: createGuid(),
      startTime: startTime,
      endTime: startTime + delay,
      ability: system.world.abilities.get(abilityId)
    };
  });

  defineEffect('require', ({ prop, status, effect }, context) => {
    const character = context[prop];
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

    executeEffect(effect, context);
  });

  defineEffect('damage', ({
    prop, targetProp, power, ignoresResistance
  }, context) => {
    const actor = context[prop];
    const target = context[targetProp];

    const totalPower = power + actor.stats.power;
    const totalResistance = ignoresResistance ? 0 : target.stats.resistance;

    const damage = Math.max(0, totalPower - totalResistance);

    target.stats.hp -= damage;

    if (target.stats.hp <= 0) {
      target.stats.hp = 0;

      // TODO add status effect 'defeated'
    }
  });

  defineEffect('tilt', ({ targetProp, tilt }, context) => {
    const target = context[targetProp];
    if (target.stats.bp <= 0) { return; }

    target.stats.bp -= tilt;

    if (target.stats.bp <= 0) {
      target.stats.bp = 0;

      applyStatusEffect('prone', target, {});
    }
  });

  defineEffect('attack', ({
    prop, targetProp, accuracy, hitEffect, missEffect
  }, context) => {
    const actor = context[prop];
    const target = context[targetProp];

    const totalAccuracy = accuracy + actor.stats.accuracy;
    const totalEvasion = target.stats.evasion;

    const isHit = Math.random() * 100 < totalAccuracy - totalEvasion;

    if (isHit) {
      if (hitEffect) {
        executeEffect(hitEffect, context);
      }
    } else {
      if (missEffect) {
        executeEffect(missEffect, context);
      }
    }
  });

  defineEffect('move', ({ prop, roomId }, context) => {
    const character = context[prop];

    character.room = system.world.rooms.get(roomId);

    if (character === system.getActiveCharacter()) {
      system.ui.setTarget(null);
    }
  });
};
