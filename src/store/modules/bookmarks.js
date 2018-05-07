import POI from '@/assets/poi'

const state = {
  bookmarks: {
    Faycelles: {
      pos: POI.Faycelles,
      zoom: 15,
      permanent: true
    },
    Paris: {
      pos: POI.Paris,
      zoom: 11,
      permanent: true
    },
    London: {
      pos: POI.London,
      zoom: 11,
      permanent: true
    },
    Geneve: {
      pos: POI.Geneve,
      zoom: 13,
      permanent: true
    },
    Bruxelles: {
      pos: POI.Bruxelles,
      zoom: 12,
      permanent: true
    },
    Berlin: {
      pos: POI.Berlin,
      zoom: 12,
      permanent: true
    },
    Madrid: {
      pos: POI.Madrid,
      zoom: 12
    },
    Roma: {
      pos: POI.Roma,
      zoom: 12
    }
  }
}

const getters = {
  bookmarks: state => state.bookmarks
}

const mutations = {
  addBookmark(state, payload) {
    state.bookmarks[payload.name] = payload.value
  }
}

export default {
  state,
  getters,
  mutations
}
