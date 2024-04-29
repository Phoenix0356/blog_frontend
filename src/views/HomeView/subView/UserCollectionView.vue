<script setup lang="ts">
  import ArticleInterface from "../../../models/interfaces/ArticleInterface.ts";
  import {onMounted, ref} from "vue";
  import {useUserInfoStore} from "../../../stores/counter.ts";
  import Collection from "../../../models/classes/Collection.ts";
  import ArticlePreview from "../../../components/ArticlePreview.vue";


  const collectionArticleList = ref<ArticleInterface[]>([])
  const userStorage = useUserInfoStore()
  const collection = Collection.getInstance()
  const getArticleList = async () => {
    if (userStorage.user){
      collectionArticleList.value = await collection.getAllArticleList(userStorage.user.username)
    }
  }

  onMounted(() => {
    getArticleList()
  })
</script>

<template>
  <div>
    <article-preview
        v-for="article in collectionArticleList"
        :key="article.articleId"
        :article="article"
    />
  </div>
</template>

<style scoped lang="scss">

</style>