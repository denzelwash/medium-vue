import articleApi from '@/api/article'

export default {
  state: () => ({
    errors: null,
    isLoading: false,
    article: null,
    loadArticle: false
  }),
  getters: {
    editArticleFormLoading(state) {
      return state.isLoading
    },
    editArticleFormErrors(state) {
      return state.errors
    },
    getEditArticle(state) {
      return state.article
    },
    editArticleLoadComplete(state) {
      return state.loadArticle
    }
  },
  mutations: {
    editArticleStart(state) {
      state.isLoading = true
    },
    editArticleEnd(state) {
      state.isLoading = false
    },
    editArticleErrors(state, payload) {
      state.isLoading = false
      state.errors = payload
    },
    loadEditArticleStart(state) {
      state.loadArticle = false
    },
    loadEditArticleEnd(state, payload) {
      state.article = payload
      state.loadArticle = true
    },
    loadEditArticleErrors(state) {
      state.isLoading = false
    }
  },
  actions: {
    async getArticleForEdit({commit}, payload) {
      commit('loadEditArticleStart')
      try {
        const article = await articleApi.getArticle(payload)
        commit('loadEditArticleEnd', article.data.article)
        return article.data.article
      } catch (e) {
        commit('loadEditArticleErrors')
      }
    },
    async editArticle({commit}, payload) {
      commit('editArticleStart')
      try {
        const article = await articleApi.editArticle(payload)
        commit('editArticleEnd')
        return article
      } catch (e) {
        commit('editArticleErrors', e.response.data.errors)
      }
    }
  }
}
