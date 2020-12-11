<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ArticleForm v-if="loadArticle" :initialValue="initialValue" :errors="errors" :isSubmiting="isSubmiting" @submit="submit" />
          <Loading v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm'
import Loading from '@/components/Loading'
import {mapGetters} from 'vuex'

export default {
  name: 'EditArticle',
  components: {
    ArticleForm,
    Loading
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      article: 'getEditArticle',
      loadArticle: 'editArticleLoadComplete'
    }),
    isSubmiting() {
      return false
    },
    errors() {
      return {}
    },
    initialValue() {
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  methods: {
    async submit(payload) {
      const article = await this.$store.dispatch('editArticle', {slug: this.article.slug, ...payload})
      if (article) {
        const slug = article.data.article.slug
        this.$router.push({name: 'Article', params: {slug: slug}})
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getArticleForEdit', this.$route.params.slug)
  }
}
</script>

<style></style>
