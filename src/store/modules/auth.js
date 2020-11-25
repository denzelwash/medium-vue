import authApi from '@/api/auth'

export default {
  state: () => ({
    isSubmitting: false
  }),
  mutations: {
    loadStart(state) {
      state.isSubmitting = true
    },
    loadEnd(state) {
      state.isSubmitting = false
    },
    loadError(state, payload) {
      state.isSubmitting = false
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
        commit('loadEnd')
        return response.data.user
      } catch (error) {
        commit('loadError', error.response.data.errors)
      }
    }
  },
  modules: {}
}
