import apiFollow from '@/api/follow'

export default {
  state: {
    isLoading: false
  },
  getters: {
    followIsLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
    followLoadingStart(state) {
      state.isLoading = true
    },
    followLoadingEnd(state) {
      state.isLoading = false
    }
  },
  actions: {
    async followUser({commit}, payload) {
      commit('followLoadingStart')
      try {
        const follow = await apiFollow.add(payload)
        commit('followLoadingEnd')
        return follow
      } catch (e) {
        console.log(e)
        commit('followLoadingEnd')
      }
    },
    async unfollowUser({commit}, payload) {
      commit('followLoadingStart')
      try {
        const follow = await apiFollow.remove(payload)
        commit('followLoadingEnd')
        return follow
      } catch (e) {
        console.log(e)
        commit('followLoadingEnd')
      }
    }
  }
}
