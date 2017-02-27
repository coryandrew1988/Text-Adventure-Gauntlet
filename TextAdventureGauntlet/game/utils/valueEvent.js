export const createValueEvent = () => {
  const callbacks = [];

  return {
    publish: (value) => {
      callbacks.forEach((callback) => callback(value));
    },
    getHandle: () => {
      const disposalCallbacks = [];
      return {
        subscribe: (callback) => {
          callbacks.push(callback);

          let index = callbacks.length;
          disposalCallbacks.push(() => {
            while (--index) {
              if (callbacks[index] === callback) {
                callbacks.splice(index, 1);
                return;
              }
            }
          });
        },
        dispose: () => {
          disposalCallbacks.forEach((dispose) => dispose());
        }
      };
    }
  };
};
