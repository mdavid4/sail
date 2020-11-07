<template>
<tr>
    <th>{{goodName}}</th>
    <td>${{island[goodName]}}</td>
    <td><button class="button" @click="buyMax">Max</button>
        <button class="button" @click="buyHundred">100</button>
        <button class="button" @click="buyTen">10</button>
        <button class="button" @click="buyOne">1</button>
    </td>
    <td>{{this.$root.$data.inventory[goodName]}}</td>
    <td><button class="button" @click="sellOne">1</button>
        <button class="button" @click="sellTen">10</button>
        <button class="button" @click="sellHundred">100</button>
        <button class="button" @click="sellAll">All</button>
    </td>
</tr>
</template>

<script>
console.log("test");
export default {
    name: 'goodRow',
    props: {
        island: {
            type: Object,
            required: true,
        },
        goodName: {
            type: String,
            required: true,
        },
    },
    computed: {
        filledInventory() {
            let inventory = this.$root.$data.inventory;
            return inventory.food + inventory.lumber + inventory.ore +
                inventory.aether + inventory.luxury;
        },
    },
    methods: {
        buyOne() {
            if (this.$root.$data.money > this.island[this.goodName] && this.filledInventory < this.$root.$data.capacity) {
                this.$root.$data.money -= this.island[this.goodName];
                this.$root.$data.inventory[this.goodName]++;
            }
        },
        buyTen() {
            if (this.$root.$data.money > 10 * this.island[this.goodName] && this.filledInventory + 10 <= this.$root.$data.capacity) {
                this.$root.$data.money -= 10 * this.island[this.goodName];
                this.$root.$data.inventory[this.goodName] += 10;
            }
        },
        buyHundred() {
            if (this.$root.$data.money > 100 * this.island[this.goodName] && this.filledInventory + 100 <= this.$root.$data.capacity) {
                this.$root.$data.money -= 100 * this.island[this.goodName];
                this.$root.$data.inventory[this.goodName] += 100;
            }
        },
        buyMax() {
            let maxAmountByInv = this.$root.$data.capacity - this.filledInventory;
            let maxAmountByMoney = Math.floor(this.$root.$data.money / this.island[this.goodName]);
            let max = Math.min(maxAmountByInv, maxAmountByMoney);
            if (max > 0) {
                this.$root.$data.money -= max * this.island[this.goodName];
                this.$root.$data.inventory[this.goodName] += max;
            }
        },
        sellOne() {
            if (this.$root.$data.inventory[this.goodName] >= 1) {
                this.$root.$data.money += this.island[this.goodName];
                this.$root.$data.inventory[this.goodName]--;
            }
        },
        sellTen() {
            if (this.$root.$data.inventory[this.goodName] >= 10) {
                this.$root.$data.money += 10 * this.island[this.goodName];
                this.$root.$data.inventory[this.goodName] -= 10;
            }
        },
        sellHundred() {
            if (this.$root.$data.inventory[this.goodName] >= 100) {
                this.$root.$data.money += 100 * this.island[this.goodName];
                this.$root.$data.inventory[this.goodName] -= 100;
            }
        },
        sellAll() {
            if (this.$root.$data.inventory[this.goodName] > 0) {
                this.$root.$data.money += this.$root.$data.inventory[this.goodName] * this.island[this.goodName];
                this.$root.$data.inventory[this.goodName] = 0;
            }
        },
    },
}
</script>

<style>
th,
td {
    border: 1px solid black;
    padding: 0.5em;
}

button {
    margin: 1px;
}
</style>
