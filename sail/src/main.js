import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from '../mockIslands.js'
/*
TODO:
-allow map to shrink while maintaining range circle size ratio
*/
let goods = ["food", "lumber", "ore", "aether", "luxury"]

let data = {
    islands: mock,
    currentIslandID: 13,
    money: 10000,
    capacity: 40,
    range: 15,
    license: 0,
    tradableGoods: [true, false, false, false, false],
    inventory: {},
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

Vue.config.productionTip = false

new Vue({
    router,
    data,
    render: h => h(App)
}).$mount('#app')