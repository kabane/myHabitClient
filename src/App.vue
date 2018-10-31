<template>
  <div id="app">
    <header-parts/>
    <router-view></router-view>
    <footer-parts/>
  </div>
</template>

<script>
  import HeaderParts from './components/common/HeaderParts.vue'
  import FooterParts from './components/common/FooterParts.vue'
  
  export default {
    name: 'my-project',
    components: {
      HeaderParts,
      FooterParts
    },
    created: function() {
      var self = this

      this.$store.dispatch('getTodos')
      .then(
        function() {
          return self.$store.dispatch('getCategories')
        }
      ); 

    }
  }
</script>

<style>
  /* CSS */
</style>
