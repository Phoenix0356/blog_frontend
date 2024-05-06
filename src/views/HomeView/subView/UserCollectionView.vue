<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {useUserInfoStore} from "../../../stores/counter.ts";
  import Collection from "../../../models/classes/Collection.ts";
  import CollectionInterface from "../../../models/interfaces/CollectionInterface";
  import collectionInterface from "../../../models/interfaces/CollectionInterface";
  import CollectionEntry from "../../../components/CollectionPreview.vue";
  import { ArrowRight } from '@element-plus/icons-vue'
  import {useRouter} from "vue-router";

  const createCollectionModel = ref<collectionInterface>({
    collectionDescription: "",
    collectionId: "",
    collectionName: "",
    collectionReviseTime: "",
    collectionUsername: ""
  })
  const collectionList = ref<CollectionInterface[]>([])
  const userStorage = useUserInfoStore()
  const collection = Collection.getInstance()
  const createCollectionDialogVisible = ref(false)
  const router = useRouter()

  const curCollectionName = ref('')
  const articleBreadcrumbVisible = ref(false)

  const gotoCollection = (collectionName:string,collectionId:string) => {
    articleBreadcrumbVisible.value = true
    curCollectionName.value = collectionName;
    router.push( `/user/collection/${collectionId}`)
  }

  const clickConformCreate = async () => {
    let flag = false
    if (userStorage.user) {
     flag = await collection.createCollection({
        collectionUsername: userStorage.user.username,
        collectionName: createCollectionModel.value.collectionName,
        collectionDescription:createCollectionModel.value.collectionDescription
      })
      collectionList.value = await collection.getCollectionList(userStorage.user.username)
    }
    if (flag) {
      createCollectionDialogVisible.value = false
    }
  }

  onMounted(async () => {
    if (userStorage.user) {
      collectionList.value = await collection.getCollectionList(userStorage.user.username)
    }else {
      alert("Please login")
      await router.push('/')
    }
  })
</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/user/collection' }">我的收藏夹</el-breadcrumb-item>
      <el-breadcrumb-item v-if="articleBreadcrumbVisible" :to="{ path: `/user/collection/${curCollectionName}`}">{{curCollectionName}}中的文章</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <template v-if="$route.path === '/user/collection'">
        <collection-entry
              class="collections"
              v-for="collection in collectionList"
              :key="collection.collectionId"
              :collection="collection"
              @click="gotoCollection(collection.collectionName,collection.collectionId)"
          >
        </collection-entry>
        <el-button @click="createCollectionDialogVisible = true">创建收藏夹</el-button>

      </template>
      <router-view/>
    </div>

  </div>
  <el-dialog
      class="collection-dialog"
      v-model="createCollectionDialogVisible"
      title="创建收藏夹"
  >
    <div class="collection-name">
      <el-text>收藏夹名称</el-text>
      <el-input
          style="margin-top: 1%"
          v-model="createCollectionModel.collectionName"
          placeholder="请输入收藏夹名称"
          maxlength="20"
          show-word-limit>
      </el-input>
    </div>

    <div class="collection-description">
      <el-text>收藏夹简介</el-text>
      <el-input
          style="margin-top: 1%"
          v-model="createCollectionModel.collectionDescription"
          type="textarea"
          :rows="10"
          placeholder="请输入收藏夹简介"
          maxlength="200"
          show-word-limit ></el-input>
    </div>
    <el-button
        class="create-btn"
        type="primary"
        @click="clickConformCreate"
    >
      确认创建
    </el-button>

  </el-dialog>
</template>


<style scoped lang="scss">
.collection{
  border-radius: 10px;
  height: 200px;
}

.collection-dialog{
  //.collection-name{
  //
  //}
  .collection-description{
    margin-top: 3%;
  }
  .create-btn{
    margin-top: 2%;
  }
}

</style>