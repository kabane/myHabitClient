<template>
	<main class="main">
    <label>
      EMAIL:
      <input v-model="email" type="text">
    </label>
    <label>
      PASSWORD:
      <input v-model="password" type="text">
    </label>
    <button class="button button--primary" v-on:click="sign_up">新規登録</button>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'category',
    components: {
    },
    data: function () {
      return {
        email: '',
        password: ''
      }
		},
		computed: {
    },
    methods: {
      sign_up () {
        var _this = this,
            params = {
              email: this.email,
              password: this.password,     
            }

        this.$store.dispatch('auth/signUp', params)
        .then(function () {
          console.log('success')
          _this.email = '';
          _this.password = '';
        })        
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
