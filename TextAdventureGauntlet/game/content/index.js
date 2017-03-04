import { registerStatusEffects } from './statusEffect';
import { registerAbilities } from './ability';
import { registerCharacters } from './character';

const createOnlyRoom = () => {
  return {
    characterIds: ['player', 'enemy']
  };
};

export const initializeSystem = (system) => {
  const worldState = system.worldState;

  registerStatusEffects(worldState);

  registerAbilities(worldState);

  registerCharacters(worldState);
};
