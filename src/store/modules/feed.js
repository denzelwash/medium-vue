import feedApi from '@/api/feed'

export default {
  state: () => ({
    data: null,
    isLoading: false,
    errors: null
  }),
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
        console.log(response.data)
        return response.data
      } catch (e) {
        console.log(e)
        commit('getFeedError', e)
      }
    }
  }
}
