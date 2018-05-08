import { make } from 'vuex-pathify'

const state = {
  drawer: false,
  exportDialog: false
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state)
}
