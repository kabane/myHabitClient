<template>
	<main class="main">
    <errors :errors="errors"></errors>
    <label>
      EMAIL:
      <input v-model="email" type="text">
    </label>
    <label>
      PASSWORD:
      <input v-model="password" type="text">
    </label>
    <label>
      CONFIRMATION:
      <input v-model="password_confirmation" type="text">
    </label>
    <button class="button button--primary" v-on:click="sign_up">新規登録</button>
    <router-link to="/login" exact>ログイン</router-link>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Errors from './common/Errors.vue'
  
  export default {
    name: 'category',
    components: {
      Errors
    },
    data: function () {
      return {
        email: '',
        password: '',
        password_confirmation: '',
        errors: []
      }
		},
		computed: {
    },
    methods: {
      sign_up () {
        let params = {
          email: this.email,
          password: this.password,  
          password_confirmation: this.password_confirmation   
        }

        this.$store.dispatch('auth/signUp', params)
        .then(function(res) {
          this.$router.push({path: '/'});
        }.bind(this))
        .catch(function(e){
          let res = e.response,
          error_message = res.data.error_message

          this.onErrorCatch(error_message)
        }.bind(this))        
      },
      onErrorCatch (message) {
        this.errors = []
        this.errors.push(message)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
