export const uiSchema = [{
  name: 'Message',
  primaryKey: 'id',
  properties: {
    id: 'string',
    time: 'int',
    text: 'string'
  }
}, {
  name: 'State',
  primaryKey: 'key',
  properties: {
    key: 'string',
    targetJSON: { type: 'string', optional: true },
    playerCharacterId: { type: 'string', optional: true }
  }
}];
