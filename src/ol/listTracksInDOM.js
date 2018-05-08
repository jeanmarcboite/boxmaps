import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'

const listTracks = function(map, group, ul) {
  group.getLayers().forEach(layer => listTrack(map, layer, ul))
}

const listTrack = function(map, layer, ul) {
  if (layer instanceof Group) {
    listTracks(map, layer, ul)
  } else if (layer instanceof VectorLayer && layer.extent) {
    ul.appendChild(liTrack(map, layer))
  }
}

const liTrack = function(map, layer) {
  const li = document.createElement('li')
  li.className = 'layer'
  const input = document.createElement('input')
  input.type = 'radio'
  input.name = 'baseTrack'
  input.onchange = function(e) {
    if (map && e.target.checked && layer.extent) {
      map.getView().fit(layer.extent)
    }
  }
  const layerId = uuid()
  input.id = layerId
  li.appendChild(input)
  const label = document.createElement('label')
  label.htmlFor = layerId
  label.innerHTML = layer.get('title')
  li.appendChild(label)

  return li
}

/**
    * Generate a UUID
    * Adapted from http://stackoverflow.com/a/2117523/526860
    * @returns {String} UUID
    */
const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0
    let v = c === 'x'
      ? r
      : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export default listTracks
