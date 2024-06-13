<script setup lang="ts">
const curValue = defineModel({
  type: Number,
  required: true,
})

</script>

<template>
  <el-container class="container" >
    <slot name="icon"/>
    <el-text class="value">
      {{curValue<999?curValue:"999+"}}
    </el-text>
  </el-container>
</template>

<style scoped lang="scss">
.container{
  width: 40px;
  .value{
    margin-left: 5px;
    font-size: 15px;
  }
}
</style>