<template>
<div class="app">
  <Menu :map="map" />
  <div id="map" class="map" />
  <div style="display: none;">
    <input type="file" id="openFile" accept=".gpx" multiple />
    <v-btn id="export" color="primary" dark @click.native.stop="dialog = true">Open Dialog</v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <i class="fa fa-chevron-left"></i>'
          </v-btn>
          <v-toolbar-title>Select what to export:</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Export</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox v-model="tracks"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tracks</v-list-tile-title>
            <v-list-tile-sub-title>Trails</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox v-model="bookmarks"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Auto-add widgets</v-list-tile-title>
            <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox v-model="layers"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Auto-add widgets</v-list-tile-title>
            <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox v-model="settings"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Auto-add widgets</v-list-tile-title>
            <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>

<script>
import Map from 'ol/map'
import View from 'ol/view'
import Button from 'ol-ext/control/Button'
import interaction from 'ol/interaction'
import {
  mapGetters,
  mapMutations
} from 'vuex'

import layers from '@/components/layers'
import store from '@/store'

import dragAndDropInteraction from '@/components/ol/dndInteraction'
import Profil from 'ol-ext/control/Profile'
import projection from '@/assets/projection'

import addTracks from '@/components/ol/addtracks'

import Menu from './Menu.vue'
import readFiles from '@/components/ol/readfiles'
import toolbars from './toolbars'
import addControls from './controls'

export default {
  name: 'Map',
  components: {
    Menu,
  },
  data() {
    return {
      title: 'Maps',
      direction: 'vertical',
      right: true,
      map: undefined,
      dialog: false,
      sound: false,
      widgets: true,
      tracks: true,
      bookmarks: true,
      layers: false,
      settings: false,
      controls: []
    }
  },
  computed: {
    ...mapGetters(['zoom', 'center'])
  },
  methods: {
    ...mapMutations(['addTrack']),
    addButton: function (button) {
      const newButton = new Button({
        html: button.html,
        title: button.title,
        handleClick: button.handleClick
      })
      newButton.element.classList.add(button.class)
      this.map.addControl(newButton)
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

    this.map.on('moveend', function (event) {
      store.commit('setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })

    const [vBar, hBar] = toolbars(this.map, {
      saveId: 'saveFile',
      exportId: 'export'
    })
    addControls(this.map, {
      hBar,
      store
    })

    const profile = new Button({
      html: '<i class="fa fa-map-signs"></i>',
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

    document.getElementById('openFile').onchange = readFiles({
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
@import 'ol-ext/control/GeoBookmark.css';
.map {
    width: 100%;
    height: 100%;
    position: fixed;
}
.ol-menu {
    left: 0.5em;
    top: 0.5em;
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
    top: 2.5em;
    left: 6em;
}
.ol-search-options {
    position: absolute;
    top: 0.5em;
    left: 2.5em;
}
.ol-control.ol-bookmark {
    top: 0.5em;
    left: 2.5em;
}
.ol-search {
    position: absolute;
    top: 0.5em;
    left: 4.5em;
}
.ol-new-track {
    position: absolute;
    left: 0.5em;
    top: 2.5em;
}
.ol-zoom {
    left: auto;
    right: 0.5em;
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
