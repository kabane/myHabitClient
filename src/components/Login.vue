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
    <button class="button button--primary" v-on:click="login">ログイン</button>
    <router-link to="/sign_up" exact>新規登録</router-link>
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
        errors: [],
      }
		},
		computed: {
    },
    methods: {
      login () {
        let params = {
          email: this.email,
          password: this.password,     
        }

        this.$store.dispatch('auth/login', params)
        .then(function(res) {
          this.$router.push({path: '/'});
        }.bind(this))
        .catch(function(e){
          this.errors = []
          this.errors.push("認証に失敗しました。メールアドレスかパスワードが間違っています")
        }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
