import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    isUserLoggedIn: false
  },
  mutations: {
    setUser (state, user) {
      if(user) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
      state.user = user
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
