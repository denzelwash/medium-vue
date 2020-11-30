<template>
  <div>
    <ul class="error-messages">
      <li v-for="(e, i) in errors" :key="i">{{ `${i}: ${e.join(', ')}` }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: ['errors']
}
</script>

<style lang="scss" scoped>
.error-messages li {
  text-align: left;
}
</style>
