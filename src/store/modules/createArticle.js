import articleApi from '@/api/article'

export default {
  state: () => ({
    errors: null,
    isLoading: false
  }),
  getters: {
    createArticleLoading(state) {
      return state.isLoading
    },
    createArticleErrors(state) {
      return state.errors
    }
  },
  mutations: {
    createArticleStart(state) {
      state.isLoading = true
    },
    createArticleEnd(state) {
      state.isLoading = false
    },
    createArticleErrors(state, payload) {
      state.isLoading = false
      state.errors = payload
    }
  },
  actions: {
    async createArticle({commit}, payload) {
      commit('createArticleStart')
      try {
        const article = await articleApi.createArticle(payload)
        commit('createArticleEnd')
        return article
      } catch (e) {
        commit('createArticleErrors', e.response.data.errors)
      }
    }
  }
}
