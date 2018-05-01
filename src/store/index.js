import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import settings from './modules/settings'
import layers from './modules/layers'
import tracks from './modules/tracks'
import VuexPersist from 'vuex-persist'

const vuexStorage = new VuexPersist({
  key: 'maps-vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  app: 'Vuetify Map'
}

const plugins = [vuexStorage.plugin]
if (debug) {
  plugins.push(createLogger())
}

const store = new Vuex.Store({
  modules: {
    layers,
    tracks,
    settings
  },
  state,
  plugins
})

export default store
