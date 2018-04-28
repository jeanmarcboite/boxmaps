import Tile from 'ol/layer/tile'
import OSM from 'ol/source/osm'
import store from '@/store'
console.log(store.getters.osm.visible)
const osm = new Tile({
  title: 'OSM',
  type: 'base',
  baseLayer: true,
  source: new OSM(),
  visible: store.getters.osm.layers.osm.visible,
  noSwitcherDelete: true})

const osmLayers = [osm]
export default osmLayers
