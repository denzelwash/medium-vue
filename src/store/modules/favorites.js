import apiFavorites from '@/api/addToFavorites'

export default {
  state: {
    isLoading: false
  },
  getters: {
    favoritesIsLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
    favoritesLoadingStart(state) {
      state.isLoading = true
    },
    favoritesLoadingEnd(state) {
      state.isLoading = false
    }
  },
  actions: {
    async addToFavorites({commit}, payload) {
      commit('favoritesLoadingStart')
      try {
        const favorites = await apiFavorites.add(payload)
        commit('favoritesLoadingEnd')
        return favorites
      } catch (e) {
        console.log(e)
        commit('favoritesLoadingEnd')
      }
    },
    async removeFromFavorites({commit}, payload) {
      commit('favoritesLoadingStart')
      try {
        const favorites = await apiFavorites.remove(payload)
        commit('favoritesLoadingEnd')
        return favorites
      } catch (e) {
        console.log(e)
        commit('favoritesLoadingEnd')
      }
    }
  }
}
