<template>
  <button
    class="btn btn-sm"
    :class="[localFavorited ? 'btn-primary' : 'btn-outline-primary']"
    @click="onClick"
    :disabled="favoritesIsLoading"
  >
    <i class="ion-heart"></i>
    <span>&nbsp;{{ localCount }} </span>
  </button>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LikeBtn',
  props: ['isFavorited', 'count', 'slug'],
  data() {
    return {
      localCount: this.count,
      localFavorited: this.isFavorited
    }
  },
  computed: {
    ...mapGetters(['favoritesIsLoading'])
  },
  methods: {
    onClick() {
      if (this.localFavorited) {
        this.$store.dispatch('removeFromFavorites', this.slug).then(() => {
          this.localCount--
        })
      } else {
        this.$store.dispatch('addToFavorites', this.slug).then(() => {
          this.localCount++
        })
      }
      this.localFavorited = !this.localFavorited
    }
  }
}
</script>

<style></style>
