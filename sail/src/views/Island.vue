<template>
<div>
    <div v-bind="island">
        <div class="log">
            <h3> Captain's Log: </h3>
            <div id="results">
                <p>Today we're visiting <strong>{{island.name_1}} {{island.name_2}}</strong></p>
                <p>latitude: {{island.lat}}, {{island.long}}</p>
                <p>Mayor: {{island.mayor}}</p>
                <p>Population: {{population}}</p>
            </div>
            <div id="advice" class="notes">
            </div>
        </div>
        <div class="trade">
            <h3> Merchant's Tally : </h3>
            <p>Money: {{this.$root.$data.money}}</p>
            <p>Inventory: {{filledInventory}}/{{this.$root.$data.capacity}}</p>
            <table>
                <tr>
                    <th>Good</th>
                    <th>Local Price</th>
                    <th>Buy</th>
                    <th>Amount Owned</th>
                    <th>Sell</th>
                </tr>
                <tr is="goodRow" v-for="(good,index) in tradableGoods" v-bind:key="index" v-bind:goodName="good" v-bind:island="island" />
            </table>
        </div>
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
import goodRow from "../components/goodRow.vue";

export default {
    name: 'Island',
    components: {
        goodRow,
    },
    computed: {
        island() {
            return this.$root.$data.islands[this.$root.$data.currentIslandID];
        },
        tradableGoods() {
            return this.$root.$data.goods.filter(this.goodIsTradable);
        },
        population() {
            let island = this.$root.$data.islands[this.$root.$data.currentIslandID];
            return island.population_mult * island.population;
        },
    },
    methods: {
        goodIsTradable(good, index) {
            console.log(index);
            return this.$root.$data.tradableGoods[index];
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

th,
td {
    border: 1px solid black;
    padding: 0.5em;
}

table {
    border-collapse: collapse;
    border-style: hidden;
}

input {
    max-width: 5em;
}

.inputCell {
    display: flex;

    border-bottom: none;
    border-left: none;
    border-right: none;
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
