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
        <button class="button" @click="forceProcessQueue">Process Queue Now</button>
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
                return this.$root.$data.islands[this.islandHovered];
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
                this.drawLine(this.islandAt, this.islandFocused);
                this.$root.$data.currentIslandID = this.islandFocused.id;
                //this.getEntry(this.islandFocused);
                this.$root.$data.routesSailed++;
                this.islandAt.timesVisited++;
                this.evaluateEntries();
            } else {
                this.showError = true;
                setTimeout(() => this.showError = false, 2000);
            }

        },
        drawLine(island1, island2) {
            let parent = document.getElementsByClassName("noOverflow")[0];
            let line = document.createElement("div");
            line.className = "line";
            line.style.width = this.distance(island1, island2) * this.rangeDisplayMult / 2000 + "em";
            line.style.left = island1.long + "%";
            line.style.bottom = island1.lat + "%";
            let degrees = -90 + Math.atan2(island2.long - island1.long, island2.lat - island1.lat) * 180 / Math.PI;
            line.style.transform = "rotate(" + degrees + "deg)";
            parent.appendChild(line);
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
        evaluateEntries() {
            let entriesGainedToday = 0;
            if (this.$root.$data.routesSailed == 1 && this.$root.$data.allEntries["firstSail"].queued == false) {
                entriesGainedToday++;
                this.queueEntry("firstSail");
            }
            if (this.$root.$data.islands[13].timesVisited == 1 && this.$root.$data.allEntries["firstTownie"].queued == false) {
                entriesGainedToday++;
                this.queueEntry("firstTownie");
            }
            if (entriesGainedToday == 0) {
                console.log("no entries from this leg of journey");
            }
        },
        makeQueueEvent() {
            let thisEvent = {
                city: this.islandAt,
                //TODO: include at-ocean, and other details
            }
            return thisEvent;
        },
        queueEntry(entryName) {
            let entry = this.makeQueueEvent();
            this.$root.$data.allEntries[entryName].queued = true;
            entry.eventType = "entry";
            entry.title = entryName;
            console.log("queueing " + entryName);
            this.$root.$data.eventsQueue.push(entry);
        },
        queueBuy(goodIndex, goodQuantity) {
            let trade = this.makeQueueEvent();
            trade.eventType = "entry";
            trade.goodI = goodIndex;
            trade.quantity = goodQuantity;
            console.log(trade);
            this.$root.$data.eventsQueue.push(trade);
        },
        queueSell(goodIndex, goodQuantity) {
            let trade = this.makeQueueEvent();
            trade.eventType = "entry";
            trade.goodI = goodIndex;
            trade.quantity = -goodQuantity;
            console.log(trade);
            this.$root.$data.eventsQueue.push(trade);
        },
        forceProcessQueue() {
            this.$router.push({
                path: `/process`
            });
        },
        /*getEntry(island) {
            let journal = "<h3>Captain's Log:</h3>" + '<div class="results"> <p> Today we visited <strong> ' +
                island.name_1 + " " + island.name_2 + "</strong></p> <p> coordinates: " +
                island.lat + "," + island.long + " </p> <p> Mayor: " +
                island.mayor + " < /p> <p> Population: " + island.population_mult * island.population +
                '</p> </div > <div class = "notes"><p> ' +
                island.text + ' </p> </div> ';
            this.$root.$data.entries.push(journal);
        }*/
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

.noOverflow>>>.line {
    position: absolute;
    border-top: 1px solid black;
    transform-origin: 0% 0%;
    height: 0px;
    pointer-events: none;
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
