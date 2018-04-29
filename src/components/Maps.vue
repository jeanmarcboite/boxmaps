<template>
<div>
  <div>
    <label for="readFile">Sélectionner un fichier (GPX)</label>
    <input type="file" id="readFile" name="readFile" accept=".gpx" multiple>
  </div>
  <div id="map" class="map" />
</div>
</template>
<script>
import Map from 'ol/map'
import View from 'ol/view'
import proj from 'ol/proj'
import Scaleline from 'ol/control/scaleline'
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Bar from 'ol-ext/control/Bar'
import FullScreen from 'ol/control/fullscreen'
import ZoomToExtent from 'ol/control/zoomtoextent'
import Rotate from 'ol/control/rotate'
import Button from 'ol-ext/control/Button'
import interactions from 'ol/interaction'
import {
  mapMutations,
  mapGetters
} from 'vuex'

import layers from '@/components/layers'
import store from '@/store'
import readFile from '@/components/ol/readfile'

import dragAndDropInteraction from '@/components/ol/dndInteraction'

function logEvent(event) {
  console.log(event)
}

export default {
  name: 'Map',
  data() {
    return {
      title: 'Maps'
    }
  },
  computed: {
    ...mapGetters(['zoom', 'center'])
  },
  mounted: function () {
    const map = new Map({
      interactions: interactions.defaults().extend([dragAndDropInteraction]),
      layers,
      target: 'map',
      view: new View({
        center: this.center,
        zoom: this.zoom
      })
    })
    map.addControl(new FullScreen())
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
    // map.addControl(search)
    map.on('moveend', function (event) {
      store.commit('setView', {
        zoom: event.map.getView().getZoom(),
        center: event.map.getView().getCenter()
      })
    })

    const toolBar = new Bar()
    toolBar.setPosition('right')
    map.addControl(toolBar)
    map.addControl(new ZoomToExtent({
      extent: [265971, 6243397, 273148, 6250665]
    }))
    toolBar.addControl(new Rotate())
    toolBar.addControl(new FullScreen())
    // Add a custom push button with onToggle function
    var hello = new Button({
      html: '<i class="fa fa-smile-o"></i>',
      className: 'hello',
      title: 'Hello world!',
      handleClick: function () {
        console.log('hello World!')
      }
    })
    console.dir(hello)
    hello.element.classList.add('hello')
    map.addControl(hello)

    document.querySelector('#readFile').onchange = readFile(map)
  }
}
</script>

<style lang="scss">
@import "ol/ol.css";
@import 'ol-ext/control/Search.css';
@import 'ol-ext/control/LayerSwitcher.css';
.hello {
    position: absolute;
    left: 5em;
    bottom: 5em;
}
</style>
