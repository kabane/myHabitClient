<template>
  <div class="wrap">
    <h1 class="siteHeader__copy">気の利く上司のようなタスク管理ツール</h1>
    <router-link tag="h1" class="siteHeader__logo" to="" exact><a><img src="../../assets/img/logo.svg" alt=""></a></router-link>
  </div>
</template>

<script>
  export default {
    name: 'header-parts-sign-out'
  }
</script>

<style lang='scss' scoped>
  .wrap{
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
</style>
