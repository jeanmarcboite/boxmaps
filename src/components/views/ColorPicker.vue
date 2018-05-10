<template>
<div class="input-group color-picker" ref="colorpicker">
  <span class="input-group-addon color-picker-container">
		<span class="current-color" :style="'background-color: ' + colorValue" @click.stop="dialog = true"></span>
  <v-dialog v-model="dialog">
    <ChromePicker :value="colors" @input="updateFromPicker" />
  </v-dialog>
  </span>
</div>
</template>

<script>
import {
  Chrome as ChromePicker
} from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    ChromePicker
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
    this.setColor(this.color || '#000000')
  },
  methods: {
    setColor(color) {
      this.updateColors(color)
      this.colorValue = color
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
    },
    updateFromPicker(color) {
      console.log('update color: ' + color)
      this.colors = color
      if (color.rgba.a === 1) {
        this.colorValue = color.hex
      } else {
        this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')'
      }
    },
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.updateColors(val)
        this.$emit('input', val)
      }
    }
  },
}
</script>

<style>
h1 {
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.vc-chrome {
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 9;
}

.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}

.footer {
  margin-top: 20px;
  text-align: center;
}
</style>
