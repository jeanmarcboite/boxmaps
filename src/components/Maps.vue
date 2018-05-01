<template>
<div class="app">
  <input type="file" id="inputFile" accept=".gpx" multiple style="display:none;" />
  <div id="map" class="map" />
  <v-navigation-drawer temporary :right="right" v-model="drawer" fixed app>
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
  mapGetters,
  mapMutations
} from 'vuex'

import layers from '@/components/layers'
import store from '@/store'
import GPX from 'ol/format/gpx'

import dragAndDropInteraction from '@/components/ol/dndInteraction'
import Toolbar from '@/components/ol/toolbar'
import Profil from 'ol-ext/control/Profile'
import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'
import TrackSwitcher from '@/components/ol/TrackSwitcher'
import projection from '@/assets/projection'

function storeFeatures(layer, store) {
  var writer = new GPX()
  store.commit('addGPX', {
    title: layer.get('title'),
    gpx: writer.writeFeatures(layer.getSource().getFeatures(), projection)
  })
  return 'stored'
}

function storeLayer(layer, store) {
  if (layer instanceof Group) {
    console.log('Group: ', layer.get('title'))
    storeLayers(layer, store)
  } else {
    console.log(layer.get('title'))
    if (layer instanceof VectorLayer) {
      console.log(storeFeatures(layer, store))
    }
  }
}

function storeLayers(map, store) {
  map.getLayers().forEach(g => storeLayer(g, store))
}

export default {
  name: 'Map',
  data() {
    return {
      title: 'Maps',
      direction: 'vertical',
      right: true,
      drawer: false,
      map: undefined
    }
  },
  computed: {
    ...mapGetters(['zoom', 'center'])
  },
  methods: {
    storeLayers: function () {
      console.log(this.map)
      storeLayers(this.map, this.$store)
    }
  },
  mounted: function () {
    const this_ = this
    this.map = new Map({
      interactions: interaction.defaults().extend([dragAndDropInteraction]),
      layers,
      target: 'map',
      view: new View({
        center: this.center,
        zoom: this.zoom
      })
    })
    this.map.addControl(new Scaleline())

    this.map.addControl(new LayerSwitcher({
      trash: true,
      extent: true
    }))

    const search = new SearchNominatim()
    search.on('select', function (e) {
      this_.map.getView().animate({
        center: e.coordinate,
        zoom: Math.max(this_.map.getView().getZoom(), 13)
      })
    })
    this.map.addControl(search)
    this.map.on('moveend', function (event) {
      store.commit('setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })

    const toolBar = new Toolbar(this.map)

    const wrench = new Button({
      html: '<i class="fa fa-wrench"></i>',
      title: 'Toggle toolbar',
      handleClick: function () {
        // toolBar.setVisible(!toolBar.getVisible())
        this_.storeLayers()
      }
    })
    wrench.element.classList.add('ol-wrench')
    this.map.addControl(wrench)

    const profile = new Button({
      html: '<i class="fa fas fa-map-signs"></i>',
      // html: '<i class="fa fa-bars"></i>',
      title: 'Toggle toolbar',
      handleClick: function (event) {
        console.log(this_.drawer)
        event.preventDefault()
        event.stopPropagation()

        storeLayers()
      }
    })
    profile.element.classList.add('ol-profile')

    // this.map.addControl(profile)
    // New profil outside the map
    this.map.profil = new Profil({
      target: 'profil',
      width: 400,
      height: 200
    })
    this.map.addControl(this.map.profil)

    const trackSwitcher = new TrackSwitcher()
    this.map.addControl(trackSwitcher)
  }
}
</script>

<style lang="scss">
@import "ol/ol.css";
@import "./ol/TrackSwitcher.css";
@import "ol-ext/dist/ol-ext.css";
@import 'ol-ext/control/Search.css';
@import 'ol-ext/control/Bar.css';
@import 'ol-ext/control/LayerSwitcher.css';
.ol-control.ol-layerswitcher-no {
    left: 0.5em;
    right: auto;
    top: 6em;
}

.ol-layerswitcher-no button {
    float: left;
}
.ol-control.ol-layerswitcher {
    top: 0.5em;
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
    top: 4em;
    right: 0.5em;
}
@import 'ol-ext/control/Profil.css';
.ol-profil .ol-profilbar,
.ol-profil .ol-profilcursor:before {
    background: blue;
}
.custom-icon,
.v-icon {
    width: 12px;
}
</style>
