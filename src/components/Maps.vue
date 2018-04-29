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
import Toggle from 'ol-ext/control/Toggle'
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Bar from 'ol-ext/control/Bar'
import FullScreen from 'ol/control/fullscreen'
import ZoomToExtent from 'ol/control/zoomtoextent'
import Rotate from 'ol/control/rotate'
import Button from 'ol-ext/control/Button'
import interaction from 'ol/interaction'
import Select from 'ol/interaction/select'
import Draw from 'ol/interaction/draw'
import control from 'ol/control/control'
import {
  mapMutations,
  mapGetters
} from 'vuex'

import layers from '@/components/layers'
import store from '@/store'
import readFile from '@/components/ol/readfile'
import VectorSource from 'ol/source/vector'
import style from '@/components/ol/style'
import VectorLayer from 'ol/layer/vector'

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

    const vectorSource = new VectorSource({})
    map.addLayer(new VectorLayer({
      title: 'Add points',
      source: vectorSource,
      style
    }))

    const toolBar = new Bar()
    map.addControl(toolBar)

    /* Nested toobar with one control activated at once */
    const leftToolBar = new Bar({
      toggleOne: true,
      group: true
    })
    toolBar.addControl(leftToolBar)
    // Add selection tool (a toggle control with a select interaction)
    var selectCtrl = new Toggle({
      html: '<i class="fa fa-hand-pointer-o"></i>',
      className: 'select',
      title: 'Select',
      interaction: new Select(),
      active: true,
      onToggle: function (active) {
        console.log('Select is ' + (active ? 'activated' : 'deactivated'))
      }
    })

    const editCtrl = new Toggle({
      html: '<i class="fa fa-map-marker" ></i>',
      className: 'edit',
      title: 'Point',
      interaction: new Draw({
        type: 'Point',
        source: vectorSource
      }),
      onToggle: function (active) {
        console.log('Edition is ' + (active ? 'activated' : 'deactivated'))
      }
    })

    leftToolBar.addControl(selectCtrl)
    leftToolBar.addControl(editCtrl)

    toolBar.addControl(new FullScreen())

    // Add a custom push button with onToggle function
    const wrench = new Button({
      html: '<i class="fa fa-wrench"></i>',
      title: 'Toggle toolbar',
      handleClick: function () {
        toolBar.setVisible(!toolBar.getVisible())
      }
    })
    wrench.element.classList.add('ol-wrench')
    map.addControl(wrench)

    document.querySelector('#readFile').onchange = readFile(map)
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
</style>
