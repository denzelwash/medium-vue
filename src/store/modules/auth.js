import authApi from '@/api/auth'
import {setItem} from '@/helpers/localStorage.helper'

export default {
  state: () => ({
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
  }),
  getters: {
    isSubmitting(store) {
      return store.isSubmitting
    },
    isLoading(store) {
      return store.isLoading
    },
    currentUser(store) {
      return store.currentUser
    },
    validationErrors(store) {
      return store.validationErrors
    },
    isLoggedIn(store) {
      return store.isLoggedIn
    },
    isAnonimus(store) {
      return store.isLoggedIn === false
    }
  },
  mutations: {
    submitStart(state) {
      state.isSubmitting = true
    },
    submitEnd(state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.isLoggedIn = true
      state.validationErrors = null
    },
    submitError(state, payload) {
      state.isSubmitting = false
      state.isLoggedIn = false
      state.validationErrors = payload
    },
    getCurrentUserStart(state) {
      state.isLoading = true
    },
    getCurrentUserEnd(state, payload) {
      state.isLoading = false
      state.currentUser = payload
      state.isLoggedIn = true
      state.validationErrors = null
    },
    getCurrentUserError(state) {
      state.isLoading = false
      state.isLoggedIn = false
      state.currentUser = null
    },
    clearValidationErrors(state) {
      state.validationErrors = null
    }
  },
  actions: {
    async register({commit}, payload) {
      commit('submitStart')
      try {
        const response = await authApi.register(payload)
        commit('submitEnd', response.data.user)
        setItem('token', response.data.user.token)
        return response.data.user
      } catch (error) {
        commit('submitError', error.response.data.errors)
      }
    },
    async login({commit}, payload) {
      commit('submitStart')
      try {
        const response = await authApi.login(payload)
        commit('submitEnd', response.data.user)
        setItem('token', response.data.user.token)
        return response.data.user
      } catch (error) {
        commit('submitError', error.response.data.errors)
      }
    },
    async getCurrentUser({commit}) {
      commit('getCurrentUserStart')
      try {
        const response = await authApi.getCurrentUser()
        commit('getCurrentUserEnd', response.data.user)
        return response.data.user
      } catch (error) {
        commit('getCurrentUserError', error.response.data.errors)
      }
    }
  },
  modules: {}
}
