import Group from 'ol/layer/group'

import ign from './ign'
import bing from './bing'
import osm from './osm'
import store from '@/store'

const layers = [
  new Group({
    title: 'Bing maps',
    layers: bing,
    visible: store.getters.bing.visible,
  }),
  new Group({
    'title': 'IGN maps',
    layers: ign,
    visible: store.getters.ign.visible,
    openInLayerSwitcher: true
  }),
  new Group({
    title: 'Open Maps',
    layers: osm,
    visible: store.getters.osm.visible,
  })
]

export default layers
