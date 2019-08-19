<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Weather/>
  </div>
</template>

<script>

import Weather from '@/components/Weather.vue'

export default {
  name: 'home',
  components: {
    Weather
  }
}
</script>

<style scoped>
  .home{
    height: 100%;
  }
</style>