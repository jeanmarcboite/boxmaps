import GPX from 'ol/format/gpx'
import VectorSource from 'ol/source/vector'
import style from './style'
import VectorLayer from 'ol/layer/vector'
import Point from 'ol/geom/point'
import Feature from 'ol/feature'

import projection from '@/assets/projection'

const readFeatures = function(event, map) {
  const format = new GPX()
  const files = event.target.files

  for (let file of files) {
    const title = file.name
    // const source = new VectorSource({format: new GPX(), url: file.name})
    var reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = function(evt) {
      const features = format.readFeatures(evt.target.result, projection)
      const source = new VectorSource({features})
      const vectorLayer = new VectorLayer({title, source, style})
      // copy the extent before it gets lost
      vectorLayer.extent = source.getExtent().slice()
      map.addLayer(vectorLayer)
      if (files.length === 1) {
        map.getView().fit(source.getExtent())
        map.source = source
      }
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
  }
}

const readFile = (map) => (event) => readFeatures(event, map)

export default readFile
