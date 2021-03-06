export const createAbilitySystem = (realm, effectSystem) => {
  const effectMap = new WeakMap();

  const getEffect = (ability) => {
    let effect = effectMap.get(ability)
    if (!effect) {
      effect = JSON.parse(ability.effectJSON);
      effectMap.set(ability, effect);
    }

    return effect;
  };

  const get = id => realm.objectForPrimaryKey('Ability', id);

  return {
    register: ({ id, name, effect }) => {
      realm.create('Ability', {
        id,
        name,
        effectJSON: JSON.stringify(effect)
      });
    },

    get,

    execute: (ability, context) => {
      effectSystem.execute(getEffect(ability), context);
    }
  };
};
