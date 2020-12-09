<template>
  <div class="message">
    {{ errors }}
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['errors']
}
</script>

<style lang="scss" scoped>
.message {
  margin: 1.5rem 0;
  color: red;
}
</style>
