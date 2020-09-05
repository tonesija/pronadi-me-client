import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    isUserLoggedIn: false,
    token: null
  },
  mutations: {
    setUser (state, user) {
      if(user) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
      state.user = user
    },
    setToken (state, token) {
      if(token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
      localStorage.setItem("token", token)
      state.token = token
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setToken ({commit}, token) {
      commit('setToken', token)
    }
  },
  modules: {
  }
})
