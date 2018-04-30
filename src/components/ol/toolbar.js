import ol from 'ol'
import Bar from 'ol-ext/control/Bar'
import Select from 'ol/interaction/select'
import Draw from 'ol/interaction/draw'
import Toggle from 'ol-ext/control/Toggle'
import VectorSource from 'ol/source/vector'
import style from '@/components/ol/style'
import VectorLayer from 'ol/layer/vector'
import FullScreen from 'ol/control/fullscreen'
import Button from 'ol-ext/control/Button'
import readFile from '@/components/ol/readfile'

function IconToggle(options) {
  options.html = '<i class="' + options.icon + '"></i>'
  Toggle.call(this, options)
}
ol.inherits(IconToggle, Toggle)

function Toolbar(map, options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Toolbar)) {
    console.warn('Toolbar is a constructor and should be called with the `new` keyword')
  }
  // this._init(options)
  Bar.call(this, options)

  const readButton = new Button({
    html: '<i class="fa fa-folder-open"></i>',
    title: 'Read track file',
    handleClick: function () {
      document.getElementById('inputFile').click()
    }
  })

  document.getElementById('inputFile').onchange = readFile(map)

  // read.element.onchange = readFile(map)
  this.addControl(readButton)

  /* Nested toobar with one control activated at once */
  const leftToolBar = new Bar({toggleOne: true, group: true})
  this.addControl(leftToolBar)

  const selectCtrl = new IconToggle({
    icon: 'fa fa-hand-pointer-o',
    className: 'select',
    title: 'Select',
    interaction: new Select()
  })

  const source = new VectorSource({})
  const drawCtrl = new IconToggle({
    icon: 'fa fa-pencil',
    title: 'draw line',
    interaction: new Draw({type: 'LineString', source})
  })

  leftToolBar.addControl(selectCtrl)
  leftToolBar.addControl(drawCtrl)

  this.addControl(new FullScreen())

  map.addLayer(new VectorLayer({
    title: 'draw line',
    displayInLayerSwitcher: false,
    source,
    style
  }))
  map.addControl(this)
}
ol.inherits(Toolbar, Bar)

export default Toolbar
