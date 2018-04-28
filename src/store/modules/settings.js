const state = {
  clipped: true,
  fixed: false,
  miniVariant: false,
  drawer: false
}

// getters
const getters = {
  clipped: state => state.clipped,
  fixed: state => state.fixed,
  miniVariant: state => state.miniVariant,
  drawer: state => state.drawer,
}

const actions = {
}

const mutations = {
  toggleClipped(state) {
    state.clipped = !state.clipped
  },
  toggleFixed(state) {
    state.fixed = !state.fixed
  },
  toggleMiniVariant(state) {
    state.miniVariant = !state.miniVariant
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
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
