export const createScheduler = () => {
  const queue = [];

  return {
    schedule: (time, callback) => {
      let i = 0;
      while (i < queue.length) {
        if (queue[i].time > time) {
          break;
        }

        i += 1;
      }

      queue.splice(i, 0, {
        time: time,
        callback: callback
      });
    },
    update: (time) => {
      let i = 0;
      while (i < queue.length) {
        if (queue[i].time < time) {
          const callback = queue[i].callback; // cleanest way to call without leaking a reference to a scheduling object
          callback();
          i += 1;
        } else {
          break;
        }
      }

      queue.splice(0, i);
    }
  };
};
