export default {
  state: {
    isSubmitting: false,
    validationErrors: null
  },
  getters: {
    settingsIsSubmitting(state) {
      return state.isSubmitting
    },
    settingsValidationErrors(state) {
      return state.validationErrors
    }
  },
  mutations: {
    updateCurrentStart(state) {
      state.isSubmitting = true
    },
    updateCurrentUserEnd(state) {
      state.isSubmitting = false
      state.validationErrors = null
    },
    updateCurrentError(state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    }
  }
}
