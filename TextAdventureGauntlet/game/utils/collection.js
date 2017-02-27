export const createCollection = () => {
  const values = {};

  return {
    get: id => values[id],
    insert: value => {
      values[value.id] = value;
    }
  };
};
