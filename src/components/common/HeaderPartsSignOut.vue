<template>
  <header id="header" class="siteHeader siteHeader-notlogin">
    <div class="wrap">
      <h1 class="siteHeader__copy">気の利く上司のようなタスク管理ツール</h1>
      <router-link tag="h1" class="siteHeader__logo" to="" exact><a><img src="../../assets/img/logo.svg" alt=""></a></router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header-parts-sign-out'
  }
</script>

<style lang='scss' scoped>

  .siteHeader-notlogin {
    position: relative;
    max-width: 500px;
  }
  .wrap{
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
</style>
