export const createEffectSystem = () => {
  const forwardMap = new Map();
  const reverseMap = new Map();

  const createExecuteFunction = (map, onMissing) => {
    const execute = (effect, context) => {
      if (!effect) { return null; }

      if (Array.isArray(effect)) {
        return effect.map((e) => {
          return execute(e, context);
        });
      }

      const effectCallback = map.get(effect.key);
      if (!effectCallback) {
        onMissing(effect, context);
      }

      return effectCallback(effect.params, context);
    };

    return execute;
  };


  const execute = createExecuteFunction(forwardMap, (effect, context) => {
    throw new Error(`There is no effect with key "${effect.key}".`);
  });
  const reverse = createExecuteFunction(reverseMap, (effect, context) => {
    throw new Error(`There is no reversible effect with key "${effect.key}".`);
  });

  return {
    define: (key, callback, { reverse } = {}) => {
      forwardMap.set(key, callback);

      if (reverse) {
        reverseMap.set(key, reverse);
      }
    },
    execute,
    reverse
  };
};
