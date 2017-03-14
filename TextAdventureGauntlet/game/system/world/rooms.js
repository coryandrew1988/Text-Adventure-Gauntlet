export const createRoomSystem = (realm) => {
  return {
    create: (room) => realm.create('Room', room),
    createFixture: (fixture) => realm.create('Fixture', fixture),

    get: id => realm.objectForPrimaryKey('Room', id),
    getFixture: id => realm.objectForPrimaryKey('Fixture', id),
    getFixtures: room => realm.objects('Fixture').filtered('room == $0', room)
  };
};
