<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ArticleForm :initialValue="initialValue" :errors="errors" :isSubmiting="isSubmiting" @submit="submit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm'
import {mapGetters} from 'vuex'

export default {
  name: 'CreateArticle',
  components: {
    ArticleForm
  },
  data: () => ({
    initialValue: {
      title: '',
      description: '',
      body: '',
      tagList: []
    }
  }),
  computed: {
    ...mapGetters({
      isSubmiting: 'articleFormLoading',
      errors: 'articleFormErrors'
    })
  },
  methods: {
    async submit(payload) {
      const article = await this.$store.dispatch('createArticle', payload)
      if (article) {
        const slug = article.data.article.slug
        this.$router.push({name: 'Article', params: {slug: slug}})
      }
    }
  }
}
</script>

<style></style>
