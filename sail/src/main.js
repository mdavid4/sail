import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from '../mockIslands.js'
import generateEntries from '../entries.js'
/*
TODO:
--trade
scarcity instead of exact price
buy/sell on map
max sets a number, which is attempted later
rebalancing

server side
--realtime
--save data on server
--log-in and accounts

redo upgrades to be block-placement

combat

--bugs
map cannot shrink while maintaining range circle size ratio
*/
let goods = ["food", "lumber", "ore", "aether", "luxury"];
//let goodCosts = [5, 25, 100, 400, 1000];

let data = {
    islands: mock,
    currentIslandID: 13,
    routesSailed: 0,
    money: 60,
    capacity: 40,
    range: 15,
    license: 0,
    tradableGoods: [true, false, false, false, false],
    inventory: {},
    entries: ["firstPage"],
    eventsQueue: [],
    isProcessingQueue: false,
    upgrades: {
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
                    data.range += this.effect;
                }
            },
            2: {
                effect: 8,
                cost: 70,
                isPurchased: false,
                activate: function() {
                    data.range += this.effect;
                }
            },
            3: {
                effect: 15,
                cost: 120,
                isPurchased: false,
                activate: function() {
                    data.range += this.effect;
                }
            },
        },
        license: {
            0: {
                effect: goods[1],
                cost: 12,
                isPurchased: false,
                activate: function() {
                    data.tradableGoods[1] = true;
                    data.license++;
                }
            },
            1: {
                effect: goods[2],
                cost: 40,
                isPurchased: false,
                activate: function() {
                    data.tradableGoods[2] = true;
                    data.license++;
                }
            },
            2: {
                effect: goods[3],
                cost: 400,
                isPurchased: false,
                activate: function() {
                    data.tradableGoods[3] = true;
                    data.license++;
                }
            },
            3: {
                effect: goods[4],
                cost: 500,
                isPurchased: false,
                activate: function() {
                    data.tradableGoods[4] = true;
                    data.license++;
                }
            },
        },
    },
}

for (let i = 0; i < goods.length; i++) {
    data.inventory[goods[i]] = 0;
}
data.goods = goods;
data.allEntries = generateEntries(data);

Vue.config.productionTip = false;

new Vue({
    router,
    data,
    render: h => h(App)
}).$mount('#app')