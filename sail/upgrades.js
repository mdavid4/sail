let upgradeList = {
    cargo: {
        0: {
            effect: 40,
            cost: 60,
            isPurchased: false,
            activate: function() {
                data.capacity += this.effect;
            }
        },
        1: {
            effect: 80,
            cost: 120,
            isPurchased: false,
            activate: function() {
                data.capacity += this.effect;
            }
        },
        2: {
            effect: 120,
            cost: 220,
            isPurchased: false,
            activate: function() {
                data.capacity += this.effect;
            }
        },
        3: {
            effect: 220,
            cost: 500,
            isPurchased: false,
            activate: function() {
                data.capacity += this.effect;
            }
        },
    },
    range: {
        0: {
            effect: 5,
            cost: 20,
            isPurchased: false,
            activate: function() {
                data.range += this.effect;
            }
        },
        1: {
            effect: 7,
            cost: 40,
            isPurchased: false,
            activate: function() {
                this.$root.$data.range += this.effect;
            }
        },
        2: {
            effect: 8,
            cost: 70,
            isPurchased: false,
            activate: function() {
                this.$root.$data.range += this.effect;
            }
        },
        3: {
            effect: 15,
            cost: 120,
            isPurchased: false,
            activate: function() {
                this.$root.$data.range += this.effect;
            }
        },
    },
    license: {
        0: {
            effect: "lumber",
            cost: 12,
            isPurchased: false,
            activate: function() {
                this.$root.$data.license = "novice";
                this.$root.$data.tradableGoods[1] = true;
            }
        },
        1: {
            effect: "ore",
            cost: 40,
            isPurchased: false,
            activate: function() {
                this.$root.$data.license = "intermediate";
                this.$root.$data.tradableGoods[2] = true;
            }
        },
        2: {
            effect: "aether",
            cost: 400,
            isPurchased: false,
            activate: function() {
                this.$root.$data.license = "adept";
                this.$root.$data.tradableGoods[3] = true;
            }
        },
        3: {
            effect: "luxury",
            cost: 500,
            isPurchased: false,
            activate: function() {
                this.$root.$data.license = "master";
                this.$root.$data.tradableGoods[4] = true;
            }
        },
    },
}
export default upgradeList;