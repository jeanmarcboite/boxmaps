import Fullscreen from 'ol/control/fullscreen'
import Scaleline from 'ol/control/scaleline'
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Button from 'ol-ext/control/Button'
import Toggle from 'ol-ext/control/Toggle'
import Overlay from 'ol-ext/control/Overlay'
import GeoBookmark from 'ol-ext/control/GeoBookmark'

const newButton = function(options) {
  const button = new Button({html: options.html, title: options.title, handleClick: options.handleClick})
  if (options.class) {
    button.element.classList.add(options.class)
  }
  return button
}

const controls = function(map, options) {
  [
    {
      title: 'draw a new track',
      html: '<i class="fa fa-file"></i>',
      class: 'ol-new-track',
      handleClick: function() {
        options.hBar.setVisible(!options.hBar.getVisible())
      }
/*
    }, {
      title: 'search options',
      html: '<i class="fa fa-cog"></i>',
      class: 'ol-search-options',
      handleClick: function() {}
      */
    }
  ].forEach(button => map.addControl(newButton(button)))

  map.addControl(new Scaleline())
  map.addControl(new Fullscreen())

  map.addControl(new LayerSwitcher({trash: true, extent: true}))
  const bm = new GeoBookmark({
    marks: options.bookmarks
  })
  map.addControl(bm)

  const search = new SearchNominatim()
  search.on('select', function(e) {
    map.getView().animate({
      center: e.coordinate,
      zoom: Math.max(map.getView().getZoom(), 13)
    })
  })
  map.addControl(search)

  // Menu overlay
  const menu = new Overlay({closeBox: true, className: 'slide-left menu', content: document.getElementById('menu')})
  map.addControl(menu)

  // A toggle control to show/hide the menu
  const menuToggle = new Toggle({
    html: '<i class="fa fa-bars"></i>',
    className: 'menu',
    title: 'Menu',
    onToggle: function() {
      menu.toggle()
    }
  })
  map.addControl(menuToggle)
}

export default controls
