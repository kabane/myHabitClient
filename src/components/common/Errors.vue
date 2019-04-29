<template>
    <ul class="errors">
      <li v-for="error in errors">
        {{error}}
      </li>
    </ul>
</template>

<script>
  export default {
    name: 'errors',
    props: ['errors'],
  }
</script>

<style lang="scss" scoped>
</style>
