<template>
<v-list-tile>
  <v-list-tile-action>
    <v-icon @click="iconClick()">terrain</v-icon>
  </v-list-tile-action>
  <v-list-tile-action>
    <v-icon>save</v-icon>
  </v-list-tile-action>
  <v-list-tile-action>
    <v-icon :id="track.getName()" @click="openDialog()">palette</v-icon>
  </v-list-tile-action>
  <v-list-tile-content>
    <v-list-tile-title>{{ track.get('title') }}</v-list-tile-title>
    <v-list-tile-sub-title>{{ track.getName() }}</v-list-tile-sub-title>
  </v-list-tile-content>
  <v-dialog v-model="colorDialog">
    <ColorPicker :value="colors" @input="updateColor" />
  </v-dialog>
</v-list-tile>
</template>

<script>
import {
  Chrome as ColorPicker
} from 'vue-color'

export default {
  name: 'TrackProperties',
  components: {
    ColorPicker
  },
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      colorDialog: false,
      colors: {
        hex: '#000000',
      },
    }
  },
  mounted() {
    this.palette = document.getElementById(this.track.getName())
    this.updateColors(this.track.color || '#000000')
  },
  methods: {
    iconClick() {
      console.log('click')
    },
    openDialog() {
      this.$emit('trackselected')
      this.colorDialog = true
    },
    updateColors(color) {
      if (color.slice(0, 1) === '#') {
        this.colors = {
          hex: color
        }
      } else if (color.slice(0, 4) === 'rgba') {
        const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',')
        const hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)
        this.colors = {
          hex: hex,
          a: rgba[3],
        }
      }
      this.track.color = color
      this.palette.style.background = color
      this.palette.style.color = 'white'
    },
    updateColor(color) {
      this.colors = color
      if (color.rgba.a === 1) {
        this.updateColors(color.hex)
      } else {
        this.updateColors('rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')')
      }
    },
  }
}
</script>

<style>
.vc-chrome {
  position: absolute;
  top: 65px;
  left: 150px;
  z-index: 9;
}
</style>
