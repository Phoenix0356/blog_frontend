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
  .userinfo{
    position: absolute;
    left: 900px;
    height: 70%;
    width: 50px;
  }
}
</style>