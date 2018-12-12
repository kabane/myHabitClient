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

      this.$store.dispatch('getTodos')
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

  ///////////////////
  // fonts
  ///////////////////

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
  $space_m : 50px;
  $space_l : 70px;

  $space_s_sp : 20px;
  $space_m_sp : 30px;
  $space_l_sp : 50px;



  //////////////////////
  // fonts
  /////////////////////
  $fontsize_s		: #{( 15 / 16)}em;
  $fontsize_m		: #{( 22 / 16)}em;
  $fontsize_m_sp	: #{( 20 / 13)}em;
  $fontsize_l		: #{( 26 / 16)}em;
  $fontsize_l_sp	: #{( 22 / 16)}em;
  // $fontsize_xl	: #{( 24 / 16)}em;
  // $fontsize_xl_sp	: #{( 22 / 13)}em;

  $fontsize_index_m : $fontsize_m;
  $fontsize_index_l : $fontsize_l;



  //////////////////////
  // color
  /////////////////////
  $color_border: #BBBBBB;
  $color_disabled: #bababa;
  $color_primary: #22556E;
  $paleblue: #F6FAFB;
  $color_accent: #00D1E5;


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
      letter-spacing: 0.1em;
  }
  a,
  input,
  textarea,
  button,
  select,
  option{
    outline:none;
  }

  input,
  textarea,
  button,
  select,
  option{
    cursor: pointer;
    font-size: 1em;
  }

  input,
  textarea,
  select,
  option{
    padding: 25px 10px;
    box-sizing: border-box;
    border: 1px solid $color_border;
    border-radius: 5px;
    background-color: #ffffff;

    @media screen and ( max-width: 640px ){
      padding-top: 15px;
      padding-bottom: 15px;
    }


    &::placeholder{
      color: #d8d8d8;
    }

    @media screen and ( min-width: 768px ){
      &:hover{
        background-color: $paleblue;
     }
    }
    &:focus,
    &:active{
      background-color: $paleblue;
    }
  }


  select{
    padding: 0 20px;
    -webkit-appearance: none;

    background: #fff url(assets/img/icon-select.svg) right 10px center no-repeat;
  }



  /*******************
  component
  *******************/
  .wrap {
    max-width: 900px;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
  .wrap--tiny{
    max-width: 600px;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }


  .appSection{
    & + .appSection{
      margin-top: $space_l;

        @media screen and ( max-width: 640px ){
          margin-top: $space_l_sp;
        }
    }
  }  

  .appSection{
    &__index{
      margin-top: 0;
      margin-bottom: $space_s;
      font-weight: bold;
      font-size: $fontsize_l;

        @media screen and ( max-width: 640px ){
          margin-bottom: $space_s_sp;
          font-size: $fontsize_l_sp;
          align-items: flex-start;
          flex-direction: column;
        }         
    }

    &__footer{
      margin-top: $space_l;
    }
  }


////////// ボタン

.buttons {
  display: flex;
  margin-right: -10px;
  margin-left: -10px;
  @media screen and ( max-width: 640px ){
    margin-right: -5px;
    margin-left: -5px;
  }
  @media screen and ( max-width: 320px ){
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    margin-left: 0;
  }    

  .button{
    width: 100px;
    height: 40px;
    padding: 0;
    line-height: 1;
    display: flex;
    margin-right: 10px;
    margin-left: 10px;

    @media screen and ( max-width: 640px ){
      width: 88px;
      margin-right: 5px;
      margin-left: 5px;
    }       
    @media screen and ( max-width: 320px ){
      width: 75%;
      margin-right: auto;
      margin-left: auto;

      &:not( :first-child ){
        margin-top: 10px;
      }
    }       
  }
}

.button{
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 2px;
  font-size: 1em;
  color: #ffffff;
  cursor: pointer;
  background-color: $color_primary ;

  @media screen and ( min-width: 768px ){
    &:not( .button--disaled ):not( [disabled]):hover{
      opacity: 0.85;
    }
  }
  &:not( .button--disaled ):not( [disabled]):focus,
  &:not( .button--disaled ):not( [disabled]):active{
      opacity: 0.85;
  }


  &[disabled],
  &--disabled{
    background-color: $color_disabled;
    cursor: not-allowed;
  }

  &--start,
  &--stop,
  &--done
  {
    &:before{
      content:" ";
      width: 1em;
      height: 1em;
      margin-right: 5px;
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: 0 0;
    }   
  }


  &--start{
    &:before{
      background-image: url(./assets/img/icon-play.svg);
    }
  }
  &--stop{
    &:before{
      background-image: url(./assets/img/icon-stop.svg);
    }
  }
  &--done{
    &:before{
      background-image: url(./assets/img/icon-done.svg);
    }
  }
}

.backlink{
  &:before{
    content: " ";
    display: inline-block;
    width: 0.618em;
    height: 0.618em;
    margin-right: 3px;
    border-top: 1px solid currentColor;
    border-left: 1px solid currentColor;
    transform: rotate(-45deg);
  }
}



////////// ラベル
.labels{
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
  padding: 0;

  .label{
    margin: 5px;
  }
}
  .label{
    line-height: 1;
    padding: 7px 10px 7px;
    color: #fff;
    display: inline-block;
    border-radius: 2px;
    background-color: $color_accent;

    &:before{
      content:" ";
      width: 1em;
      height: 1em;
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: 0 0;
    }    

    &--category{
      &:before{
        background-image: url( ./assets/img/icon-category.svg );
      }
    }
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


.main{
  margin-top: $space_l;
}
</style>
