<template>
	<main class="main">
    <ul class="errors">
      <li v-for="error in errors">
        {{error}}
      </li>
    </ul>
    <label>
      EMAIL:
      <input v-model="email" type="text">
    </label>
    <label>
      PASSWORD:
      <input v-model="password" type="text">
    </label>
    <button class="button button--primary" v-on:click="login">ログイン</button>
  </main>
</template>

<script>
	import axios from 'axios'
  import { mapGetters } from 'vuex'
  export default {
    name: 'category',
    components: {
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
        var _this = this,
            params = {
              email: this.email,
              password: this.password,     
            }

        this.$store.dispatch('auth/login', params)
        .then(function () {
          _this.errors = []
          _this.email = '';
          _this.password = '';
        })
        .then(function(res) {
          this.$router.push({path: '/'});
        }.bind(_this))
        .catch(function(e){
          this.errors.push("認証に失敗しました。メールアドレスかパスワードが間違っています")
        }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
