<template>
  <header id="header" class="siteHeader">
      <div class="wrap">
        <router-link tag="h1" class="siteHeader__logo" to="/" exact><a><img src="../../assets/img/logo.svg" alt="my HABIT -気の利く上司のようなタスク管理ツール"></a></router-link>
        <!-- <nav>
          <ul>
            <router-link tag="li" to="/categories" exact><a>カテゴリー</a></router-link>
          </ul>
        </nav> -->
        <nav class="siteHeader__nav">
            <div class="siteHeader__nav__link">
              <router-link class="siteHeader__nav__percentage" to="/" exact>タスク比率</router-link>
            </div>
            <div class="siteHeader__nav__link">
              <router-link class="siteHeader__nav__task" to="/todos" exact>タスク一覧</router-link>
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

    .wrap{
      position: relative;
      z-index: 2;    

      @media screen and ( max-width: 768px ){
        z-index: 10;
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
