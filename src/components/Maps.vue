<template>
<div>
  <div id="map" class="map" />
</div>
</template>
<script>
import Map from 'ol/map'
import POI from '@/assets/poi'
import View from 'ol/view'
import Scaleline from 'ol/control/scaleline'
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import FullScreen from 'ol/control/fullscreen'
import interactions from 'ol/interaction'

import layers from '@/components/layers'

import dragAndDropInteraction from '@/components/ol/dndInteraction'

export default {
  name: 'Map',
  data() {
    return {
      title: 'Maps'
    }
  },
  mounted: function () {
    const map = new Map({
      interactions: interactions.defaults().extend([dragAndDropInteraction]),
      layers,
      target: 'map',
      view: new View({
        center: POI.faycelles,
        zoom: 12
      })
    })
    map.addControl(new FullScreen())
    map.addControl(new Scaleline())
    map.addControl(new LayerSwitcher({
      trash: true
    }))
    const search = new SearchNominatim()
    search.on('select', function (e) {
      // console.log(e)
      map.getView().animate({
        center: e.coordinate,
        zoom: Math.max(map.getView().getZoom(), 13)
      })
    })
    map.addControl(search)
  }
}
</script>

<style lang="scss">
@import "ol/ol.css";
@import 'ol-ext/control/Search.css';
@import 'ol-ext/control/LayerSwitcher.css';
</style>
