import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'

const listTracks = function(group, tracks) {
  const trackList = tracks || []
  group.getLayers().forEach(layer => listTrack(layer, trackList))

  return trackList
}

const listTrack = function(layer, tracks) {
  if (layer instanceof Group) {
    listTracks(layer, tracks)
  } else if (layer instanceof VectorLayer && layer.extent) {
    tracks.push(layer)
  }
}

export default listTracks
