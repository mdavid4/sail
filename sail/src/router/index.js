import Vue from 'vue'
import VueRouter from 'vue-router'
import Island from '../views/Island.vue'
import Map from '../views/Map.vue'
import Ship from '../views/Ship.vue'
import Process from '../views/process.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Island',
        component: Island
    },
    {
        path: '/map',
        name: 'Map',
        component: Map
    },
    {
        path: '/ship',
        name: 'Ship',
        component: Ship
    },
    {
        path: '/process',
        name: 'Process',
        component: Process
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router