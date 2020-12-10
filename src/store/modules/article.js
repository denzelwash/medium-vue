import articleApi from '@/api/article'

export default {
  state: () => ({
    data: null,
    isLoading: false,
    errors: null
  }),
  getters: {
    articleData(state) {
      return state.data
    },
    articleIsLoading(state) {
      return state.isLoading
    },
    articleErrors(state) {
      return state.errors
    }
  },
  mutations: {
    getArticleStart(state) {
      state.data = null
      state.isLoading = true
    },
    getArticleEnd(state, payload) {
      state.data = payload
      state.isLoading = false
    },
    getArticleError(state, payload) {
      state.isLoading = false
      state.errors = payload
    }
  },
  actions: {
    async getArticle({commit}, {slug}) {
      commit('getArticleStart')
      try {
        const article = await articleApi.getArticle(slug)
        commit('getArticleEnd', article.data.article)
        return article.data.article
      } catch (e) {
        commit('getArticleError', e)
        console.log(e)
      }
    },
    async deleteArticle({commit}, {slug}) {
      try {
        return await articleApi.deleteArticle(slug)
      } catch (e) {
        commit('getArticleError', e)
        console.log(e)
      }
    }
  }
}
