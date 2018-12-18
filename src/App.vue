<template>
  <div id="app">
    <header-parts/>
    <router-view></router-view>
    <footer-parts/>
  </div>
</template>

<script>
  import HeaderParts from './components/common/HeaderParts.vue'
  import FooterParts from './components/common/FooterParts.vue'
  
  export default {
    name: 'my-project',
    components: {
      HeaderParts,
      FooterParts
    },
    created: function() {
      var self = this

      this.$store.dispatch('todo/getAll')
      .then(
        function() {
          return self.$store.dispatch('getCategories')
        }
      ); 

    }
  }
</script>

<style lang="scss">
  /*******************
  variables
  *******************/

  //////////

  // fonts

  //////////

  $fontFamily :'Noto Sans JP', sans-serif;
  $fontFamily_en : 'Barlow', sans-serif;


  // $basefontColor : $basefontColor;
  $basefontSize : 1rem;
  $baselineHeight : 1.75;

  $fontsize_text: 1.5em;



  //////////////////////

  // layouts 

  /////////////////////

  //column
  $innerWidth: 1000px;
  $outerWidth:1200px;

  //margin / padding
  $space_s : 40px;
  $space_m : $space_s*1.5;
  $space_l : $space_m*2;

  $space_s_sp : 20px;
  $space_m_sp : $space_s_sp*1.5;
  $space_l_sp : $space_s_sp*2.5;



  //////////////////////

  // fonts

  /////////////////////
  $fontsize_s		: #{( 12 / 16)}em;
  $fontsize_m		: #{( 22 / 16)}em;
  $fontsize_m_sp	: #{( 16 / 13)}em;
  $fontsize_l		: #{( 26 / 16)}em;
  $fontsize_l_sp	: #{( 20 / 13)}em;
  // $fontsize_xl	: #{( 24 / 16)}em;
  // $fontsize_xl_sp	: #{( 22 / 13)}em;

  $fontsize_index_m : $fontsize_m;
  $fontsize_index_l : $fontsize_l;



  /*******************
  setting
  *******************/
  html{
      font-size: 10px;
      font-weight: 300;
      font-family: 'Noto Sans JP', serif;
  }
  body{
      margin: 0;
      font-size: 1.6rem;
      letter-spacing: 0.12em;
  }
  .wrap {
       max-width: 900px;
      width: 90%;
      margin-right: auto;
      margin-left: auto;
      position: relative;
      z-index: 2;
  }  


  /*******************
  module
  *******************/
  .siteHeader {
  height: 90px;
  line-height: 1;
  display: flex;
  align-items: center;
  position: relative;
  background: #6DB3BF;
  background-image: linear-gradient(to left bottom, #4799B7, #7DC9DC);

  @media screen and ( max-width: 640px ){  
    height: 80px;
  }

  .wrap {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

     @media screen and ( max-width: 640px ){  
      justify-content: center;
    }
  }


    ///////// 戻るボタン
  &__back{
      display: none;
      a{
          width: 100%;
          height: 100%;
        display: block;
      }
        width: 15px;
        height: 15px;
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        transform: rotate( 45deg );
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
  }


  &__logo {
    margin-top: 0;
    margin-bottom: 0;
  }

  &:before {
    content: " ";
    width: 100%;
    height: 100%;
    transform-origin: center center;
    transform: skewY(0.5deg);
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    background: #00D1E5;

     @media screen and ( max-width: 640px ){  
      transform: skewY(1deg);
    }

  }

  &:after {
    content: " ";
    width: 100%;
    height: 200%;
    transform-origin: center center;
    transform: skewY(-0.5deg);
    position: absolute;
    z-index: 1;
    top: -100%;
    right: 0;
    left: 0;
    background-image: linear-gradient(to right, #488DA7, #22556E);

     @media screen and ( max-width: 640px ){  
      transform: skewY(-1deg);
    }
  }
}
</style>
