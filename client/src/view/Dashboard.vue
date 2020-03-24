<template>
  <v-layout class="dashboard pl-3 pr-3">
    <h1>Here can u analyse your picture</h1>
      <RouterView/>
  </v-layout>
</template>

<script>
  export default {
    name: "Dashboard",
    data: () => ({

    }),

    watch: {
    },
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/styles/view/Dashboard";
  @import "src/assets/styles/App";
</style>