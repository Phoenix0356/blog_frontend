<script setup lang="ts">

import {useRouter} from 'vue-router';
import UserInfoPreview from "./UserInfoPreview.vue";
import {ref} from "vue";

const props = defineProps(['article'])
const router = useRouter()
const userModel = ref({
  userAvatarURL: props.article.userAvatarURL,
  username: props.article.username
})

const goToArticleDetail = () => {
  router.push( `/article/${props.article.articleId}`)
}

</script>

<template>
<div class="wrapper">
  <el-card class="article-card"
           style="width: 100%"
           shadow="hover"
           @click="goToArticleDetail"
  >
    <el-text size="large" class="title" v-text="props.article.articleTitle"></el-text>
    <user-info-preview
        v-model="userModel"
        class="userinfo"/>
  </el-card>
  <div class="slot-container">
    <slot class="operation-card" name="operationCard"/>
  </div>
</div>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
  .article-card {
    position: relative;
    z-index: 0;
    border-radius: 10px;
    height: 80px;
    .title {
      bottom: 30px;
      position: absolute;
    }

    .userinfo {
      position: absolute;
      left: 92%;
      height: 70%;
      width: 50px;
    }
  }
  .slot-container {
    position: absolute;
    width: 15%;
    top: 0;
    left: 85%;
    z-index: 1;
  }
}
</style>