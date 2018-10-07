<template>
  <header id="header">
      <h1>ヘッダーだよ</h1>
      <nav>
        <ul>
          <router-link tag="li" to="/categories" exact><a>カテゴリー</a></router-link>
        </ul>
      </nav>
  </header>    
</template>

<script>
  export default {
    name: 'header-parts'
  }
</script>

<style>
  /* CSS */
</style>
