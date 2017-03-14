import { createGuid } from '../utils';

export const createRooms = (system) => {
  const {
    create: createRoom,
    createFixture
  } = system.world.rooms;

  const createPath = (room, targetRoom) => {
    createFixture({
      id: createGuid(),
      room,
      description: { // TODO make a library of reusable fixture descriptions
        id: createGuid(),
        name: 'Path'
      },
      actions: [{
        id: createGuid(),
        name: 'Travel',
        effectJSON: JSON.stringify({
          key: 'moveActor',
          params: {
            roomId: targetRoom.id
          }
        })
      }]
    });
  };

  const createMutualPaths = (roomA, roomB) => {
    createPath(roomA, roomB);
    createPath(roomB, roomA);
  };

  const rooms = [{
    id: 'only',
    description: {
      id: 'onlyRoomDescription',
      name: 'The Formerly Only Room'
    }
  }, {
    id: 'second',
    description: {
      id: 'secondRoomDescription',
      name: 'The Second Room'
    }
  }].map(room => createRoom(room));

  createMutualPaths(rooms[0], rooms[1]);
};
