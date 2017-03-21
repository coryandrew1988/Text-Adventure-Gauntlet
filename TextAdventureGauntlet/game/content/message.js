export const defineTemplates = (system) => {
  const { defineTemplate } = system.ui.messages;

  defineTemplate('setActivity', ({
    effectResult: { character, ability }
  }) => {
    return `${character.description.name} started using ${ability.name}.`;
  });

  defineTemplate('attack', ({
    effectResult: { isHit, attacker, target, subEffect }
  }) => {
    if (!isHit) {
      return `${attacker.description.name} missed ${target.description.name}!`;
    }

    const { damage, becameDefeated } = subEffect[0];
    const { becameProne } = subEffect[1];

    const statusMessage = becameDefeated ? ` ${target.description.name} was defeated!` : (
      becameProne ? ` ${target.description.name} was knocked down!` : ''
    );

    return `${attacker.description.name} hit ${target.description.name} for ${damage} damage!${statusMessage}`;
  });
};
