import ol from 'ol'
import Toggle from 'ol-ext/control/Toggle'

function ToggleButton(options) {
  options.html = '<i class="' + options.icon + '"></i>'
  Toggle.call(this, options)
}
ol.inherits(ToggleButton, Toggle)

export default ToggleButton
