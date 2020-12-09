<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div v-if="tags" class="tag-list">
      <a
        v-for="(tag, i) in tags"
        :key="i"
        @click.prevent="
          $router.push({
            name: 'TagFeed',
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
    <Loading v-if="loading" />
    <Error v-if="errors" :errors="errors" />
    <div v-if="emptyTags" class="post-preview">
      No tags are here... yet.
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

export default {
  name: 'PopularTags',
  components: {
    Loading,
    Error
  },
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
