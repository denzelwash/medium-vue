import commentApi from '@/api/comments'

export default {
  state: {
    isLoading: false,
    comments: null,
    addCommentLoading: false
  },
  getters: {
    commentsLoading(state) {
      return state.isLoading
    },
    comments(state) {
      return state.comments
    },
    addCommentLoading(state) {
      return state.addCommentLoading
    }
  },
  mutations: {
    commentsLoadingStart(state) {
      state.isLoading = true
    },
    commentsLoadingEnd(state, payload) {
      state.isLoading = false
      state.comments = payload
    },
    addCommentStart(state) {
      state.addCommentLoading = true
    },
    addCommentEnd(state, payload) {
      state.comments.unshift(payload)
      state.addCommentLoading = false
    },
    delComment(state, id) {
      state.comments.forEach((element, index) => {
        if (element.id === id) {
          state.comments.splice(index, 1)
        }
      })
    }
  },
  actions: {
    async getComments({commit}, {slug}) {
      commit('commentsLoadingStart')
      const comments = await commentApi.get(slug)
      commit('commentsLoadingEnd', comments.data.comments)
      return comments.data.comments
    },
    async addComment({commit}, payload) {
      commit('addCommentStart')
      const comment = await commentApi.add(payload)
      commit('addCommentEnd', comment.data.comment)
      return comment.data.comment
    },
    async deleteComment({commit}, payload) {
      commit('commentsLoadingStart')
      await commentApi.del(payload)
      commit('delComment', payload.id)
    }
  }
}
