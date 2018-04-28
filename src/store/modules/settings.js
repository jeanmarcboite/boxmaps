const state = {
  zoom: 12
}

// getters
const getters = {
  zoom: state => state.zoom,
}

const actions = {
}

const mutations = {
  setZoom(state, value) {
    state.zoom = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
