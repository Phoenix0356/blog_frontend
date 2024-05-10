<script setup lang="ts">

</script>

<template>
  <el-card class="operation-card" body-style="padding: 0;">
      <el-button-group class="button-group">
        <slot></slot>
      </el-button-group>
  </el-card>
</template>

<style scoped lang="scss">
.operation-card {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  .button-group{
    padding: 10px;
    height: 100%;

  }
}
</style>