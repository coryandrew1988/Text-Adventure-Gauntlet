export const createRoomSystem = (realm) => {
  const get = id => realm.objectForPrimaryKey('Room', id);

  return {
    create: (room) => realm.create('Room', room),
    createPath: (path) => realm.create('Path', path),

    get,
    getPaths: room => realm.objects('Path').filtered('room == $0', room)
  };
};
