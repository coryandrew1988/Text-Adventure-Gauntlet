export const createClock = () => {
  let timeOffset = -Date.now();
  let pausedTime = null;

  return {
    getTime: () => {
      if (pausedTime != null) {
        return pausedTime + timeOffset;
      }

      return Date.now() + timeOffset;
    },
    pause: () => {
        if (pausedTime != null) { return; }

        pausedTime = Date.now();
    },
    unpause: () => {
        if (pausedTime == null) { return; }

        timeOffset -= Date.now() - pausedTime;
        pausedTime = null;
    }
  };
};

