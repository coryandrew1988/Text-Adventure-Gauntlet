export default (db) => {
    return {
        Build: {
            create: () => {
                return {
                    characterClassLevels: {
                        'fighter': 0,
                        'mage': 0,
                        'monk': 0,
                        'paladin': 0
                    },
                    equipmentSlots: {
                        outfit: null,
                        leftHand: null,
                        rightHand: null,
                        bothHands: null, // when equipped, removes equipment from left and right hands, and vice versa
                        relic0: null,
                        relic1: null,
                        relic2: null
                    }
                };
            }
        },
        create: () => {
            return {
                name: '',
                description: '',
                build: null,
                hp: 0,
                mp: 0,
                balance: 0,
                statusEffects: [],
                stats: {
                    maxHp: 0,
                    maxMp: 0,
                    maxBalance: 0,
                    power: 0,
                    resistance: 0
                },
                abilities: {}
            };
        },
        addCharacterClassLevel: (character, characterClassKey) => {
            const build = character.build;
            if (build == null) { return; }

            const characterClassLevels = build.characterClassLevels;
            if (characterClassLevels[characterClassKey] == null) {
                ;
            }

            const characterClass = db.find('characterClass', characterClassKey);
        }
    };
};
