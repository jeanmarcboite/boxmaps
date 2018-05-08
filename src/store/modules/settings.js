import POI from '@/assets/poi'

const state = {
  zoom: 12,
  center: POI.faycelles,
}

// getters
const getters = {
  zoom: state => state.zoom,
  center: state => state.center,
}

const actions = {
}

const mutations = {
  setView(state, value) {
    state.zoom = value.zoom
    state.center = value.center
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
