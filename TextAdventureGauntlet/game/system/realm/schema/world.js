export const worldSchema = [{
  name: 'Ability',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    effectJSON: 'string'
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
  name: 'Character',
  primaryKey: 'id',
  properties: {
    id: 'string',
    //room: 'Room',
    description: 'CharacterDescription',
    stats: 'CharacterStats',
    activity: 'CharacterActivity'
  }
}];
