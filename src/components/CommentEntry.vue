<script setup lang="ts">


const props = defineProps(['comment'])

</script>

<template>
<div v-if="props.comment">
  <el-avatar  :src="props.comment.userAvatarURL"/>
  <el-text >{{props.comment.commentContent}}</el-text>
  <el-text>最后修改：{{props.comment.commentReviseTime}}</el-text>
</div>
</template>

<style scoped lang="scss">

</style>