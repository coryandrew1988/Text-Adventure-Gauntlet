import { createGuid } from '../utils';

export const createRooms = (system) => {
  const {
    create: createRoom,
    createPath
  } = system.world.rooms;

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

  [{
    id: createGuid(),
    room: rooms[0],
    targetRoom: rooms[1]
  }, {
    id: createGuid(),
    room: rooms[1],
    targetRoom: rooms[0]
  }].forEach(path => {
    createPath(path);
  });
};
