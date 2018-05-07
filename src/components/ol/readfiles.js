import GPX from 'ol/format/gpx'
import VectorSource from 'ol/source/vector'
import style from './style'
import VectorLayer from 'ol/layer/vector'
import Point from 'ol/geom/point'
import Feature from 'ol/feature'
import projection from '@/assets/projection'

const readFeatures = function(event, options) {
  const format = new GPX()
  const features = format.readFeatures(event.target.result, projection)
  const source = new VectorSource({features})
  const vectorLayer = new VectorLayer({title: options.title, source, style})
  // copy the extent before it gets lost
  vectorLayer.extent = source.getExtent().slice()
  options.map.addLayer(vectorLayer)
  if (options.fit) {
    options.map.getView().fit(source.getExtent())
  }
  options.store.commit('addTrack', options.map)
}
const readFeaturesOnLoad = (options) => (event) => readFeatures(event, options)

const readFeaturesFiles = function(event, options) {
  for (let file of event.target.files) {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = readFeaturesOnLoad({
      ...options,
      title: file.name,
      file,
      fit: event.target.files.length === 1
    })
  }
}
const readFiles = (options) => (event) => readFeaturesFiles(event, options)

const setProfile = function(map, source) {
  if (source.getState() === 'ready') {
    map.profil.setGeometry(source.getFeatures()[0], {
      graduation: 250,
      amplitude: 1000,
      zmin: 0
    })
    const pt = new Feature(new Point([0, 0]))
    pt.setStyle([])
    source.addFeature(pt)

    map.profil.on([
      'over', 'out'
    ], function(e) {
      if (pt) {
        if (e.type === 'over') {
          pt.setGeometry(new Point(e.coord))
          pt.setStyle(null)
        } else {
          // hide point
          pt.setStyle([])
        }
      }
    })
  }
}

export default readFiles
