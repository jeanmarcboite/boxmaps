<template>
<div class="app">
  <input type="file" id="inputFile" accept=".gpx" multiple style="display:none;" />
  <div id="map" class="map" />
  <v-navigation-drawer temporary :right="right" v-model="drawer" fixed app>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
        <div slot="header">Item</div>
        <v-card>
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </v-navigation-drawer>
</div>
</template>

<script>
import Map from 'ol/map'
import View from 'ol/view'
import Scaleline from 'ol/control/scaleline'
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Button from 'ol-ext/control/Button'
import interaction from 'ol/interaction'
import {
  mapGetters
} from 'vuex'

import layers from '@/components/layers'
import store from '@/store'

import dragAndDropInteraction from '@/components/ol/dndInteraction'
import Toolbar from '@/components/ol/toolbar'
import Profil from 'ol-ext/control/Profile'
export default {
  name: 'Map',
  data() {
    return {
      title: 'Maps',
      direction: 'vertical',
      right: true,
      drawer: false
    }
  },
  computed: {
    ...mapGetters(['zoom', 'center'])
  },
  mounted: function () {
    const this_ = this
    const map = new Map({
      interactions: interaction.defaults().extend([dragAndDropInteraction]),
      layers,
      target: 'map',
      view: new View({
        center: this.center,
        zoom: this.zoom
      })
    })
    map.addControl(new Scaleline())
    map.addControl(new LayerSwitcher({
      trash: true
    }))
    const search = new SearchNominatim()
    search.on('select', function (e) {
      map.getView().animate({
        center: e.coordinate,
        zoom: Math.max(map.getView().getZoom(), 13)
      })
    })
    map.addControl(search)
    map.on('moveend', function (event) {
      store.commit('setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })

    const toolBar = new Toolbar(map)

    const wrench = new Button({
      html: '<i class="fa fa-wrench"></i>',
      title: 'Toggle toolbar',
      handleClick: function () {
        toolBar.setVisible(!toolBar.getVisible())
      }
    })
    wrench.element.classList.add('ol-wrench')
    map.addControl(wrench)

    const profile = new Button({
      html: '<i class="fa fa-bars"></i>',
      title: 'Toggle toolbar',
      handleClick: function () {
        this_.drawer = true
      }
    })
    profile.element.classList.add('ol-profile')

    map.addControl(profile)
    // New profil outside the map
    map.profil = new Profil({
      target: 'profil',
      width: 400,
      height: 200
    })
    map.addControl(map.profil)
  }
}
</script>

<style lang="scss">
@import "ol/ol.css";
@import "ol-ext/dist/ol-ext.css";
@import 'ol-ext/control/Search.css';
@import 'ol-ext/control/Bar.css';
@import 'ol-ext/control/LayerSwitcher.css';
.ol-control.ol-layerswitcher {
    left: 0.5em;
    right: auto;
    top: 6em;
}

.ol-layerswitcher button {
    float: left;
}

/* Bar style */
.ol-control.ol-bar {
    top: 0.5em;
    left: 6em;
}
.ol-search {
    position: absolute;
    top: 2.5em;
    left: 2.7em;
}
.ol-wrench {
    position: absolute;
    left: 0.5em;
    top: 4em;
}
.ol-profile {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
}
@import 'ol-ext/control/Profil.css';
.ol-profil .ol-profilbar,
.ol-profil .ol-profilcursor:before {
    background: blue;
}
</style>
