import { createEventSystem } from './events';
import { createEffectSystem } from './effects';
import { createStatusEffectSystem } from './statusEffects';
import { createAbilitySystem } from './abilities';
import { createRoomSystem } from './rooms';
import { createCharacterSystem } from './characters';

export const createWorld = (realm) => {
  const events = createEventSystem();
  const effects = createEffectSystem();
  const statusEffects = createStatusEffectSystem(realm);
  const abilities = createAbilitySystem(realm, effects);
  const rooms = createRoomSystem(realm);
  const characters = createCharacterSystem(realm, statusEffects);

  return {
    events,
    effects,
    statusEffects,
    abilities,
    rooms,
    characters
  };
};
