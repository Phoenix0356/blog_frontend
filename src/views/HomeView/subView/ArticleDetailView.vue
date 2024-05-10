<script setup lang="ts">
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import ArticleInterface from "../../../models/interfaces/ArticleInterface.ts";
import CountIndicator from "../../../components/CountIndicator.vue";
import Article from "../../../models/classes/Article.ts";
import {useUserInfoStore} from "../../../stores/counter.ts";
import Comments from "../../../models/classes/Comments.ts";
import CommentInterface from "../../../models/interfaces/CommentInterface.ts";
import CommentEntry from "../../../components/CommentEntry.vue";
import Collection from "../../../models/classes/Collection.ts";
import {ElNotification} from "element-plus";
import CollectionEntry from "../../../components/CollectionPreview.vue";
import CollectionInterface from "../../../models/interfaces/CollectionInterface.ts";

const router = useRouter()
const article = Article.getInstance()
const comments = Comments.getInstance()
const collection = Collection.getInstance()
const userStorage = useUserInfoStore()

const articleModel = ref<ArticleInterface>({
  collectionArticleNote: "",
  articleBookmarkCount: 0,
  articleContent: "",
  articleId: "",
  articleReadCount: 0,
  articleReviseTime: "",
  articleTitle: "",
  articleUpvoteCount: 0,
  userAvatarURL: "",
  username: ""
})

// const commentsModel = ref<CommentInterface>({
//   commentId: "",
//   commentReviseTime: "",
//   commentUpvoteCount: 0,
//   userAvatarURL: "",
//   username: "",
//   commentContent:""
// })

const allCommentsList = ref<CommentInterface[]>([])
const allCollectionList = ref<CollectionInterface[]>([])
const commentContent = ref("")
const commentDialogVisible = ref(false)
const collectionDialogVisible = ref(false)
let articleId:any = null


const clickComment = async () =>{
  commentDialogVisible.value = true
  allCommentsList.value = await comments.getArticleCommentList(articleId)
}
const clickUpdate = () => {
  router.push({
    path: '/article/post',
    query: {
      articleId: articleId
    }
  })
}

const clickPostComment = async () => {
  await comments.saveComment(commentContent.value, articleId)
  allCommentsList.value = await comments.getArticleCommentList(articleId)
  commentContent.value = ""
}

const clickUpvote = () => {
  articleModel.value.articleUpvoteCount++
}


const clickCollection = async () => {
  collectionDialogVisible.value=true;
  if (userStorage.user) {
    allCollectionList.value = await collection.getCollectionList(userStorage.user.username)
  }
}

const clickAddToCollection = async (collectionName:string) => {
  let addArticleFlag = false
  if (userStorage.user) {
    addArticleFlag = await collection.addArticleIntoCollection({
      username: userStorage.user.username,
      articleId:articleId,
      collectionName:collectionName
    })
  }
  if (addArticleFlag) {

    articleModel.value.articleBookmarkCount++;

    collectionDialogVisible.value = false
    ElNotification({
      title: 'Success',
      message: `添加到${collectionName}成功 `,
      type: 'success',
      duration: 1500,
    })
  }else {
    ElNotification({
      title: 'Failed',
      message: `文章已经在${collectionName}中`,
      type: 'error',
      duration: 1500,
    })
  }
}
const updateArticle = () => {
 article.updateArticleStatic(articleId,articleModel.value.articleReadCount+1,
     articleModel.value.articleUpvoteCount,articleModel.value.articleBookmarkCount)
}

const handleCommentClose = () => {
  commentContent.value = ""
  commentDialogVisible.value = false
}

onMounted(async ()=> {
  articleId = router.currentRoute.value.params.articleId
  articleModel.value = await article.getArticle(articleId, () => router.push("/"))
})

onBeforeRouteLeave((to)=>{
  if (to.path !== `/article/${articleId}`){
    updateArticle()
  }
})
</script>

<template>
  <div class="layout">
    <el-container class="article-container">
      <el-header  class="article-header">
        <el-text class="title" >{{ articleModel.articleTitle }}</el-text>

        <el-text class="revise-time" >最后修改：{{ articleModel.articleReviseTime.slice(0, 19) }}</el-text>

        <el-text class="read-count" >阅读次数：{{ articleModel.articleReadCount }}</el-text>

        <CountIndicator
            class="upvote-count"
            v-model="articleModel.articleUpvoteCount"
        >
          <template #icon>
            <el-icon size="20" @click="clickUpvote"><Medal /></el-icon>
          </template>
        </CountIndicator>

        <CountIndicator class="bookmark-count"
                        v-model="articleModel.articleBookmarkCount"
        >
          <template #icon>
           <el-icon size="20" @click="clickCollection"><Star /></el-icon>
          </template>
        </CountIndicator>

        <el-avatar
            class="avatar"
            :src="articleModel.userAvatarURL"/>
      </el-header>

      <el-divider class="divider" />

      <el-main class="article-main">
        <el-text class="content" v-text="articleModel.articleContent"></el-text>
      </el-main>

      <div>
        <el-button class="update_button"
                   v-if="userStorage.user&&userStorage.user.roleLevel>=2&&
                    userStorage.user.username === articleModel.username"
                   type="primary"
                   @click="clickUpdate">修改</el-button>
        <el-button class="update_button"
                   type="primary"
                   @click="clickComment">评论</el-button>
      </div>
    </el-container>
  </div>
  <el-dialog
      class="comments-dialog"
      v-model="commentDialogVisible"
      width="60%"
      title="评论"
      style="left: 10%"
      :modal="false"
      :show-close="true"
      :before-close="handleCommentClose"
  >
    <el-scrollbar max-height="300px">
      <template v-model="allCommentsList" v-if="allCommentsList&&allCommentsList.length">
        <CommentEntry
            v-for="comments in allCommentsList.values()"
            :key="comments.commentId"
            :comments="comments"
        />
      </template>
    </el-scrollbar>
    <div v-if="!userStorage.user||userStorage.user.roleLevel<1" >
      <el-input  placeholder="登录后评论"></el-input>
    </div>
    <div v-else>
      <el-input  placeholder="发一条评论吧" v-model="commentContent"></el-input>
      <el-button @click="clickPostComment">发布</el-button>
    </div>

  </el-dialog>
  <el-dialog
      class="collection-dialog"
      v-model="collectionDialogVisible"
      width="60%"
      title="收藏夹"
      style="left: 10%"
      :modal="false"
      :show-close="true"

  >
    <el-scrollbar max-height="300px">
      <template v-model="allCollectionList" v-if="allCollectionList&&allCollectionList.length">
        <collection-entry
            v-for="collection in allCollectionList.values()"
            :key="collection.collectionId"
            :collection="collection"
            @click="clickAddToCollection(collection.collectionName)"
          >
        </collection-entry>
      </template>
    </el-scrollbar>
  </el-dialog>
</template>


<style scoped lang="scss">
.layout{
  background: antiquewhite;
  .article-container{
    .article-header{
      height: 40px;
      .title{
        margin-top: 12px;
        font-size: 20px;
        position: absolute;
      }
      .revise-time{
        font-family:monospace;
        margin-top: 20px;
        margin-left: 440px;
        position: absolute;
      }
      .read-count{
        font-family:monospace;
        margin-top: 20px;
        margin-left: 650px;
        position: absolute;
      }
      .upvote-count{
        margin-top: 16px;
        margin-left: 770px;
        position: absolute;
      }
      .bookmark-count{
        margin-top: 16px;
        margin-left: 820px;
        position: absolute;
      }
      .avatar{

        margin-left: 890px;
        position: absolute;
      }
    }
    .divider{
      height: 10px;
      margin: 5px;
    }
    .article-main{
      padding: 0 20px;
      height: 455px;
      .content{
        white-space: pre-wrap;
      }
    }
    .update_button{
      margin-top: 10px;
      margin-left: 20px;
    }
  }
}

.comments-dialog{

}
</style>