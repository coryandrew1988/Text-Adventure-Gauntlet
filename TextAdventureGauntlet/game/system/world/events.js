import EventEmitter from 'EventEmitter';

export const createEventSystem = () => {
  const eventEmitter = new EventEmitter();

  return {
    publish: (eventType, eventSpecifier, ...args) => {
      eventEmitter.emit(eventType, eventSpecifier, ...args);
    },
    subscribe: (eventType, subscriptionSpecifier, callback) => {
      const subscriptionSpecifierKeys = Object.keys(subscriptionSpecifier);
      const listener = (eventSpecifier, ...args) => {
        for (let i = 0; i < subscriptionSpecifierKeys.length; ++i) {
          const k = subscriptionSpecifierKeys[i];
          if (eventSpecifier[k] !== subscriptionSpecifier[k]) {
            return;
          }
        }

        callback(eventSpecifier, ...args);
      };

      eventEmitter.addListener(eventType, listener);

      return {
        dispose: () => {
          eventEmitter.removeListener(eventType, listener);
        }
      };
    }
  };
};
