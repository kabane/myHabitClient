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
    <button class="button button--primary" v-on:click="sign_up">ログイン</button>
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

        this.$store.dispatch('auth/login', params)
        .then(function () {
          console.log('success')
          _this.email = '';
          _this.password = '';
        })
        .then(function(res) {
          this.$router.push({path: '/'});
        }.bind(_this))        
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
