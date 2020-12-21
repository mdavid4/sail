<template>
<div class="log">
    <h3>Processing Queue :</h3>
    <journalEntryNode v-if="currentEntry" v-bind:entryNode="currentEntry" />
    <button v-show="entryProcessed" @click="nextEntry">Next Entry</button>
</div>
</template>

<script>
import journalEntryNode from "../components/journalEntryNode.vue";
export default {
    name: 'Process',
    computed: {
        currentEntry() {
            if (this.$root.$data.eventsQueue.length > 0) {
                let entry = this.$root.$data.allEntries[this.$root.$data.eventsQueue[0].title];
                if (entry == undefined) {
                    console.log("process.vue: No entries of this name were found");
                    return null;
                } else {
                    return entry;
                }
            } else {
                console.log("process.vue: No entries remain in queue");
                return null;
            }
        },
        isEntryType() {
            return this.currentEntry.eventType == "entry";
        },
        entryProcessed() {
            let entryAtThisLevel = this.currentEntry;
            while (entryAtThisLevel.options.length > 0) {
                if (entryAtThisLevel.optionSelected < 0) {
                    return false;
                }
                entryAtThisLevel = entryAtThisLevel.options[entryAtThisLevel.optionSelected];
            }
            return true;
        },
    },
    components: {
        journalEntryNode,
    },
    methods: {
        nextEntry() {
            if (this.$root.$data.eventsQueue.length > 0) {
                this.$root.$data.entries.push(this.$root.$data.eventsQueue[0].title);
                this.$root.$data.eventsQueue.shift();
            }
            if (this.$root.$data.eventsQueue.length == 0) {
                console.log(this.$router);
                this.$router.push({
                    path: `/map`,
                });
            }
        }
        /*left-over code:
        let queue = this.$root.$data.eventsQueue;
        //count event types and totals
        let numEntries = 0;
        let numTrades = 0;
        for (let i = 0; i < queue.length; i++) {
        	if (queue[i].eventType == "entry") {
        		numEntries++;
        	} else if (queue[i].eventType == "trade") {
        		numTrades++;
        	}
        }
        console.log("Processing Queue... Entries: " + numEntries + " | Trades: " + numTrades);
        //process them in cronological order
        while (queue.length > 0) {
        	let thisEvent = queue[0];
        	if (thisEvent.eventType == "entry") {
        		this.$root.$data.isProcessVisible = true;
        	} else if (thisEvent.eventType == "trade") {
        		//TO-DO: process trade
        	}
        }
        */
    },
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
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
</style>
