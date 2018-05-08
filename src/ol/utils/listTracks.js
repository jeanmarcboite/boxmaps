import Group from 'ol/layer/group'
import TrackLayer from '@/ol/layer/Track'

const listTracks_ = function(group, tracks) {
  group.getLayers().forEach(layer => listTrack(layer, tracks))
}

const listTrack = function(layer, tracks) {
  if (layer instanceof Group) {
    listTracks(layer, tracks)
  } else if (layer instanceof TrackLayer) {
    tracks.push(layer)
  }
}

const listTracks = function(group) {
  const trackList = []
  listTracks_(group, trackList)

  return trackList
}

export default listTracks
