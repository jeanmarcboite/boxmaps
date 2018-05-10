<template>
<div class="input-group color-picker" ref="colorpicker">
  <span class="current-color" :style="'background-color: ' + colorValue" @click.stop="dialog = true"></span>
  <v-dialog v-model="dialog">
    <Picker :value="colors" @input="updateColor" />
  </v-dialog>
</div>
</template>

<script>
import {
  Chrome as Picker
} from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    Picker
  },
  props: ['color'],
  data() {
    return {
      colors: {
        hex: '#000000',
      },
      colorValue: '',
      dialog: false,
    }
  },
  mounted() {
    this.updateColors(this.color || '#000000')
  },
  methods: {
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
      this.colorValue = color
    },
    updateColor(color) {
      console.log('update color: ' + color)
      this.colors = color
      if (color.rgba.a === 1) {
        this.updateColors(color.hex)
      } else {
        this.updateColors('rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')')
      }
    },
  },
}
</script>

<style>
.vc-chrome {
  position: absolute;
  top: 65px;
  left: 65px;
  z-index: 9;
}

.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}
</style>
