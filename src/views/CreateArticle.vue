<template>
  <div class="editor-page ng-scope">
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
      tags: ''
    },
    errors: null,
    isSubmiting: false
  }),
  methods: {
    submit(payload) {
      console.log(payload)
    }
  }
}
</script>

<style></style>
