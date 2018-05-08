import POI from '@/assets/poi'

const state = {
  zoom: 12,
  center: POI.faycelles,
  drawer: false,
  miniVariant: false
}

// getters
const getters = {
  drawer: state => state.drawer,
  miniVariant: state => state.miniVariant,
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
  setDrawer(state, value) {
    state.drawer = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
