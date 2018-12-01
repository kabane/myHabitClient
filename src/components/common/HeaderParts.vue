<template>
  <header id="header" class="siteHeader">
      <div class="wrap">
        <router-link tag="span" class="siteHeader__back" to="/" exact><a></a></router-link>

        <router-link tag="h1" class="siteHeader__logo" to="/" exact><a><img src="../../assets/img/logo.svg" alt=""></a></router-link>
        <!-- <nav>
          <ul>
            <router-link tag="li" to="/categories" exact><a>カテゴリー</a></router-link>
          </ul>
        </nav> -->
        <nav class="siteHeader__nav">
            <div class="siteHeader__nav__link">
              <router-link class="siteHeader__nav__task" to="/" exact>タスク比率</router-link>
            </div>
            <div class="siteHeader__nav__link">
              <router-link class="siteHeader__nav__category" to="/categories" exact>カテゴリ設定</router-link>
            </div>
        </nav>
      </div>
  </header>    
</template>

<script>
  export default {
    name: 'header-parts'
  }
</script>

<style lang='scss'>

  .siteHeader{

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


      &__task{
          &:before{
            background-image: url(../../assets/img/icon-taskpercentage.svg);
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
