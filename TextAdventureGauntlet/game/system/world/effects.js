export const createEffectSystem = () => {
  const map = new Map();

  const execute = (effect, context) => {
    if (!effect) { return null; }

    if (Array.isArray(effect)) {
      return effect.map((e) => {
        return execute(e, context);
      });
    }

    const effectCallback = map.get(effect.key);
    if (!effectCallback) {
      throw new Error(`There is no effect with key "${effect.key}".`);
    }

    return effectCallback(effect.params, context);
  };

  return {
    define: (key, callback) => {
      map.set(key, callback);
    },
    execute
  };
};
