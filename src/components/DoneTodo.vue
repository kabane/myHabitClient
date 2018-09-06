<template>
  <p :class="todo">{{todo.name}}</p>
</template>

<script>
  export default {
    name: 'done-todo',
    props: ['todo']
  }
</script>

<style>
</style>
