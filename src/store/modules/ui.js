const state = {
  drawer: false,
}

// getters
const getters = {
  drawer: state => state.drawer,
}

const actions = {
}

const mutations = {
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
