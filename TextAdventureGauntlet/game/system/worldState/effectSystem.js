export const createEffectSystem = () => {
  const effectMap = new Map();

  const execute = (effect, context) => {
    if (!effect) { return; }

    if (Array.isArray(effect)) {
      effect.forEach((e) => {
        execute(e, context);
      });

      return;
    }

    const effectCallback = effectMap.get(effect.key);
    if (!effectCallback) {
      throw new Error(`There is no effect with key "${effect.key}".`);
    }

    effectCallback(effect.params, context);
  };

  return {
    register: (key, callback) => {
      effectMap.set(key, callback);
    },
    execute
  };
};
