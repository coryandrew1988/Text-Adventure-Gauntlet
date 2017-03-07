export const createEffectSystem = () => {
  const map = new Map();

  const execute = (effect, context) => {
    if (!effect) { return; }

    if (Array.isArray(effect)) {
      effect.forEach((e) => {
        execute(e, context);
      });

      return;
    }

    const effectCallback = map.get(effect.key);
    if (!effectCallback) {
      throw new Error(`There is no effect with key "${effect.key}".`);
    }

    effectCallback(effect.params, context);
  };

  return {
    define: (key, callback) => {
      map.set(key, callback);
    },
    execute
  };
};
