<template>
<v-list>
  <v-list-tile v-for='track in tracks' :key="track.key" @click="itemClick(track)">
    <v-list-tile-action>
      <v-icon @click="iconClick()">terrain</v-icon>
    </v-list-tile-action>
    <ColorPicker :object="track" @trackselected="trackSelected(track)" @colorupdated="colorUpdated(track, $event)"></ColorPicker>
    <v-list-tile-content>
      <v-list-tile-title>{{ track.get('title') }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ track.color }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>
</template>

<script>
import Vue from 'vue'
import Stroke from 'ol/style/stroke'
import Style from 'ol/style/style'
import ColorPicker from './ColorPicker.vue'
export default {
  name: 'BTrack',
  components: {
    ColorPicker
  },
  props: ['tracks'],
  data() {
    return {}
  },
  methods: {
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
    }
  }
}
</script>

<style>

</style>
