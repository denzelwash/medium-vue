import feedApi from '@/api/feed'

export default {
  state: () => ({
    data: null,
    isLoading: false,
    errors: null
  }),
  getters: {
    feedData(state) {
      return state.data
    },
    feedIsLoading(state) {
      return state.isLoading
    },
    feedErrors(state) {
      return state.errors
    }
  },
  mutations: {
    getFeedStart(state) {
      state.data = null
      state.isLoading = true
    },
    getFeedEnd(state, payload) {
      state.data = payload
      state.isLoading = false
    },
    getFeedError(state, payload) {
      state.isLoading = false
      state.errors = payload
    }
  },
  actions: {
    async getFeed({commit}, payload) {
      commit('getFeedStart')
      try {
        const response = await feedApi(payload.url)
        commit('getFeedEnd', response.data)
        return response.data
      } catch (e) {
        commit('getFeedError', e)
      }
    }
  }
}
