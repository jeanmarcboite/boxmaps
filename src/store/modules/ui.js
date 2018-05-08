import { make } from 'vuex-pathify'

const state = {
  drawer: false,
  exportDialog: false
}

// getters
const getters = {
  drawer: state => state.drawer,
  exportDialog: state => state.exportDialog,
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations: make.mutations(state)
}
