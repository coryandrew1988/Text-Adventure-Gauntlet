export const createAbilitySystem = (realm, effectSystem) => {
  const map = new Map();

  const convertFromJSON = ({ id, name, effectJSON }) => {
    return {
      id,
      name,
      effect: JSON.parse(effectJSON)
    };
  };

  const get = (id) => {
    let result = map.get(id);
    if (result) { return result; }

    result = convertFromJSON(realm.objectForPrimaryKey('Ability', id));
    map.set(id, result);
    return result;
  };

  return {
    register: ({ id, name, effect }) => {
      realm.create('Ability', {
        id,
        name,
        effectJSON: JSON.stringify(effect)
      });
    },

    execute: (id, context) => {
      const ability = get(id);
      // TODO determine the optimal places for transactions
      realm.write(() => {
        effectSystem.execute(ability.effect, context);
      });
    }
  };
};
