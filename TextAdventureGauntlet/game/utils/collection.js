// In the long, long run, this might get replaced with a proper database.

export const createCollection = () => {
  const map = new Map();

  return {
    get: id => map.get(id),
    insert: value => {
      map.set(value.id, value);
    },
    remove: (id) => {
      map.delete(id);
    }
  };
};
