<template>
  <ul class="tag-list" v-if="tags.length">
    <li v-for="(tag, i) in tags" :key="i" class="tag-default tag-pill tag-outline">{{ tag }}</li>
  </ul>
</template>

<script>
export default {
  name: 'TagList',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
