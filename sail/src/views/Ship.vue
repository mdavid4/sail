<template>
<div>
    <div>
        <div class="log">
            <h3> Quartermaster's Blueprint: </h3>
            <table>
                <tr>
                    <th>Money</th>
                    <td class="current">{{this.$root.$data.money}}</td>
                </tr>
                <tr>
                    <th>Cargo space</th>
                    <td class="current">{{this.$root.$data.capacity}}</td>
                    <td is="upgrade" v-for="u in this.$root.$data.upgrades.cargo" v-bind:key="u.index" v-bind:upgrade="u" />
                </tr>
                <tr>
                    <th>Sailing range:</th>
                    <td class="current">{{this.$root.$data.range}}</td>
                    <td is="upgrade" v-for="u in this.$root.$data.upgrades.range" v-bind:key="u.index" v-bind:upgrade="u" />
                </tr>
                <tr>
                    <th>Trade License:</th>
                    <td class="current">Lv. {{this.$root.$data.license}}</td>
                    <td is="upgrade" v-for="u in this.$root.$data.upgrades.license" v-bind:key="u.index" v-bind:upgrade="u" />
                </tr>
            </table>
        </div>
        <h2 class="error" v-show="showError">You can't buy that upgrade now</h2>
    </div>

    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(16,88,112,0.7" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(16,88,122,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(16,88,122,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(16,88,122)" />
        </g>
    </svg>
</div>
</template>

<script>
import upgrade from "../components/upgrade.vue";

export default {
    name: 'Home',
    data() {
        return {
            showError: false,
        }
    },
    components: {
        upgrade,
    },
    computed: {
        upgradeStatus(upgrade, index) {
            console.log(upgrade);
            console.log(index);
            return "available";
        },
        travelling() {
            return false;
        },
        population() {
            let island = this.$root.$data.islands[this.$root.$data.currentIslandID];
            return island.population_mult * island.population;
        },
        filledInventory() {
            let inventory = this.$root.$data.inventory;
            return inventory.food + inventory.lumber + inventory.ore +
                inventory.aether + inventory.luxury;
        },
        executeResult() {
            if (this.foodSell > this.$root.$data.inventory.food) {
                return "I can't sell more than I have";
            }
            if (this.foodBuy > this.$root.$data.capacity - this.filledInventory) {
                return "I can't buy more than I can hold";
            }
            let moneyAfterSell = this.$root.$data.money + this.foodSell * this.island.food;
            let moneyAfterBuy = moneyAfterSell - this.foodBuy * this.island.food;
            if (moneyAfterBuy < 0) {
                return "I don't have the money to buy all this";
            }
            return moneyAfterBuy;
        },
        canExecute() {
            if (this.foodSell > this.$root.$data.inventory.food) {
                return false;
            }
            if (this.foodBuy > this.$root.$data.capacity - this.filledInventory) {
                return false;
            }
            let moneyAfterSell = this.$root.$data.money + this.foodSell * this.island.food;
            let moneyAfterBuy = moneyAfterSell - this.foodBuy * this.island.food;
            if (moneyAfterBuy < 0) {
                return false;
            }
            return true;
        },
    },
    methods: {
        sail() {
            let nextIslandID;
            do {
                nextIslandID = Math.floor(Math.random() * this.$root.$data.islands.length);
            } while (nextIslandID === this.$root.$data.currentIslandID)
            this.$root.$data.currentIslandID = nextIslandID;
            fetch("https://api.adviceslip.com/advice")
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    advice = "Personal notes: " + json.slip.advice;
                }).then(function() {
                    document.getElementById("advice").innerHTML = "<p>" + advice + "</p>";
                });
            let advice = "";
        },
        execute() {
            if (this.canExecute) {
                this.$root.$data.inventory.food += this.foodBuy - this.foodSell;
                this.foodSell = 0, this.foodBuy = 0;
                this.$root.$data.money = parseInt(this.executeResult);
            }
        },
        foodBuyMax() {
            let maxAmountByInv = this.$root.$data.capacity - this.filledInventory;
            let maxAmountByMoney = this.$root.$data.money / this.island.food;
            this.foodBuy = Math.min(maxAmountByInv, Math.floor(maxAmountByMoney));
        },
        foodSellMax() {
            this.foodSell = this.$root.$data.inventory.food;
        },
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100%;
    background-color: #B7E8EB;
    background: radial-gradient(ellipse at center, rgba(255, 254, 234, 1) 0%, rgba(255, 254, 234, 1) 35%, #B7E8EB 100%);
}

.waves {
    position: absolute;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    bottom: 2.4em;
    min-height: 100px;
    max-height: 150px;
    left: 0px;
}

.parallax>use {
    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}

.parallax>use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}

.parallax>use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}

.parallax>use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }

    100% {
        transform: translate3d(85px, 0, 0);
    }
}

p {
    margin-top: 0.5em;
    text-align: left;
}

body {
    color: #000;
}

table,
td,
th {
    border-style: hidden;
    margin: 2px;
    padding: 2px;
    text-align: left;
}

.current {
    color: black;
    font-size: 1.2em;
    font-weight: bold;
}

.upgrade {
    flex-direction: column;
}

.available:hover {
    flex-direction: column;
    background-color: #d1a072;
}

.available:active {
    border: 2px inset grey;
}

.purchased {
    border: 2px solid grey;
}

.available {
    border: 2px outset grey;
}

.unavailable {
    border: 2px dotted grey;
}

.log,
.trade {
    overflow-x: auto;
    background-color: #c99769;
    border: #78583b 3px dotted;
    margin: 2em;
    padding: 1em;
    font-family: "Courier New", Courier, monospace;
}

.notes {
    font-family: cursive;
}

.error {
    text-shadow: 1px 1px 1px red;
}

img {
    max-width: 50%;
    height: auto;
}

.image {
    position: absolute;
    left: 30%;
    max-width: 30%;
    bottom: 4.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
}

@media (max-width: 768px) {
    .waves {
        height: 40px;
        min-height: 40px;
    }

    #goButton {
        margin-top: 10%;
        margin-bottom: 10%;
    }
}
</style>
