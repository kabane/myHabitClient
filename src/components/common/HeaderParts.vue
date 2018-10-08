<template>
  <header id="header">
      <router-link tag="h1" to="/" exact><a>ホーム</a></router-link>
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
