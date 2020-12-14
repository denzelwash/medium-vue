<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ValidationErrors :errors="settingsValidationErrors" />
          <form @submit.prevent="submit">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="form.image" />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Username" v-model="form.username" />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="form.bio"> </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="form.email" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                  autocomplete="new-password"
                  v-model="form.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" type="submit" :disabled="settingsIsSubmitting">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'Settings',
  components: {
    ValidationErrors
  },
  methods: {
    submit() {
      this.$store.dispatch('update', this.form)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'GlobalFeed'})
    }
  },
  computed: {
    ...mapGetters(['settingsIsSubmitting', 'settingsValidationErrors', 'currentUser']),
    form() {
      return {
        image: this.currentUser.image,
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: ''
      }
    }
  }
}
</script>

<style></style>
