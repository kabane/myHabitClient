<template>
  <header id="header" class="siteHeader siteHeader--signin">
      <div class="wrap">
          <h1 class="siteHeader__copy">気の利く上司のようなタスク管理ツール</h1>
        <router-link tag="h1" class="siteHeader__logo" to="" exact><a><img src="../../assets/img/logo.svg" alt=""></a></router-link>

      </div>
  </header>    
</template>

<script>
  export default {
    name: 'header-parts-signin'
  }
</script>

<style lang='scss'>
  .siteHeader{

      .wrap{
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }

      &__copy{
        line-height: 1;
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: #ffffff;
        font-weight: 400;
        font-size: 1.2rem;
      }

    &__nav{
      line-height: 1;
        display: flex;

       @media screen and ( max-width: 640px ){   
        width: 100%;  
        position: fixed;
        bottom: 0;
        left: 0;
        justify-content: center;
        background-color: #22556e;
      }        


      a{
        color:#fff;
        text-decoration: none;
        display: flex;
        align-items: center;

         @media screen and ( max-width: 640px ){   
          width: 100%;
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
    }
  }
</style>
