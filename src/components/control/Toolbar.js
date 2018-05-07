import ol from 'ol'
import Bar from 'ol-ext/control/Bar'
import Button from 'ol-ext/control/Button'
import ToggleButton from '@/components/control/ToggleButton'
const newButton = function(button) {
  return new Button({
    html: button.html,
    title: button.title,
    handleClick: function() {
      const el = document.getElementById(button.elementId)
      if (el) {
        el.click()
      }
    }
  })
}

const newToggleButton = (options) => new ToggleButton(options)

function Toolbar(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Toolbar)) {
    console.warn('Toolbar is a constructor and should be called with the `new` keyword')
  }
  // this._init(options)
  Bar.call(this, options)
  if (options.toggleButtons) {
    const leftToolBar = new Bar({toggleOne: true, group: true})
    options.toggleButtons.forEach(button => this.addControl(newToggleButton(button)))
    this.addControl(leftToolBar)
  }
  options.buttons.forEach(button => this.addControl(newButton(button)))
  if (options.position) {
    this.setPosition(options.position)
  }
}
ol.inherits(Toolbar, Bar)

export default Toolbar
