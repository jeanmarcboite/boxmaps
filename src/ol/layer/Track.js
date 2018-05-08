import ol from 'ol'
import VectorLayer from 'ol/layer/vector'

export function TrackLayer (optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof TrackLayer)) {
    console.warn('Toolbar is a constructor and should be called with the `new` keyword')
  }

  const options = Object.assign({}, optOptions)

  VectorLayer.call(this, options)

  this.extent = options.source.getExtent().slice()
};

ol.inherits(TrackLayer, VectorLayer)

export default TrackLayer
