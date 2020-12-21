<template>
<div>
    <div class="log">
        <h3>Captain's Journal :</h3>
        <button class="button" @click="previousEntry">Previous Entry</button>
        <span>{{1 + entryIndex}} / {{numberEntries}}</span>
        <button class="button" @click="nextEntry">Next Entry</button>
        <journalEntryNode v-if="currentEntry" v-bind:entryNode="currentEntry" />
    </div>
    <div v-bind="island">
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
</div>
</template>

<script>
import journalEntryNode from "../components/journalEntryNode.vue";
import goodRow from "../components/goodRow.vue";
export default {
    name: 'Island',
    data() {
        return {
            entryIndex: -1,
        }
    },
    components: {
        goodRow,
        journalEntryNode,
    },
    mounted() {
        if (this.entryIndex == -1) {
            this.entryIndex = this.$root.$data.entries.length - 1;
        }
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
        currentEntry() {
            let entryName = this.$root.$data.entries[this.entryIndex];
            if (entryName) {
                let entry = this.$root.$data.allEntries[entryName];
                return entry;
            } else {
                return null;
            }
        },
        numberEntries() {
            return this.$root.$data.entries.length;
        }
    },
    methods: {
        goodIsTradable(good, index) {
            return this.$root.$data.tradableGoods[index];
        },
        previousEntry() {
            if (this.entryIndex > 0) {
                this.entryIndex--;
            }
        },
        nextEntry() {
            if (this.entryIndex < this.$root.$data.entries.length - 1) {
                this.entryIndex++;
            }
        }
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
