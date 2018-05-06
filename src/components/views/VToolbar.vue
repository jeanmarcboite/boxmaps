<template>
<input type="file" id="inputTrack" accept=".gpx" multiple style="display:none;" />
</template>

<script>
import Bar from 'ol-ext/control/Bar'
import Button from 'ol-ext/control/Button'
export default {
  name: 'VToolbar',
  props: ['controls', 'options', 'openId', 'saveId'],
  data() {
    return {
      bar: new Bar(this.options)
    }
  },
  methods: {
    addButton: function (button) {
      const newButton = new Button({
        html: button.html,
        title: button.title,
        handleClick: function () {
          const el = document.getElementById(button.elementId)
          if (el) {
            el.click()
          }
        }
      })
      this.bar.addControl(newButton)
    }
  },
  mounted: function () {
    const buttons = [
      {
        title: 'read track file',
        html: '<i class="fa fa-folder-open"></i>',
        elementId: this.openId
      },
      {
        title: 'export current track',
        html: '<i class="fa fa-save"></i>',
        elementId: this.saveId
      },
    ]

    buttons.forEach(this.addButton)

    this.bar.setPosition('top-left')

    this.controls.push(this.bar)
  }
}
</script>
