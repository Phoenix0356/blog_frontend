<script setup lang="ts">
import ArticlePreview from "../../../components/ArticlePreview.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ArticleInterface from "../../../models/interfaces/ArticleInterface.ts";
import Article from "../../../models/classes/Article.ts";

const router = useRouter()
const userArticleList = ref<ArticleInterface[]>([])
const article = Article.getInstance()
const getUserArticle = async () =>{
  userArticleList.value = await article.getUserListArticle(()=>router.push("/"))
}

onMounted(() => {
  getUserArticle()
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