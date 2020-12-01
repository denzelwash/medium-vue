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
          <ValidationErrors
            :errors="validationErrors"
            v-if="validationErrors"
          />
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
import ValidationErrors from '@/components/ValidationErrors'
import {mapGetters} from 'vuex'

export default {
  name: 'Register',
  components: {ValidationErrors},
  data: () => ({
    username: '',
    email: '',
    password: ''
  }),
  computed: {
    ...mapGetters({
      loading: 'isSubmitting',
      validationErrors: 'validationErrors'
    })
  },
  methods: {
    async onSubmit() {
      try {
        const user = await this.$store.dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        if (user) {
          console.log(user)
          this.$router.push({name: 'Home'})
        }
      } catch (e) {
        this.errors = e
      }
    }
  },
  mounted() {
    this.$store.commit('clearValidationErrors')
  }
}
</script>
