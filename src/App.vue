<template>
  <div id="app">
    <Topbar />
    <router-view />
  </div>
</template>

<script>
import Topbar from '@/components/Topbar'

export default {
  components: {
    Topbar
  },
  mounted() {
    if (!this.$store.getters.isLoggedIn) {
      this.$store.dispatch('getCurrentUser')
    }
  }
}
</script>
