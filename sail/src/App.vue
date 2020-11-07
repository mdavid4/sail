<template>
<div id="app">
    <div class="page">
        <div id="nav">
            <router-link to="/">Island</router-link> |
            <router-link to="/map">Map</router-link> |
            <router-link to="/ship">Ship</router-link>
        </div>
        <router-view />
        <div class="footer">
            <p>References:</p>
            <a href="https://developers.teleport.org/api/">City API</a>
            <a href="https://api.adviceslip.com/">Advice API</a>
            <a href="https://codepen.io/csspoints/pen/WNeOEqd">Waves starting point</a>
            <a href="https://imgbin.com/png/gedqrQPm/sail-drawing-png">Boat image</a>
            <a href="https://github.com/mdavid4/sail.git">Github</a>
        </div>
    </div>
</div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
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
    min-height: 100px;
    max-height: 150px;
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
</style>
