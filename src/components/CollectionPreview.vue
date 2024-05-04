<script setup lang="ts">

const props = defineProps(['collection'])

</script>

<template>
  <el-card
      class="collection-card"
      shadow="hover"
  >
    <el-text class="name">{{props.collection.collectionName}}</el-text>
    <el-text class="revise-time">{{props.collection.collectionReviseTime.slice(0, 19)}}</el-text>
  </el-card>
</template>

<style scoped lang="scss">
.collection-card{
  position: relative;
  border-radius: 10px;
  height: 80px;
  .name{
    margin-left: 1%;
  }
  .revise-time{
    position: absolute;
    left: 80%;
  }
}
</style>