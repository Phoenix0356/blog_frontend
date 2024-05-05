<script setup lang="ts">
import ArticlePreview from "../../../components/ArticlePreview.vue";
import ArticleInterface from "../../../models/interfaces/ArticleInterface";
import Collection from "../../../models/classes/Collection";
import {onMounted, ref} from "vue";
import {useUserInfoStore} from "../../../stores/counter";
import {useRouter} from "vue-router";

const router = useRouter()
const collectionArticleList = ref<ArticleInterface[]>([])
const collection = Collection.getInstance()
const userStorage = useUserInfoStore()
let collectionName = router.currentRoute.value.params.collectionName
const getArticleList = async (username:string,collectionName:string) => {
  collectionArticleList.value =  await collection.getAllArticleList(username,collectionName)
}
onMounted(async () => {
  if (userStorage.user) {
    if (typeof collectionName === "string") {
      await getArticleList(userStorage.user.username, collectionName)
    }
  }
})
</script>

<template>
  <article-preview
      v-for="article in collectionArticleList"
      :key="article.articleId"
      :article="article"
  />
</template>

<style scoped lang="scss">

</style>