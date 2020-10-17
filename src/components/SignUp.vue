<template>
  <div>
    <header-parts/>
  	<main class="main-notlogin">
      <div class="wrap">
        <errors :errors="errors"></errors>
          <div class="signup">
            <label class="signup__column">
              <span class="signup__column__label">EMAIL</span>
              <input class="signup__mail" v-model="email" type="email">
            </label>
            <label class="signup__column">
              <span class="signup__column__label">PASSWORD</span>
              <input class="signup__pass" v-model="password" type="password">
            </label>      
            <label class="signup__column">
              <span class="signup__column__label">PASSWORD <br>CONFIRM</span>
              <input class="signup__pass" v-model="password_confirmation" type="password">
            </label>     
            <div class="signup__column signup__column--button">
              <button class="button button--primary" v-on:click="sign_up">新規登録して始める</button>
            </div>           
            <div class="signup__block">
              <router-link to="/login" exact>ログイン画面に戻る</router-link>
            </div>            
          </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Errors from './common/Errors.vue'
  import HeaderParts from './common/HeaderParts'  
  
  export default {
    name: 'category',
    components: {
      Errors,
      HeaderParts
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


.signup{
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

    &--button {
      margin-top: 40px;
      display: flex;
      justify-content: center;
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
  text-align: center;

  &__index {
    font-weight: bold;
  }
}
</style>
