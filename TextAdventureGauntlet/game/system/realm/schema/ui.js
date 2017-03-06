export const uiSchema = [{
  name: 'Message',
  primaryKey: 'id',
  properties: {
    id: 'string',
    time: 'date',
    text: 'string'
  }
}, {
  name: 'State',
  primaryKey: 'key',
  properties: {
    key: 'string',
    targetId: { type: 'string', optional: true },
    playerCharacterId: { type: 'string', optional: true }
  }
}];
