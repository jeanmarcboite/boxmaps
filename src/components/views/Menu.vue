<template>
<div id="menu">
  <h1>Menu</h1>
  <p style="border-bottom:1px solid #999;">
    <i>ol.control.Overlay</i> can be used to display a menu or information on the top of the map.
  </p>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
      <div slot="header">Item
        </v-icon>
      </div>
      <v-card>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  <div class="data"></div>
</div>
</template>
<script>
export default {
  name: 'Menu',
  data() {
    return {
      title: 'Menu',
    }
  },
}
</script>

<style>
.ol-overlay.menu {
  width: 30%;
  background: #fff;
  color: #333;
  box-shadow: 0 0 5px #000;
  padding: 0.5em;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}

/* style the close box */

.ol-overlay.menu .ol-closebox {
  color: #369;
  left: 1em;
  top: 0.5em;
}

.ol-overlay.menu .ol-closebox:before {
  content: "\f0c9";
  font-family: FontAwesome;
}

#menu {
  padding-top: 1.5em;
  font-size: 0.9em;
}

/* menu button */

.ol-control.menu {
  top: 0.5em;
  left: 0.5em;
}

.ol-control.menu i {
  color: #fff;
}

.ol-zoom {
  left: auto;
  right: 1.5em;
}

.ol-rotate {
  right: 3em;
}

.ol-touch .ol-rotate {
  right: 3.5em;
}

/**/

.ol-overlay img {
  max-width: 90%;
}

.data,
.data p {
  margin: 0;
  text-align: center;
  font-size: 0.9em;
}
</style>
