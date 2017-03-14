export const worldSchema = [{
  name: 'Ability',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    effectJSON: 'string'
  }
}, {
  name: 'RoomDescription',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string'
  }
}, {
  name: 'Room',
  primaryKey: 'id',
  properties: {
    id: 'string',
    description: 'RoomDescription'
  }
  // TODO items, recurring effects, status effects
}, {
  name: 'FixtureDescription',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string'
  }
}, {
  name: 'FixtureAction',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    effectJSON: 'string'
    // TODO add visibility constraints (ie, fixture state)
  }
}, {
  name: 'Fixture',
  primaryKey: 'id',
  properties: {
    id: 'string',
    room: 'Room',
    description: 'FixtureDescription',
    state: { type: 'string', optional: true },
    actions: { type: 'list', objectType: 'FixtureAction' }
  }
}, {
  name: 'CharacterDescription',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string'
    // TODO include other info usable for rendering descriptions
  }
}, {
  name: 'CharacterBuild',
  primaryKey: 'id',
  properties: {
    id: 'string'
  }
}, {
  name: 'CharacterStats',
  primaryKey: 'id',
  properties: {
    id: 'string',
    build: 'CharacterBuild',
    maxHP: 'int',
    hp: 'int',
    maxMP: 'int',
    mp: 'int',
    maxBP: 'int',
    bp: 'int',
    power: 'int',
    resistance: 'int',
    accuracy: 'int',
    evasion: 'int'
    // TODO add status effects, abilities list
  }
}, {
  name: 'CharacterActivity',
  primaryKey: 'id',
  properties: {
    id: 'string',
    character: 'Character',
    startTime: 'date',
    endTime: 'date',
    ability: 'Ability'
  }
}, {
  name: 'CharacterStatusEffect',
  primaryKey: 'id',
  properties: {
    id: 'string',
    key: 'string',
    character: 'Character',
    paramsJSON: 'string',
    startTime: { type: 'date', optional: true },
    endTime: { type: 'date', optional: true }
  }
}, {
  name: 'Character',
  primaryKey: 'id',
  properties: {
    id: 'string',
    priority: { type: 'int', optional: true },
    room: 'Room',
    description: 'CharacterDescription',
    stats: 'CharacterStats',
    activity: 'CharacterActivity',
    abilities: { type: 'list', objectType: 'Ability' }
  }
}];
