export const createControlSystem = (world) => {
  const updateCharacter = (character, now, activeRoom, activeCharacter) => {
    const { controller } = character;
    if (controller == null) { return; }

    if (character.room.id !== activeRoom.id) {
      character.nextAvailableTime = now + 3000;
      return;
    }

    if (controller.aggression < 100 * Math.random()) {
      character.nextAvailableTime = now + 3000;
    } else {
      const abilities = character.abilities;
      if (abilities.length <= 0) { return; }

      // TODO use controller to select ability

      const ability = abilities[Math.floor(Math.random() * abilities.length)];
      // TODO check factions to get target
      world.abilities.execute(ability, {
        actor: character,
        target: activeCharacter
      });
    }
  };

  const update = (now, activeCharacter) => {
    const activeRoom = activeCharacter.room;

    world.characters.getAvailable(now).snapshot().forEach(character => {
      if (!character) { return; }

      updateCharacter(character, now, activeRoom, activeCharacter);
    });
  };

  return { update };
};
