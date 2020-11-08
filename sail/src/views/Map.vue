<template>
<div class="middleAligner">
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
</div>
</template>

<script>
export default {
    name: 'Map',
    data() {
        return {
            hover: false,
            islandHovered: -1,
            rangeDisplayMult: 770,
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
.center {
    position: absolute;
    display: block;
}

td {
    border: 1px dashed #78583b;
    align-items: left;
    spacing: 0px;
    margin: 0px;
}

table {
    border-collapse: collapse;
    border-style: hidden;
    spacing: 0px;
    margin: 0px;
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
    width: 650px;
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

.middleAligner {
    display: flex;
    justify-content: center;
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

.measuringStick {
    height: 0.1em;
    width: 0.1em;
}
</style>
