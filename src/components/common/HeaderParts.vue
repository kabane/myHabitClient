<template>
  <header id="header" class="siteHeader" :class="{'siteheader-notlogin' : ! isAuthorized }">
    <header-sign-in v-if="isAuthorized" />
    <header-sign-out v-else />
  </header>  
</template>

<script>
  import HeaderSignIn from './HeaderParts-sign-in'
  import HeaderSignOut from './HeaderParts-sign-out'
  import {Mixin} from '../mixins/auth.js'
  import axios from 'axios'
  import { mapGetters } from 'vuex'  
  
  export default {
    name: 'header-parts',
    mixins:[Mixin],
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
        .then(function(res) {
          this.$router.push({path: '/login'});
        }.bind(this))
        .catch(function (res) {
          this.$router.push({path: '/login'});
        }.bind(this))
      }
    },    
    components: {
      HeaderSignIn,
      HeaderSignOut
    }
  }
</script>

<style lang='scss' scoped>

  .siteHeader{

    &-notlogin {
      position: relative;
      max-width: 500px;
      margin-right: auto;
      margin-left: auto;
    }

    .wrap{
      position: relative;
      z-index: 2;    

      @media screen and ( max-width: 768px ){
        z-index: 10;
      }
    }

    &__logoarea {
      line-height: 1;
      text-align: center;

      &__description {
        margin-bottom: 1px;
        font-size: 10px;
        color: #ffffff;
      }
    }

    &__nav{
      line-height: 1;
        display: flex;

       @media screen and ( max-width: 640px ){    
        width: 100%;  
        position: fixed;
        z-index: 10;
        bottom: 0;
        left: 0;
        justify-content: center;
        background-color: #22556e;
        font-size: 1.1rem;
        letter-spacing: 0.05em;
      }        


      a{
        color:#fff;
        text-decoration: none;
        display: flex;
        align-items: center;

         @media screen and ( max-width: 640px ){  
          width: 100%;
          flex-direction: column;
          justify-content: center;
          height: 60px;
        }            


        &:before{
            content: " ";
            width: 20px;
            height: 20px;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;

            @media screen and ( max-width: 640px ){
              width: 27px;
              height: 27px;
              display: block;
              margin-right: auto;
              margin-bottom: 5px;
              margin-left: auto;
            }            
          }          
      }



      &__link{
        @media screen and ( max-width: 640px ){  
          width: 100%;

          &:not( :first-child ){
            border-left: 1px solid rgba(#fff, 0.2);
          }            
        }            
        &:not( :last-child ){
          margin-right: 40px;

           @media screen and ( max-width: 640px ){   
            margin-right: 0;
          }            
        }
      }        


      &__percentage{
          &:before{
            background-image: url(../../assets/img/icon-taskpercentage.svg);
          }
      }

      &__task{
          &:before{
            background-image: url(../../assets/img/icon-task.svg);
          }
      }
      
      &__category{
          &:before{
            background-image: url(../../assets/img/icon-category.svg);
          }
      }
    }
  }
</style>
