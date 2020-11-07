<template>
<td :class="upgradeStatusObject" v-on:click="attemptPurchase">
    <p>+{{upgrade.effect}}</p>
    <p class="i">${{upgrade.cost}}</p>
</td>
</template>

<script>
export default {
    name: 'upgrade',
    props: {
        upgrade: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isPurchased: false,
            isAvailable: false,
            isUnavailable: false,
        };
    },
    computed: {
        upgradeIsAvailable() {
            return !this.upgrade.isPurchased && (this.upgrade.cost <= this.$root.$data.money);
        },
        upgradeStatusObject() {
            return {
                upgrade: true,
                purchased: this.upgrade.isPurchased,
                available: this.upgradeIsAvailable,
                unavailable: !this.upgrade.isPurchased && !this.upgradeIsAvailable,
            }
        },
    },
    methods: {
        attemptPurchase() {
            if (this.upgradeIsAvailable) {
                this.upgrade.isPurchased = true;
                this.$root.$data.money -= this.upgrade.cost;
                this.upgrade.activate();
            }
        }
    }
}
</script>

<style>
.i {
    font-size: 0.8em;
    text-align: center;
}
</style>
