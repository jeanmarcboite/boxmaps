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

const mutations = {
  setDrawer(state, value) {
    state.drawer = value
  },
  setExportDialog(state, value) {
    state.exportDialog = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
