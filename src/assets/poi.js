import proj from 'ol/proj'

export default {
  faycelles: proj.transform([1.987147, 44.565865], 'EPSG:4326', 'EPSG:3857')
}
