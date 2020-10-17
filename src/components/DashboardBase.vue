<template>
	<main class="main">
    <div class="wrap ">
      <section class="appSection">
        <h2 class="appSection__index">ダッシュボード</h2>
        <chart></chart>
      </section>
    </div>
  </main>
</template>

<script>
  import Chart from './Chart';

  export default {
    components: {
      Chart,
    }
  }
</script>

<style lang="scss" scoped>
</style>
