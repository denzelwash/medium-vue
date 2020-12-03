<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="#/@aji">
        <img src="https://static.productionready.io/images/smiley-cyrus.jpg" />
      </a>

      <div class="info">
        <a class="author" href="#/@aji">aji</a>
        <span class="date">December 2, 2020</span>
      </div>

      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        <span class="ng-binding ng-scope">
          1
        </span>
      </button>
    </div>

    <a class="preview-link" href="#">
      <h1>test</h1>
      <p>
        test
      </p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline">
          test
        </li>
      </ul>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  async mounted() {
    await this.$store.dispatch('getFeed', {url: this.apiUrl})
  }
}
</script>

<style lang="scss" scoped>
.article-meta {
  display: flex;
  .btn-sm {
    margin-left: auto;
  }
}
</style>
