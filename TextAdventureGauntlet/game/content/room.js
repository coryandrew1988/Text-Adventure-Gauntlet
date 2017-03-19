import { createGuid } from '../utils';

export const createRooms = (system) => {
  const {
    create: createRoom,
    createFixture
  } = system.world.rooms;

  const createPath = (room, targetRoom, pathName, actionName) => {
    createFixture({
      id: createGuid(),
      room,
      description: { // TODO make a library of reusable fixture descriptions
        id: createGuid(),
        name: pathName
      },
      actions: [{
        id: createGuid(),
        name: actionName,
        effectJSON: JSON.stringify({
          key: 'move',
          params: {
            prop: 'actor',
            roomId: targetRoom.id
          }
        })
      }]
    });
  };

  const createMutualPaths = (roomA, roomB, optionsA, optionsB) => {
    createPath(roomA, roomB, optionsA.pathName, optionsA.actionName);
    createPath(roomB, roomA, optionsB.pathName, optionsB.actionName);
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
  }, {
    id: 'safe',
    description: {
      id: 'safeRoomDescription',
      name: 'The Safe Room'
    }
  }].map(room => createRoom(room));

  createMutualPaths(rooms[0], rooms[1], {
    pathName: 'Iron Door', actionName: 'Go Through'
  }, {
    pathName: 'Iron Door', actionName: 'Go Through'
  });
  createMutualPaths(rooms[0], rooms[2], {
    pathName: 'Shimmering Forcefield', actionName: 'Go Through'
  }, {
    pathName: 'Shimmering Forcefield', actionName: 'Go Through'
  });
};
