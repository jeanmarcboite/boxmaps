import POI from '@/assets/poi'

const state = {
  zoom: 12,
  center: POI.faycelles,
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
  namespaced: true,
  state,
  actions,
  mutations
}
