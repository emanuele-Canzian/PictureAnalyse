<template>
  <v-app class="fill-height">
    <v-container fluid fill-height class="pa-0">
    <RouterView/>
    </v-container>
  </v-app>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style lang="scss" scoped>
  @import "src/assets/styles/App";
</style>
