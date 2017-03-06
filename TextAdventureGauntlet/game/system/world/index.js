import { createEffectSystem } from './effects';
import { createStatusEffectSystem } from './statusEffects';
import { createCharacterSystem } from './characters';
import { createAbilitySystem } from './abilities';

export const createWorld = (realm) => {
  const effects = createEffectSystem();
  const statusEffects = createStatusEffectSystem();
  const characters = createCharacterSystem(realm);
  const abilities = createAbilitySystem(realm, effects);

  return {
    effects,
    statusEffects,
    characters,
    abilities
  };
};
