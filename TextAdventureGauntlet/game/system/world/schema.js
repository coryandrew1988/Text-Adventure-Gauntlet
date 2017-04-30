// TODO index on filter fields
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
  name: 'ItemDescription',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string'
  }
}, {
  name: 'ItemDefinition',
  primaryKey: 'id',
  properties: {
    id: 'string',
    description: 'ItemDescription',
    definitionJSON: 'string'
    // definitionJSON is like {
    //   equipEffect: Effect
    //   consumeEffect: Effect
    // }
  }
}, {
  name: 'Item',
  primaryKey: 'id',
  properties: {
    id: 'string',
    definition: 'ItemDefinition',
    paramsJSON: 'string'
  }
}, {
  name: 'CharacterRaceDescription',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string'
  }
}, {
  name: 'CharacterRace',
  primaryKey: 'id',
  properties: {
    id: 'string',
    description: 'CharacterRaceDescription',
    effectJSON: 'string'
  }
}, {
  name: 'CharacterClassDescription',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string'
  }
}, {
  name: 'CharacterClassLevel',
  primaryKey: 'id',
  properties: {
    id: 'string',
    effectJSON: 'string'
  }
}, {
  name: 'CharacterClass',
  primaryKey: 'id',
  properties: {
    id: 'string',
    description: 'CharacterClassDescription',
    effectJSON: 'string'
  }
}, {
  name: 'CharacterClassProgress',
  primaryKey: 'id',
  properties: {
    id: 'string',
    characterClass: 'CharacterClass',
    level: 'int'
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
    id: 'string',
    hands: { type: 'list', objectType: 'Item' },
    head: 'Item',
    body: 'Item',
    relics: { type: 'list', objectType: 'Item' },
    characterRace: 'CharacterRace',
    characterClassProgress: 'CharacterClassProgress',
    maxHPUpgrades: 'int',
    maxMPUpgrades: 'int',
    powerUpgrades: 'int',
    resistanceUpgrades: 'int',
    relicAccessUpgrades: 'int'
  }
}, {
  name: 'CharacterDamageTypeStats',
  primaryKey: 'id',
  properties: {
    id: 'string',
    physical: { type: 'int', default: 0 },
    fire: { type: 'int', default: 0 },
    ice: { type: 'int', default: 0 },
    lightning: { type: 'int', default: 0 },
    vile: { type: 'int', default: 0 },
    holy: { type: 'int', default: 0 }
  }
}, {
  name: 'CharacterStats',
  primaryKey: 'id',
  properties: {
    id: 'string',
    build: 'CharacterBuild',
    maxHP: 'int',
    hp: 'int',
    maxBP: 'int',
    bp: 'int',
    maxMP: 'int',
    mp: 'int',
    power: 'int',
    resistance: 'int',
    accuracy: 'int',
    evasion: 'int',
    handCount: { type: 'int', default: 2 },
    relicAccess: 'int',
    damageTypePowers: 'CharacterDamageTypeStats',
    damageTypeResistances: 'CharacterDamageTypeStats',
    damageTypeImmunities: 'CharacterDamageTypeStats'
    // TODO add status effects, abilities list
  }
}, {
  name: 'CharacterActivity',
  primaryKey: 'id',
  properties: {
    id: 'string',
    character: 'Character',
    startTime: 'int',
    endTime: 'int',
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
    startTime: { type: 'int', optional: true },
    endTime: { type: 'int', optional: true }
  }
}, {
  name: 'CharacterController',
  primaryKey: 'id',
  properties: {
    id: 'string',
    aggression: 'int',
    intelligence: 'int'
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
    nextAvailableTime: { type: 'int', optional: true }, // TODO keep this inside activity once realm allows deep filters
    abilities: { type: 'list', objectType: 'Ability' },
    items: { type: 'list', objectType: 'Item' },
    controller: 'CharacterController'
  }
}];
