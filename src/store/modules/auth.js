import authApi from '@/api/auth'
import {setItem} from '@/helpers/localStorage.helper'

export default {
  state: () => ({
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
  }),
  mutations: {
    loadStart(state) {
      state.isSubmitting = true
    },
    loadEnd(state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.isLoggedIn = true
    },
    loadError(state, payload) {
      state.isSubmitting = false
      state.isLoggedIn = false
      console.log('load errors', payload)
    }
  },
  getters: {
    isSubmitting(store) {
      return store.isSubmitting
    }
  },
  actions: {
    async register({commit}, payload) {
      commit('loadStart')
      try {
        const response = await authApi.register(payload)
        commit('loadEnd', response.data.user)
        setItem('token', response.data.user.token)
        return response.data.user
      } catch (error) {
        commit('loadError', error.response.data.errors)
      }
    }
  },
  modules: {}
}
