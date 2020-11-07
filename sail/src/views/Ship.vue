<template>
<div class="ship">
    <h3> Quartermaster's Blueprint: </h3>
    <table>
        <tr>
            <th>Money</th>
            <td class="current">${{this.$root.$data.money}}</td>
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
</template>

<script>
import upgrade from "../components/upgrade.vue";

export default {
    name: 'Home',
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
    }
}
</script>

<style scoped>
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
    border: 2px solid #a98759;
}

.available {
    border: 2px outset grey;
    color: black;
}

.unavailable {
    border: 2px dotted #a98759;
}

.ship {
    overflow-x: auto;
    background-color: #c99769;
    border: #78583b 3px dotted;
    margin: 2em;
    padding: 1em;
    font-family: "Courier New", Courier, monospace;
}
</style>
