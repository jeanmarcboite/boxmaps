import Tile from 'ol/layer/tile'
import OSM from 'ol/source/osm'
// some JS file
import store from '@/store'

const osm = new Tile({
  title: 'OSM',
  type: 'base',
  baseLayer: true,
  source: new OSM(),
  visible: false,
  noSwitcherDelete: true})

const osmLayers = [osm]
export default osmLayers
