export const createMessageSystem = (realm, stateEventEmitter) => {
  const messages = [];

  return {
    publish: (type, data) => {
      messages.push({ type, data });
      stateEventEmitter.emit('change');
    },
    getAll: () => messages
  };
};
