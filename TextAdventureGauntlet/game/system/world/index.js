import { createEffectSystem } from './effects';
import { createStatusEffectSystem } from './statusEffects';
import { createCharacterSystem } from './characters';
import { createAbilitySystem } from './abilities';

export const createWorld = (realm) => {
  const effects = createEffectSystem();
  const statusEffects = createStatusEffectSystem(realm);
  const characters = createCharacterSystem(realm, statusEffects);
  const abilities = createAbilitySystem(realm, effects);

  return {
    effects,
    statusEffects,
    characters,
    abilities
  };
};
