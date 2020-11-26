<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'Login'}">Have an account?</router-link>
          </p>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  v-model="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>
              <button
                :disabled="loading"
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Sign up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {},
  data: () => ({
    username: '',
    email: '',
    password: ''
  }),
  computed: {
    loading() {
      return this.$store.getters.isSubmitting
    }
  },
  methods: {
    async onSubmit() {
      const user = await this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      if (user) {
        this.$router.push({name: 'Home'})
      }
    }
  }
}
</script>
