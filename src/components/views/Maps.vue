<template>
<div class="app">
  <Menu :map="map" />
  <div id="map" class="map" />
  <VToolbar :controls="controls" />
  <input type="file" id="inputFile" accept=".gpx" multiple style="display:none;" />
</div>
</template>

<script>
import Map from 'ol/map'
import View from 'ol/view'
import Scaleline from 'ol/control/scaleline'
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Button from 'ol-ext/control/Button'
import Toggle from 'ol-ext/control/Toggle'
import Overlay from 'ol-ext/control/Overlay'
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

import addTracks from '@/components/ol/addtracks'

import Menu from './Menu.vue'
import VToolbar from './VToolbar.vue'
import readFiles from '@/components/ol/readfiles'

export default {
  name: 'Map',
  components: {
    Menu,
    VToolbar
  },
  data() {
    return {
      title: 'Maps',
      direction: 'vertical',
      right: true,
      drawer: false,
      map: undefined,
      controls: []
    }
  },
  computed: {
    ...mapGetters(['zoom', 'center'])
  },
  methods: {
    ...mapMutations(['addTrack'])
  },
  beforeMount: function () {
    console.log('Maps beforeMount')
  },
  mounted: function () {
    console.log('Maps mounted: ' + this.map)
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
    this.controls.forEach(control => this.map.addControl(control))
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

    const toolBar = new Toolbar({
      store: this.$store,
      map: this.map
    })

    const wrench = new Button({
      html: '<i class="fa fa-wrench"></i>',
      title: 'Toggle toolbar',
      handleClick: function () {
        toolBar.setVisible(!toolBar.getVisible())
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
    // this.map.addControl(this.map.profil)

    addTracks(this.map, this.$store.state.tracks)

    // const trackSwitcher = new TrackSwitcher()
    // this.map.addControl(trackSwitcher)

    // Menu overlay
    const menu = new Overlay({
      closeBox: true,
      className: 'slide-left menu',
      content: document.getElementById('menu')
    })
    this.map.addControl(menu)

    // A toggle control to show/hide the menu
    const menuToggle = new Toggle({
      html: '<i class="fa fa-bars"></i>',
      className: 'menu',
      title: 'Menu',
      onToggle: function () {
        menu.toggle()
      }
    })
    this.map.addControl(menuToggle)
    document.getElementById('inputTrack').onchange = readFiles({
      map: this.map,
      store: this.$store
    })
  }
}
</script>

<style lang="scss">
@import "ol/ol.css";
@import "../ol/TrackSwitcher.css";
@import "ol-ext/dist/ol-ext.css";
@import 'ol-ext/control/Search.css';
@import 'ol-ext/control/Bar.css';
@import 'ol-ext/control/LayerSwitcher.css';
.map {
    width: 100%;
    height: 100%;
    position: fixed;
}
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
    right: 4em;
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
    top: 2.5em;
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
