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
    targetJSON: { type: 'string', optional: true },
    targetId: { type: 'string', optional: true }, // TODO remove
    playerCharacterId: { type: 'string', optional: true }
  }
}];
