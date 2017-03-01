import {
  createEvent,
  createClock,
  createScheduler
} from '../utils';

import { registerStatusEffects } from './statusEffect';
import { registerEffects } from './effect';
import { registerAbilities } from './ability';
import {
  registerCharacters,
  createCharacterSystem
} from './character';

const createOnlyRoom = () => {
  return {
    characterIds: ['player', 'enemy']
  };
};

export const initializeSystem = (system) => {
  const clock = createClock();
  const scheduler = createScheduler();

  const update = () => {
    scheduler.update(clock.getTime());

    global.setTimeout(update, 50);
  };

  update();

  const worldState = system.worldState;
  const events = system.events; // TODO remove this

  const flagStateChange = () => {
    events.state.publish();
  };

  const characterSystem = createCharacterSystem(worldState);

  registerStatusEffects(worldState);
  registerEffects(worldState, characterSystem, clock, scheduler, flagStateChange);

  registerAbilities(worldState);

  registerCharacters(worldState);
};
