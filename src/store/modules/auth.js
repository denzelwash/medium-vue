import authApi from '@/api/auth'
import {setItem} from '@/helpers/localStorage.helper'

export default {
  state: () => ({
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
  }),
  getters: {
    isSubmitting(store) {
      return store.isSubmitting
    },
    currentUser(store) {
      return store.currentUser
    },
    validationErrors(store) {
      return store.validationErrors
    },
    isLoggedIn(store) {
      return store.isLoggedIn
    }
  },
  mutations: {
    loadStart(state) {
      state.isSubmitting = true
    },
    loadEnd(state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.isLoggedIn = true
      state.validationErrors = null
    },
    loadError(state, payload) {
      state.isSubmitting = false
      state.isLoggedIn = false
      console.log('load errors', payload)
      state.validationErrors = payload
    },
    clearValidationErrors(state) {
      state.validationErrors = null
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
    },
    async login({commit}, payload) {
      commit('loadStart')
      try {
        const response = await authApi.login(payload)
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
