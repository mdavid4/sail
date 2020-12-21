function generateEntries(data) {
    return {
        firstPage: {
            text: "I like to idea of writing my thoughts down. Now that I've decided upon this journal, I can look at my Map and choose an island to sail to. Sailing takes real time, of course- Importance takes time, after all!",
            optionSelected: -1,
            options: [],
            written: false,
            queued: false,
            isAvailable: function() {
                return true;
            },
            write: function() {},
        },
        firstSail: {
            text: "I set sail for the first time today.",
            optionSelected: -1,
            options: [],
            written: false,
            queued: false,
            isAvailable: function() {
                return true;
            },
            write: function() {},
        },
        firstTownie: {
            text: "I gave myself ",
            postText: " to spend on souveniers.",
            optionSelected: -1,
            options: [{
                    choice: "10 gold",
                    text: "I bought a nice mug from which to drink cocoa.",
                    optionSelected: -1,
                    options: [],
                    written: false,
                    isAvailable: function() {
                        return data.money >= 10;
                    },
                    write: function() {
                        data.money -= 10;
                    }
                },
                {
                    choice: "30 gold",
                    text: "I bought a neat letter opener shaped like a narwal.",
                    optionSelected: -1,
                    options: [],
                    written: false,
                    isAvailable: function() {
                        return data.money >= 30;
                    },
                    write: function() {
                        data.money -= 30;
                    }
                },
                {
                    choice: "120 gold",
                    text: "I bought a katana. Schling! Swoosh.",
                    optionSelected: -1,
                    options: [],
                    written: false,
                    isAvailable: function() {
                        return data.money >= 120;
                    },
                    write: function() {
                        data.money -= 120;
                    }
                },
            ],
            written: false,
            queued: false,
            isAvailable: function() {
                return true;
            },
            write: function() {},
        },
    };
}

export default generateEntries;