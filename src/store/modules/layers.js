const state = {
  osm: {
    visible: false,
    layers: {
      osm: {
        visible: true
      }
    }
  },
  ign: {
    visible: true,
    layers: {
      geo: {
        visible: true
      },
      photos: {
        visible: false
      }
    }
  },
  bing: {
    visible: false,
    layers: {
      road: {
        visible: false
      },
      imagery: {
        visible: false
      }
    }
  },
  tracks: {
  }
}

const getters = {
  osm: state => state.osm,
  ign: state => state.ign,
  bing: state => state.bing
}

const mutations = {
  setVisibility(state, payload) {
    if (payload.layer) {
      state[payload.group][payload.layer].visible = payload.visible
    } else {
      state[payload.group].visible = payload.visible
    }
  },
  addGPX(state, payload) {
    state.gpx[payload.title] = payload.gpx
  }
}

export default {
  state,
  getters,
  mutations
}
