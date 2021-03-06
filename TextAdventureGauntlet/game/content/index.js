import { defineEffects } from './effect';
import { defineStatusEffects } from './statusEffect';
import { registerAbilities } from './ability';
import { createRooms } from './room';
import { registerCharacters } from './character';

export const initializeSystem = (system) => {
  system.transaction(() => {
    system.ui.initialize({
      playerCharacterId: 'player'
    });

    defineEffects(system);
    defineStatusEffects(system);
    registerAbilities(system);
    createRooms(system);
    registerCharacters(system);
  });
};
