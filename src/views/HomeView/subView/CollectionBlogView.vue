<script setup lang="ts">
import ArticlePreview from "../../../components/ArticlePreview.vue";
import ArticleInterface from "../../../models/interfaces/ArticleInterface";
import Collection from "../../../models/classes/Collection";
import {onMounted, ref} from "vue";
import {useCollectionMapStore, useUserInfoStore} from "../../../stores/counter";
import {useRouter} from "vue-router";
import collectionInterface from "../../../models/interfaces/CollectionInterface.ts";
import OperationCard from "../../../components/OperationCard.vue";


const router = useRouter()
const collectionArticleList = ref<ArticleInterface[]>([])
const collection = Collection.getInstance()
const userStorage = useUserInfoStore()
const collectionMapStorage = useCollectionMapStore()

const manageCollectionDialogVisible = ref(false)
const deleteCollectionDialogVisible = ref(false)
const manageRemarkDialogVisible = ref(false)

const tempCollectionName= ref('')
const tempCollectionDescription = ref('')
const articleNote = ref({
  articleId: '',
  articleNote: ''
})
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

const clickRead = (articleId:string) => {
  router.push(`/article/${articleId}`)
}

const clickRemove = async (articleId:string) => {
  if (typeof curCollectionId === "string") {
    let isDeleted = await collection.deleteCollectionArticle(curCollectionId, articleId)
    if(isDeleted){
      collectionArticleList.value = await collection.getAllArticleList(curCollectionId)
    }
  }
}

const clickNote = async (articleId:string,collectionArticleNote:string) => {
  articleNote.value.articleNote = collectionArticleNote
  articleNote.value.articleId = articleId
  manageRemarkDialogVisible.value = true
}

const clickConformNote = async ()=>{
  if (typeof curCollectionId === "string") {
    let isSuccess = await collection.saveArticleNoteIntoCollection(curCollectionId, {
      articleId: articleNote.value.articleId,
      articleNote: articleNote.value.articleNote
    })
    if (isSuccess){
      manageRemarkDialogVisible.value = false
      for(let article of collectionArticleList.value){
        if(article.articleId === articleNote.value.articleId) {
          article.collectionArticleNote = articleNote.value.articleNote
        }
      }
    }
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
      class="article-preview"
      v-for="article in collectionArticleList.values()"
      :key="article.articleId"
      :article="article"
  >
    <template #operationCard>
      <operation-card class="operation-card">
        <el-button @click="clickRead(article.articleId)">阅读</el-button>
        <el-button @click="clickRemove(article.articleId)">移除</el-button>
        <el-tooltip
            :content="'备注：'+article.collectionArticleNote"
            placement="left"
        >
          <el-button @click="clickNote(article.articleId,article.collectionArticleNote)">备注</el-button>
        </el-tooltip>
      </operation-card>
    </template>
  </article-preview>
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

  <el-dialog
      v-model="manageRemarkDialogVisible"
      :show-close="true"
  >
    <el-text>备注：</el-text>
    <el-input v-model="articleNote.articleNote"
              type="textarea"
              placeholder="添加备注"
              maxlength="30"
              show-word-limit
    >
    </el-input>
    <el-button type="primary" @click="clickConformNote">确认</el-button>
  </el-dialog>
</template>

<style scoped lang="scss">
</style>