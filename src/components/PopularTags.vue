<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div v-if="tags" class="tag-list">
      <a
        v-for="(tag, i) in tags"
        :key="i"
        @click.prevent="
          $router.push({
            name: 'Tag',
            params: {
              slug: tag
            }
          })
        "
        href=""
        class="tag-default tag-pill"
        >{{ tag }}‌</a
      >
    </div>
    <div v-if="loading">
      Loading tags...
    </div>
    <div v-if="errors">
      Loading error
    </div>
    <div v-if="emptyTags" class="post-preview">
      No tags are here... yet.
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'PopularTags',
  computed: {
    ...mapGetters({
      tags: 'tagsData',
      loading: 'tagsIsLoading',
      errors: 'tagsErrors'
    }),
    emptyTags() {
      return this.tags && this.tags.length === 0
    }
  },
  async mounted() {
    await this.$store.dispatch('getTags')
  }
}
</script>

<style></style>
