<template>
<input type="file" id="inputTrack" accept=".gpx" multiple style="display:none;" />
</template>

<script>
import Bar from 'ol-ext/control/Bar'
import Button from 'ol-ext/control/Button'
export default {
  name: 'VToolbar',
  props: ['controls', 'options'],
  methods: {},
  mounted: function () {
    console.log('VToolbar mounted')
    const bar = new Bar(this.options)
    const readButton = new Button({
      html: '<i class="fa fa-folder-open"></i>',
      title: 'Read track file',
      handleClick: function () {
        document.getElementById('inputTrack').click()
      }
    })

    bar.addControl(readButton)
    bar.setPosition('top-left')
    this.controls.push(bar)
    // this.map.addControl(bar)
  }
}
</script>
