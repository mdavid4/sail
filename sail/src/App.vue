<template>
<div id="app">
    <div class="page">
        <div v-show="canNavigate" id="nav">
            <router-link to="/">Island</router-link> |
            <router-link to="/map">Map</router-link> |
            <router-link to="/ship">Ship</router-link>
        </div>
        <router-view />
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
        <div class="footer">
            <p>References:</p>
            <a href="https://codepen.io/csspoints/pen/WNeOEqd">CSS Waves tutorial</a>
            <a href="https://github.com/mdavid4/sail.git">This project's Github</a>
            <a href="http://skyrates.net/">Inspired by Skyrates</a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'app',
    computed: {
        canNavigate() {
            return !this.$root.$data.isProcessingQueue;
        }
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #000;
}

#nav a.router-link-exact-active {
    color: #52a3e9;
}

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
    min-height: 70px;
    max-height: 90px;
    left: 0px;
}

.footer {
    display: flex;
    justify-content: space-between;
    background-color: #015871;
    padding: 2px 0.5em;
    bottom: 0px;
    position: fixed;
    width: 100%;
    height: 2em;
}

.page {
    position: relative;
    min-height: 100vh;
    padding-bottom: 2.5em;
}

.footer a,
.footer p {
    margin-top: 0.5em;
    color: coral;
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

@media (max-height: 910px) {
    .waves {
        height: 30px;
        min-height: 30px;
    }

    #goButton {
        margin-top: 10%;
        margin-bottom: 10%;
    }
}
</style>
