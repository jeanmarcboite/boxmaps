import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import Style from 'ol/style/style'
import CircleStyle from 'ol/style/circle.js'

export const defaultStyle = {
  'Point': new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(255,255,0,0.5)'
      }),
      radius: 5,
      stroke: new Stroke({
        color: '#f0f',
        width: 1
      })
    })
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: '#f00',
      width: 3
    })
  }),
  'Polygon': new Style({
    fill: new Fill({
      color: 'rgba(0,255,255,0.5)'
    }),
    stroke: new Stroke({
      color: '#0ff',
      width: 1
    })
  }),
  'MultiPoint': new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(255,0,255,0.5)'
      }),
      radius: 5,
      stroke: new Stroke({
        color: '#f0f',
        width: 1
      })
    })
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: '#00f',
      width: 3
    })
  }),
  'MultiPolygon': new Style({
    fill: new Fill({
      color: 'rgba(0,0,255,0.5)'
    }),
    stroke: new Stroke({
      color: '#00f',
      width: 1
    })
  })
}

const styleFunction = function(feature, resolution) {
  const featureStyleFunction = feature.getStyleFunction()
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution)
  } else {
    return defaultStyle[feature.getGeometry().getType()]
  }
}

export default styleFunction
