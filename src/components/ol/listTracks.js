import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'

const listTracks = function(map, group, tracks) {
  group.getLayers().forEach(layer => listTrack(map, layer, tracks))
}

const listTrack = function(map, layer, tracks) {
  if (layer instanceof Group) {
    listTracks(map, layer, tracks)
  } else if (layer instanceof VectorLayer && layer.extent) {
    tracks.push(liTrack(map, layer))
  }
}

const liTrack = function(map, layer) {
  const li = {}
  li.title = layer.get('title')

  return li
}

export default listTracks
