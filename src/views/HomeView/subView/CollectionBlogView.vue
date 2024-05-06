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
let curCollectionId = router.currentRoute.value.params.collectionId
const getArticleList = async (collectionId:string) => {
  collectionArticleList.value =  await collection.getAllArticleList(collectionId)
}
onMounted(async () => {
  if (userStorage.user) {
    if (typeof curCollectionId === "string") {
      await getArticleList(curCollectionId)
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