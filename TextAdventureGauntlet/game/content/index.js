import { registerEffects } from './effect';
import { registerStatusEffects } from './statusEffect';
import { registerAbilities } from './ability';
import { registerCharacters } from './character';

const createOnlyRoom = () => { // TODO move this out and expand it into a register/generate room module
  return {
    characterIds: ['player', 'enemyA']
  };
};

export const initializeSystem = (system) => {
  system.transaction(() => {
    registerEffects(system);
    registerStatusEffects(system);
    registerAbilities(system);
    registerCharacters(system);
  });
};
