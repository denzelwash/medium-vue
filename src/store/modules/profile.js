import profileApi from '@/api/profile'

export default {
  state: () => ({
    data: null,
    isLoading: false,
    errors: null
  }),
  getters: {
    profileData(state) {
      return state.data
    },
    profileIsLoading(state) {
      return state.isLoading
    },
    profileErrors(state) {
      return state.errors
    }
  },
  mutations: {
    getProfileStart(state) {
      state.data = null
      state.isLoading = true
    },
    getProfileEnd(state, payload) {
      state.data = payload
      state.isLoading = false
    },
    getProfileError(state, payload) {
      state.isLoading = false
      state.errors = payload
    }
  },
  actions: {
    async getProfile({commit}, payload) {
      commit('getProfileStart')
      try {
        const userProfile = await profileApi.getProfile(payload)
        commit('getProfileEnd', userProfile.data.profile)
        return userProfile.data.profile
      } catch (e) {
        commit('getprofileError', e)
      }
    }
  }
}
