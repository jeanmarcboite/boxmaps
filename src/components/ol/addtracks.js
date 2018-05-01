import GeoJSON from 'ol/format/geojson'
import VectorSource from 'ol/source/vector'
import style from './style'
import VectorLayer from 'ol/layer/vector'
import projection from '@/assets/projection'

const addLayer = function (options) {
  const format = new GeoJSON()
  const features = format.readFeatures(options.features, projection)
  const source = new VectorSource({features})
  const vectorLayer = new VectorLayer({title: options.title, source, style})
  // copy the extent before it gets lost
  vectorLayer.extent = source.getExtent().slice()
  options.map.addLayer(vectorLayer)
}

const addTracks = function(map, tracks) {
  for (var track in tracks) {
    if (tracks.hasOwnProperty(track)) {
      addLayer({map, features: tracks[track], title: track})
    }
  }
}
export default addTracks
