export const createMessageSystem = (realm, stateEventEmitter) => {
  const messages = [];

  return {
    publish: (type, data) => {
      messages.push({ type, data });
      if (messages.length > 256) {
        messages.splice(0, 8);
      }
      stateEventEmitter.emit('change');
    },
    getAll: () => messages
  };
};
