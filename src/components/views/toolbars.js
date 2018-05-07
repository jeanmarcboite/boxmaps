import Toolbar from '@/components/control/Toolbar'
import Select from 'ol/interaction/select'
import Draw from 'ol/interaction/draw'
import VectorSource from 'ol/source/vector'
import style from '@/components/ol/style'
import VectorLayer from 'ol/layer/vector'

const toolbars = function(map, options) {
  const verticalButtons = [
    {
      title: 'read track file',
      html: '<i class="fa fa-folder-open"></i>',
      elementId: options.openId
    }, {
      title: 'export current track',
      html: '<i class="fa fa-save"></i>',
      elementId: options.saveId
    }
  ]

  const source = new VectorSource({})
  const toggleButtons = [
    {
      icon: 'fa fa-hand-pointer-o',
      className: 'select',
      title: 'Select',
      interaction: new Select()
    }, {
      icon: 'fa fa-pencil',
      title: 'draw line',
      interaction: new Draw({type: 'LineString', source})
    }
  ]
  const buttons = []

  console.log('vbar')
  const vBar = new Toolbar({buttons: verticalButtons, position: 'top-left'})
  console.log('vbar')
  map.addControl(vBar)

  console.log('hbar')
  const hBar = new Toolbar({buttons, toggleButtons})
  hBar.setVisible(false)
  map.addControl(hBar)

  map.addLayer(new VectorLayer({
    title: 'draw line',
    displayInLayerSwitcher: false,
    source,
    style
  }))

  return [vBar, hBar]
}
export default toolbars
