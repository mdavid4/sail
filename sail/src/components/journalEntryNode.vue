<template>
<span>
    <p class="journalEntryDefaultText">
        <span>{{entryNode.text}}</span>
        <span v-show="hasOptions" class="choiceSpan">
            <span v-if="oneChildAvailable" class="chosenOptionText">
                {{currentOptions[0].choice}}
            </span>
            <select v-else v-model="selectedValue" id="thisChoice" @change="choose(selectedValue)">
                <option disabled value>~choose one~</option>
                <option v-for="(option, index) in currentOptions" v-bind:key="1 + index" v-bind:value="index">{{option.choice}}</option>
            </select>
        </span>
        <span>{{entryNode.postText}}</span>
    </p>
    <journalEntryNode v-if="oneChildAvailable" v-bind:entryNode="nextNode" />
</span>
</template>

<script>
export default {
    name: 'journalEntryNode',
    props: {
        entryNode: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        if (this.entryNode.written == false) {
            this.entryNode.written = true;
            this.entryNode.write();
        }
    },
    data() {
        return {
            selectedValue: '',
        }
    },
    computed: {
        oneChildAvailable() {
            return (this.currentOptions.length == 1);
        },
        currentOptions() {
            if (this.entryNode.optionSelected == -1) {
                return this.entryNode.options.filter(option => option.isAvailable());
            } else {
                return [this.entryNode.options[this.entryNode.optionSelected]];
            }
        },
        nextNode() {
            return this.entryNode.options[this.entryNode.optionSelected];
            //AKA this.currentOptions[0]
        },
        hasOptions() {
            return this.entryNode.options.length > 0;
        }
    },
    methods: {
        choose(optionIndex) {
            console.log("choose called for index:\n" + optionIndex);
            this.entryNode.optionSelected = optionIndex;
        },
    },
}
</script>

<style>
.journalEntryDefaultText {
    margin: 1em;
    text-align: left;
    text-indent: 2em;
}

.chosenOptionText {
    font-family: cursive;
    border-top: 1px solid #78583b;
    border-bottom: 1px solid #78583b;
}
</style>
