<template>
  <footer class="siteFooter" id="footer">
      <div class="wrap">
        
        <span class="siteFooter__copy"><span class="siteFooter__copy__name">MY HABIT</span> 気の利く上司のようなタスク管理ツール</span>
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
    margin-top: 100px;
    line-height: 1;
      text-align: center;
      color: #bababa;
    &__copy{
      font-size: 1rem;

      &__name{
        display: inline-block;
        vertical-align: middle;
        font-family: Barlow, sans-serif;

        &:after{
          content:"";
          width: 1em;
          height: 1px;
          display: inline-block;
          vertical-align: middle;
          background-color: #bababa;
          margin-right: 1em;
          margin-bottom: 5px;
          margin-left: 1em;
        }
      }
    }
  }
</style>
