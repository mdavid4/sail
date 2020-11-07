<template>
<div>
    <div class="map">
        <div class="noOverflow">
            <div class="center" v-for="island in this.$root.$data.islands" :key="island.id" v-bind:style="{ left: island.long + '%', bottom: island.lat + '%' }">
                <div :class="outlineClass(island)" class="islandPoint" @click="attemptSailTo" @mouseover="hover = true, islandHovered = island.id" @mouseleave="hover = false, islandHovered = -1" />
            </div>
            <div class="center" v-bind:style="{ left: locationLeft + '%', bottom: locationBottom + '%' }">
                <div class="marker" />
                <div class="measuringStick">
                    <div class="range" v-bind:style="{ width: range + '%', height: range + '%', left: -range/2 + '%', bottom: -range/2 + '%' }" />
                </div>
            </div>
            <div class="spaceMaker" />
        </div>
        <div class="center" v-bind:style="{ left: islandFocused.long + '%', bottom: islandFocused.lat + '%' }">
            <div v-show="hover" class="islandHover">
                <p>{{islandFocused.name_1}} {{islandFocused.name_2}}</p>
                <table>
                    <tr v-for="(good, index) in tradableGoods" v-bind:key="index">
                        <td>{{good}}</td>
                        <td>${{islandFocused[good]}}</td>
                    </tr>
                </table>
            </div>
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
export default {
    name: 'Map',
    data() {
        return {
            hover: false,
            islandHovered: -1,
            rangeDisplayMult: 870,
        }
    },
    computed: {
        islandAt() {
            return this.$root.$data.islands[this.$root.$data.currentIslandID];
        },
        islandFocused() {
            if (this.hover == true) {
                return this.$root.$data.islands[this.islandHovered - 1];
            } else return 0;
        },
        locationLeft() {
            return this.islandAt.long;
        },
        locationBottom() {
            return this.islandAt.lat;
        },
        range() {
            return this.rangeDisplayMult * this.$root.$data.range;
        },
        tradableGoods() {
            return this.$root.$data.goods.filter(this.goodIsTradable);
        },
    },
    methods: {
        distance(island1, island2) {
            let xDif = island1.long - island2.long;
            let yDif = island1.lat - island2.lat;
            return Math.sqrt(xDif * xDif + yDif * yDif);
        },
        attemptSailTo() {
            let distance = this.distance(this.islandAt, this.islandFocused);
            if (distance < this.$root.$data.range) {
                this.$root.$data.currentIslandID = this.islandFocused.id - 1;
            } else {
                this.showError = true;
                setTimeout(() => this.showError = false, 2000);
            }
        },
        goodIsTradable(good, index) {
            return this.$root.$data.tradableGoods[index];
        },
        outlineClass(island) {
            if (this.distance(island, this.islandAt) < this.$root.$data.range) {
                return {
                    cantReach: false,
                    canReach: true,
                }
            } else {
                return {
                    cantReach: true,
                    canReach: false,
                }
            }
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

#goButton {
    padding: 1em;
    border-radius: 1em;
    border: 2px yellow dashed;
    font-size: 2em;
    margin: 1em;
    background-color: #f0f7d7;
}

#goButton:hover {
    background-color: #fff;
}

body {
    color: #000;
}

th,
td {
    border: 1px solid #78583b;
    padding: 0.1em;
}

table {
    border-collapse: collapse;
    border-style: hidden;
}

.center {
    position: absolute;
    display: block;
}

.islandPoint {
    height: 1em;
    width: 1em;
    border-radius: 1em;
    background-color: black;
    position: absolute;
    left: -0.5em;
    bottom: -0.5em;
}

.canReach:hover {
    border: 5px outset blue;
}

.cantReach:hover {
    border: 5px outset red;
}

.islandHover {
    background-color: #c99769;
    border: #78583b 3px dotted;
    position: absolute;
    left: 1.2em;
    bottom: -1.5em;
}

.noOverflow {
    overflow: hidden;
    position: relative;
}

.spaceMaker {
    padding-bottom: 100%;
}

.map {
    background-color: #c99769;
    border: #78583b 3px dotted;
    margin: 2em;
    font-family: "Courier New", Courier, monospace;
    height: 50%;
    position: relative;
    width: 700px;
}

.marker {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 18px solid #00f;
    position: absolute;
    left: -6px;
    bottom: 0.6em;
}

.range {
    width: 10em;
    height: 10em;
    border-radius: 10000em;
    position: absolute;
    border: 1px dashed green;
    left: -5em;
    bottom: -5em;
    pointer-events: none;
}

.notes {
    font-family: cursive;
}

.error {
    text-shadow: 1px 1px 1px red;
    pointer-events: none;
}

.measuringStick {
    height: 0.1em;
    width: 0.1em;
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
