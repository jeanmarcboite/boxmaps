import ol from 'ol'
import Control from 'ol/control/control'
import Observable from 'ol/observable'
import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'

/**
 * @classdesc OpenLayers 4 Track Switcher Control.
 *
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} options
 * @param {function} displayInLayerSwitcher function that takes a layer and return a boolean if the layer is displayed in the switcher, default test the displayInLayerSwitcher layer attribute
 * @param {boolean} mouseover show the panel on mouseover, default false
 * @param {boolean} extent add an extent button to zoom to the extent of the layer
 * @param {function} onextent callback when click on extent, default fits view to extent
 * Layers attributes that control the switcher
 * - displayInLayerSwitcher {boolean} display in switcher, default true
 */
export default class TrackSwitcher extends Control {
  constructor(optOptions = {}) {
    const element = document.createElement('div')

    super({element: element})
    this.options = optOptions || {}
    this.options.onextent = (
      typeof (optOptions.onextent) === 'function'
      ? optOptions.onextent
      : null)
    this.options.hasextent = optOptions.extent || optOptions.onextent
    this.options.tipLabel = optOptions.tipLabel
      ? optOptions.tipLabel
      : 'Tracks'
    if (typeof (optOptions.displayInLayerSwitcher) === 'function') {
      this.displayInLayerSwitcher = optOptions.displayInLayerSwitcher
    }
    this.$mapListeners = []

    this.hiddenClassName = 'ol-unselectable ol-control track-switcher'
    this.shownClassName = 'shown'

    element.className = this.hiddenClassName

    const button = document.createElement('button')
    button.setAttribute('title', this.options.tipLabel)
    element.appendChild(button)

    this.panel = document.createElement('div')
    this.panel.className = 'panel'
    element.appendChild(this.panel)
    const this_ = this

    if (!this.options.mouseover) {
      this.options.click = true
    } else {
      button.onmouseover = function(e) {
        this_.showPanel()
      }
    }
    if (this.options.click) {
      button.onclick = function(e) {
        e = e || window.event
        this_.showPanel()
        e.preventDefault()
      }
    }

    this_.panel.onmouseout = function(e) {
      e = e || window.event
      if (!this_.panel.contains(e.toElement || e.relatedTarget)) {
        this_.hidePanel()
      }
    }
  }

  /**
    * Set the map instance the control is associated with.
    * @param {ol.Map} map The map instance.
    */
  setMap(map) {
    // Clean up listeners associated with the previous map
    for (var i = 0, key; i < this.$mapListeners.length; i++) {
      Observable.unByKey(this.$mapListeners[i])
    }
    this.$mapListeners.length = 0
    // Wire up listeners etc. and store reference to new map
    super.setMap(map)
    if (map) {
      var this_ = this
      this.$mapListeners.push(map.on('pointerdown', function() {
        this_.hidePanel()
      }))
      this.renderPanel()
    }
  }

  /**
    * Show the layer panel.
    */
  showPanel() {
    if (!this.element.classList.contains(this.shownClassName)) {
      this.element.classList.add(this.shownClassName)
      this.renderPanel()
    }
  }

  /**
    * Hide the layer panel.
    */
  hidePanel() {
    if (this.element.classList.contains(this.shownClassName)) {
      this.element.classList.remove(this.shownClassName)
    }
  }

  renderPanel() {
    while (this.panel.firstChild) {
      this.panel.removeChild(this.panel.firstChild)
    }

    const ul = document.createElement('ul')
    this.panel.appendChild(ul)
    this.listLayers(this.getMap(), ul)
  }

  listLayers(group, ul) {
    group.getLayers().forEach(layer => this.listLayer(layer, ul))
  }

  listLayer(layer, ul) {
    if (layer instanceof Group) {
      this.listLayers(layer, ul)
    } else if (layer instanceof VectorLayer && layer.extent) {
      ul.appendChild(this.liLayer(layer))
    }
  }

  liLayer(layer) {
    const this_ = this
    const li = document.createElement('li')
    li.className = 'layer'
    const input = document.createElement('input')
    input.type = 'radio'
    input.name = 'baseTrack'
    input.onchange = function(e) {
      if (e.target.checked && layer.extent) {
        this_.getMap().getView().fit(layer.extent)
      }
    }
    const layerId = TrackSwitcher.uuid()
    input.id = layerId
    li.appendChild(input)
    const label = document.createElement('label')
    label.htmlFor = layerId
    label.innerHTML = layer.get('title')
    li.appendChild(label)

    return li
  }

  /**
    * **Static** Generate a UUID
    * Adapted from http://stackoverflow.com/a/2117523/526860
    * @returns {String} UUID
    */
  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0
      let v = c === 'x'
        ? r
        : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}

/** Test if a layer should be displayed in the switcher
 * @param {ol.layer} layer
 * @return {boolean} true if the layer is displayed
 */
TrackSwitcher.prototype.displayInLayerSwitcher = function(layer) {
  return true || (layer.get('displayInLayerSwitcher') !== false)
}
