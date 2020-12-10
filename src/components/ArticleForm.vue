<template>
  <div>
    <ValidationErrors :errors="errors" />
    <form @submit.prevent="onSubmit">
      <fieldset>
        <fieldset class="form-group">
          <input class="form-control form-control-lg" type="text" placeholder="Article Title" v-model="title" />
        </fieldset>
        <fieldset class="form-group">
          <input class="form-control" type="text" placeholder="What's this article about?" v-model="description" />
        </fieldset>
        <fieldset class="form-group">
          <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="body"> </textarea>
        </fieldset>
        <fieldset class="form-group">
          <input class="form-control" type="text" placeholder="Enter tags" v-model="tagList" />
          <div class="tag-list"></div>
        </fieldset>
        <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'ArticleForm',
  components: {
    ValidationErrors
  },
  props: {
    initialValue: {
      type: Object,
      required: true
    },
    isSubmiting: {
      type: Boolean,
      required: true
    },
    errors: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    title: '',
    description: '',
    body: '',
    tagList: ''
  }),
  methods: {
    onSubmit() {
      const payload = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList
      }
      this.$emit('submit', payload)
    }
  }
}
</script>

<style></style>
