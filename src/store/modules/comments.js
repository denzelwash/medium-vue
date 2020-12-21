import commentApi from '@/api/comments'

export default {
  state: {
    isLoading: false,
    comments: null
  },
  getters: {
    commentsLoading(state) {
      return state.isLoading
    },
    comments(state) {
      return state.comments
    }
  },
  mutations: {
    commentsLoadingStart(state) {
      state.isLoading = true
    },
    commentsLoadingEnd(state, payload) {
      state.isLoading = false
      state.comments = payload
    }
  },
  actions: {
    async getComments({commit}, {slug}) {
      commit('commentsLoadingStart')
      const comments = await commentApi.get(slug)
      commit('commentsLoadingEnd', comments.data.comments)
      return comments.data.comments
    }
  }
}
