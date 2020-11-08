<template>
<div v-bind="island">
    <div class="log">
        <h3>Captain's Log:</h3>
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
        <h3>Merchant's Tally :</h3>
        <p class="current">Money: ${{this.$root.$data.money}}</p>
        <p class="current">Inventory: {{filledInventory}}/{{this.$root.$data.capacity}}</p>
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
        filledInventory() {
            let inventory = this.$root.$data.inventory;
            return Object.keys(inventory).reduce((sum, key) => sum + parseFloat(inventory[key] || 0), 0);
        },
    },
    methods: {
        goodIsTradable(good, index) {
            return this.$root.$data.tradableGoods[index];
        },
    }
}
</script>

<style scoped>
p {
    margin-top: 0.5em;
    text-align: left;
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

.current {
    color: black;
    font-size: 1.2em;
    font-weight: bold;
}
</style>
