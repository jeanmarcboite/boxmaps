<template>
<v-list>
  <TrackProperties v-for='track in tracks' :key="track.key" :track="track" />
</v-list>
</template>

<script>
import Vue from 'vue'
import Stroke from 'ol/style/stroke'
import Style from 'ol/style/style'
import TrackProperties from './TrackProperties.vue'
export default {
  name: 'BTrack',
  components: {
    TrackProperties
  },
  props: ['tracks'],
  data() {
    return {

    }
  },
  methods: {
    colorButton(track) {
      return document.getElementById(track.getName())
    },
    iconClick() {
      console.log('click')
    },
    itemClick(track) {
      console.log(track.color)
    },
    trackSelected(track) {
      if (track.extent) {
        this.$map.getView().fit(track.extent)
      }
    },
    colorUpdated(track, color) {
      track.color = color
      if (color !== '#000000') {
        const style = new Style({
          stroke: new Stroke({
            color,
            width: 4
          })
        })
        track.setStyle(style)
      }

      this.colorButton(track).style.background = track.color
    }
  }
}
</script>

<style>

</style>
