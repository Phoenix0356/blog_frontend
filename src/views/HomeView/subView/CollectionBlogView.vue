<script setup lang="ts">
import ArticlePreview from "../../../components/ArticlePreview.vue";
import ArticleInterface from "../../../models/interfaces/ArticleInterface";
import Collection from "../../../models/classes/Collection";
import {onMounted, ref} from "vue";
import {useCollectionMapStore, useUserInfoStore} from "../../../stores/counter";
import {useRouter} from "vue-router";
import collectionInterface from "../../../models/interfaces/CollectionInterface.ts";

const router = useRouter()
const collectionArticleList = ref<ArticleInterface[]>([])
const collection = Collection.getInstance()
const userStorage = useUserInfoStore()
const collectionMapStorage = useCollectionMapStore()

const manageCollectionDialogVisible = ref(false)
const deleteCollectionDialogVisible = ref(false)

const tempCollectionName= ref('')
const tempCollectionDescription = ref('')
let collectionModel:collectionInterface = {
  collectionId:'',
  collectionDescription: "",
  collectionName: "",
  collectionReviseTime: "",
  collectionUsername: "",
};
let curCollectionId = router.currentRoute.value.params.collectionId
const clickConformUpdate = async () => {
  let updateFlag = await collection.updateCollection(collectionModel.collectionId,
      tempCollectionName.value,
      tempCollectionDescription.value
  )
  if (updateFlag){
    manageCollectionDialogVisible.value  = false
    collectionModel.collectionName = tempCollectionName.value
    collectionModel.collectionDescription = tempCollectionDescription.value
  }
}

const clickConformDelete = async () =>{
  let flag = await collection.deleteCollection(collectionModel.collectionId)
  if (flag) {
    collectionMapStorage.deleteItemInMap(collectionModel.collectionId)
    deleteCollectionDialogVisible.value = false
    await router.push("/user/collection")
  }else {
    alert("delete failed")
  }
}

onMounted(async () => {
  if (userStorage.user) {
    if (typeof curCollectionId === "string") {
      collectionArticleList.value = await collection.getAllArticleList(curCollectionId)
      collectionModel = collectionMapStorage.collectionMap[curCollectionId]
      tempCollectionName.value = JSON.parse(JSON.stringify(collectionModel.collectionName))
      tempCollectionDescription.value = JSON.parse(JSON.stringify(collectionModel.collectionDescription))
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
  <el-button type="primary" @click="manageCollectionDialogVisible = true">编辑</el-button>
  <el-button type="primary" @click="deleteCollectionDialogVisible = true">删除收藏夹</el-button>



  <el-dialog
      class="collection-dialog"
      v-model="manageCollectionDialogVisible"
      title="创建收藏夹"
  >
    <div class="collection-name">
      <el-text>收藏夹名称</el-text>
      <el-input
          style="margin-top: 1%"
          v-model="tempCollectionName"
          placeholder="请输入收藏夹名称"
          maxlength="20"
          show-word-limit>
      </el-input>
    </div>

    <div class="collection-description">
      <el-text>收藏夹简介</el-text>
      <el-input
          style="margin-top: 1%"
          v-model="tempCollectionDescription"
          type="textarea"
          :rows="10"
          placeholder="请输入收藏夹简介"
          maxlength="200"
          show-word-limit ></el-input>
    </div>
    <el-button
        class="create-btn"
        type="primary"
        @click="clickConformUpdate"
    >
      确认修改
    </el-button>
  </el-dialog>

  <el-dialog
      v-model="deleteCollectionDialogVisible"
      title="确定要删除收藏夹吗？"
      :show-close="true"
  >
    <el-button @click="clickConformDelete">确认</el-button>
    <el-button @click="deleteCollectionDialogVisible = false">取消</el-button>

  </el-dialog>
</template>

<style scoped lang="scss">

</style>