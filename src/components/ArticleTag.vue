<script setup lang="ts">
const props = defineProps(['tag'])
</script>

<template>
  <el-check-tag
      :checked="true"
      class="tag"
      size="large"
      type="primary"
  >
    {{props.tag.tagContent}}
  </el-check-tag>
</template>

<style scoped lang="scss">

</style>