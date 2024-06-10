<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>

  <RouterView/>

</template>

<style lang="scss" >
html, body, #app {
  width: 100vw;
  height: 100vh;
  //height: 100%;
  margin: 0;
  padding: 0;
}
.flex-row{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.flex-column{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
