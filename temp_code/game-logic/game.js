const Game = {
    create: () => {
        return {
            timeOffset: 0,
            pausedTime: null,
            eventQueue: [],
            messages: []
        };
    },
    getTime: (game) => {
        if (game.pausedTime != null) {
            return game.pausedTime + game.timeOffset;
        }

        return Date.now() + game.timeOffset;
    },
    pause: (game) => {
        if (game.pausedTime != null) { return; }

        game.pausedTime = Date.now();
    },
    unpause: (game) => {
        if (game.pausedTime == null) { return; }

        game.timeOffset -= Date.now() - game.pausedTime;
        game.pausedTime = null;
    },
    update: (game) => {
        const now = Game.getTime(game);


    },
    emitMessage: (game, message) => {
        game.messages.push(message);
    }
};
