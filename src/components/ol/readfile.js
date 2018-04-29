import GPX from 'ol/format/gpx'
import VectorSource from 'ol/source/vector'
import styleFunction from './style'
import VectorLayer from 'ol/layer/vector'

const readFeatures = function(event, map) {
  const format = new GPX()
  const files = event.target.files

  for (let file of files) {
    const title = file.name
    console.dir(file)
    console.log(file.name + ' ' + file.type)
    // const source = new VectorSource({format: new GPX(), url: file.name})
    var reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = function(evt) {
      console.log(evt.target.result)
      const gpxFeatures = format.readFeatures(
        evt.target.result,
        {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        }
      )
      const vectorSource = new VectorSource({
        features: gpxFeatures
      })
      map.addLayer(new VectorLayer({
        title,
        source: vectorSource,
        style: styleFunction
      }))
      if (files.length === 1) {
        map.getView().fit(vectorSource.getExtent())
      }
    }
  }
}

const readFile = (map) => (event) => readFeatures(event, map)

export default readFile
