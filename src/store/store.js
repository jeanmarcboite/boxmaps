import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
import settings from './modules/settings'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  app: 'Vuetify Map'
}

const plugins = [createPersistedState({key: 'maps'})]
if (debug) {
  plugins.push(createLogger())
}

const store = new Vuex.Store({
  modules: {
    settings,
  },
  state,
  plugins
})

export default store
