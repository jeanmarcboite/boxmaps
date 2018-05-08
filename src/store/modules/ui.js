const state = {
  drawer: false,
  miniVariant: false
}

// getters
const getters = {
  drawer: state => state.drawer,
  miniVariant: state => state.miniVariant,
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
