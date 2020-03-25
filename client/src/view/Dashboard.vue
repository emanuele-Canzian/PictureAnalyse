<template>
  <v-layout class="dashboard pa-4">
    <div>
    <h1>Here can u analyse your picture</h1>
      <RouterView/>
    </div>
  </v-layout>
</template>

<script>
  export default {
    name: "Dashboard",
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/styles/view/Dashboard";
  @import "src/assets/styles/App";
</style>