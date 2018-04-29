<template>
<div class="app">
  <Split :direction="direction">
    <SplitArea :size="80">
      <input type="file" id="inputFile" accept=".gpx" multiple style="display:none;" />
      <div id="map" class="map" />
    </SplitArea>
    <SplitArea :size="20" id="profil">
      PROFIL
    </SplitArea>
  </Split>
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
      direction: 'vertical'
    }
  },
  computed: {
    ...mapGetters(['zoom', 'center'])
  },
  mounted: function () {
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
@import 'ol-ext/control/Search.css';
@import 'ol-ext/control/Bar.css';
@import 'ol-ext/control/LayerSwitcher.css';
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
@import 'ol-ext/control/Profil.css';
</style>
