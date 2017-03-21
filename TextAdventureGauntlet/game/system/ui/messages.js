export const createMessageSystem = (realm) => {
  const templateMap = new Map();

  return {
    // TODO stop keeping messages in realm?
    create: text => realm.create('Message', {
      id: Date.now() + '' + Math.random(),
      time: Date.now(), // TODO tie this to the game clock?
      text
    }),
    getAll: () => {
      return realm.objects('Message').sorted('time');
    },
    defineTemplate: (template, render) => {
      templateMap.set(template, render);
    },
    render: (template, data) => {
      const render = templateMap.get(template);
      if (!render) {
        // TODO throw
        return `${template} was missing, data: ${JSON.stringify(data, null, 2)}`;
      }

      return render(data);
    }
  };
};
