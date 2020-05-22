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


.errors {
  margin-top: 0;
  margin-left: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
  padding: 1em;
  border-radius: 2px;
  background-color: #ffdadf;

  &:empty {
    display: none;
  }

  li {
    padding: 0em;
    margin-left: 0;
    list-style: none;
    margin-top: 0;

    &:not(:last-child){
      margin-bottom: 10px;
    }
  }
}
</style>
