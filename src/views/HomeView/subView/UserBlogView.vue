<script setup lang="ts">
import ArticlePreview from "../../../components/ArticlePreview.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ArticleInterface from "../../../models/interfaces/ArticleInterface.ts";
import Article from "../../../models/classes/Article.ts";
import {useUserInfoStore} from "../../../stores/counter.ts";
import User from "../../../models/classes/User.ts";

const router = useRouter()
const user:User = User.getInstance()
const userArticleList = ref<ArticleInterface[]>([])
const article = Article.getInstance()
const userStorage = useUserInfoStore()

//通过user和article对象来组装出视图需要的对象
const assembleArticleList = async () => {
  const articleList  = await article.getUserArticleList()
  const userPromises = articleList.map(async (articleModel) => {
    const userModel = await user.getUserById(articleModel.articleUserId);
    articleModel.username = userModel.username;
    articleModel.userAvatarURL = userModel.userAvatarURL;
  });
  await Promise.all(userPromises);
  return articleList
}

onMounted(async () => {
  if(userStorage.user) {
    userArticleList.value = await assembleArticleList();
  }else {
    alert("Please login")
    await router.push('/')
  }
})

</script>

<template>
<div>
    <article-preview
        v-for="article in userArticleList"
        :key="article.articleId"
        :article="article"
    />
</div>
</template>

<style scoped lang="scss">

</style>