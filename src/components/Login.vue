<template>
	<main class="main">
    <div class="wrap">
      <errors :errors="errors"></errors>
      <div class="signin">
        <label class="signin__column">
          <span class="signin__column__label">EMAIL</span>
          <input class="signin__mail" v-model="email" type="text">
        </label>
        <label class="signin__column">
          <span class="signin__column__label">PASSWORD</span>
          <input class="signin__pass" v-model="password" type="password">
        </label>
        <div class="signin__column buttons">
          <button class="button button--primary" v-on:click="login">ログイン</button>
          <div class="signup__block">
            <div class="signup__block__index">
              ご登録がまだですか？
            </div>
            <router-link to="/sign_up" class="signup__block__link" exact>世界一かんたんなタスク管理を始めよう</router-link>
          </div>
        </div>
      </div>
    </div>
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

<style lang="scss">
html {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F6FAFB url(/assets/img/logo-bg.svg);
  background-size: cover;
}

#app {
  width: 500px;
  margin: auto;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  @media screen and ( max-width: 768px ){
    width: 500px;
    flex-shrink: 0;
  }
  @media screen and ( max-width: 640px ){    
    width: 320px;
    flex-shrink: 0;
  }
} 

.siteHeader {
  position: relative;

  .wrap {
    justify-content: center;
  }
}

.siteHeader__nav {
  display: none;
}
</style>
<style lang="scss" scoped>
.main {
 margin-top: 0;
 padding: 50px 20px ;
 background-color: #ffffff;
box-shadow: 0 0 10px 3px rgba(0,0,0,0.1);

    @media screen and (max-width: 480px) {
      padding: 20px 10px;
    }
}

.signin{
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__column {
    width: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    @media screen and (max-width: 480px) {
      width: 95%;
      flex-direction: column;
    } 


    &:not(:last-child){
      margin-bottom: 1em;
    }

    &__label {
      width: 80px;
      flex-shrink: 0;
      font-size: 0.8em;

      @media screen and (max-width: 480px) {
        width: auto;
        margin-right: auto;
        margin-bottom: 5px;
      } 
    }
    
  }

  .buttons {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
      margin-top: 1em;
      flex-direction: column;
      align-items: center;
    } 

    .button {
      width: 50%;
    }

    a {
      padding: 1.25em;
    }
  }

  &__mail {
    width: 100%;
    margin-left: 1em;

    @media screen and (max-width: 480px) {
      margin-left: 0;
    } 
  }

  &__pass {
    width: 100%;
    margin-left: 1em;

    @media screen and (max-width: 480px) {
      margin-left: 0;
    } 
  }
}

.signup__block {
  margin-top: 20px;
  text-align: center;

  &__index {
    color: #677789;
  }

  &__link {
    font-weight: bold;
  }
}
</style>
