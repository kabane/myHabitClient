<template>
  <header id="header" class="siteHeader">
      <div class="wrap">
        <router-link tag="h1" class="siteHeader__logo" to="/" exact><a><img src="../../assets/img/logo.svg" alt=""></a></router-link>
        <!-- <nav>
          <ul>
            <router-link tag="li" to="/categories" exact><a>カテゴリー</a></router-link>
          </ul>
        </nav> -->
      </div>
  </header>    
</template>

<script>
  export default {
    name: 'header-parts'
  }
</script>

<style lang='scss'>
  body{
    margin: 0;
  }
  .siteHeader{
    height: 90px;
    line-height: 1;
    display: flex;
    align-items: center;
    position: relative;
    background: #6DB3BF;
    background-image: linear-gradient(to left bottom, #4799B7, #7DC9DC );


    &__logo{
      margin-top: 0;
      margin-bottom: 0;
    }

    &:before{
      content:  " ";
      width: 100%;
      height: 100%;
      transform-origin: center center ;
      transform: skewY( 0.5deg );    
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      left: 0;
      background: #00D1E5;

    }    
    &:after{
      content:  " ";
      width: 100%;
      height: 200%;
      transform-origin: center center ;
      transform: skewY( -0.5deg );
      position: absolute;
      z-index: 1;
      top: -100%;
      right: 0;
      left: 0;
      background-image: linear-gradient(to right, #488DA7, #22556E );

    }
  }

</style>
