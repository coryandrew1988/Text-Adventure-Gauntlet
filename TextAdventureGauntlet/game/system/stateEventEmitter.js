import EventEmitter from 'EventEmitter';

export const createStateEventEmitter = (realm) => {
  let updateIsScheduled = false;
  const stateEventEmitter = new EventEmitter();
  realm.addListener('change', () => {
    if (updateIsScheduled) { return; }
    updateIsScheduled = true;

    requestAnimationFrame(() => {
      updateIsScheduled = false;
      stateEventEmitter.emit('change');
    });
  });

  return stateEventEmitter;
};
