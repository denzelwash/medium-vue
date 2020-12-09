import tagsApi from '@/api/tags'

export default {
  state: () => ({
    data: null,
    isLoading: false,
    errors: null
  }),
  getters: {
    tagsData(state) {
      return state.data
    },
    tagsIsLoading(state) {
      return state.isLoading
    },
    tagsErrors(state) {
      return state.errors
    }
  },
  mutations: {
    getTagsStart(state) {
      state.data = null
      state.isLoading = true
    },
    getTagsEnd(state, payload) {
      state.data = payload
      state.isLoading = false
    },
    getTagsError(state, payload) {
      state.isLoading = false
      state.errors = payload
    }
  },
  actions: {
    async getTags({commit}) {
      commit('getTagsStart')
      try {
        const tags = await tagsApi.getPopularTags()
        commit('getTagsEnd', tags)
        return tags
      } catch (e) {
        commit('getTagsError', e)
        console.log(e)
      }
    }
  }
}
