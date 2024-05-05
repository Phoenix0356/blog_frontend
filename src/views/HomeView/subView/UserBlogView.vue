<script setup lang="ts">
import ArticlePreview from "../../../components/ArticlePreview.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ArticleInterface from "../../../models/interfaces/ArticleInterface.ts";
import Article from "../../../models/classes/Article.ts";
import {useUserInfoStore} from "../../../stores/counter.ts";

const router = useRouter()
const userArticleList = ref<ArticleInterface[]>([])
const article = Article.getInstance()
const userStorage = useUserInfoStore()


onMounted(async () => {
  if(userStorage.user) {
    userArticleList.value = await article.getUserListArticle(()=>router.push("/"))
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