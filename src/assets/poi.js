import proj from 'ol/proj'
import projection from './projection'

export default {
  faycelles: proj.transform([1.987147, 44.565865], projection.dataProjection, projection.featureProjection)
}
