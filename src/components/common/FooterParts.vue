<template>
  <footer class="siteFooter" id="footer">
      <div class="wrap">
        <span class="siteFooter__copy"><span class="siteFooter__copy__name">© Copyright MY HABIT All Rights Reserved.</span></span>
      </div>
  </footer>    
</template>

<script>
  export default {
    name: 'footer-parts'
  }
</script>

<style lang="scss">
  /* CSS */
  .siteFooter{
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #bababa;
    
    @media screen and ( max-width: 640px ){
      height: 50px;
      position: relative;
      z-index: 1;
    }


    span{
      @media screen and ( max-width: 640px ){
        display: block;
      }        
    }


    &__copy{
      font-size: 1rem;

      &__name{
        display: inline-block;
        vertical-align: middle;
        font-family: Barlow, sans-serif;

        @media screen and ( max-width: 640px ){  
          margin-bottom: 0.5em;
        }        

        // &:after{
        //   content:"";
        //   width: 1em;
        //   height: 1px;
        //   display: inline-block;
        //   vertical-align: middle;
        //   background-color: #bababa;
        //   margin-right: 1em;
        //   margin-bottom: 5px;
        //   margin-left: 1em;

        //     @media screen and ( max-width: 640px ){  
        //       display: none;
        //     }
        // }
      }
    }
  }
</style>
