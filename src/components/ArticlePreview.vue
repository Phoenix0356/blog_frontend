<script setup lang="ts">

import {useRouter} from 'vue-router';


const props = defineProps(['article'])
const router = useRouter()
const goToArticleDetail = () => {
  router.push( `/article/${props.article.articleId}`)
}
</script>

<template>

  <el-card class="article-card"
           style="width: 100%"
           shadow="hover"
           @click="goToArticleDetail"
  >
    <el-text size="large" class="title" v-text="props.article.articleTitle"></el-text>
    <el-avatar  style=" margin-bottom: 20px;" v-if="props.article" :src="props.article.userAvatarURL" class="avatar"/>
  </el-card>
</template>

<style scoped lang="scss">
.article-card{
  position: relative;
  border-radius: 10px;
  height: 80px;

  .title {
    bottom: 30px;
    position: absolute;


  }
  .avatar{
    position: absolute;
    left: 900px;



  }
}
</style>