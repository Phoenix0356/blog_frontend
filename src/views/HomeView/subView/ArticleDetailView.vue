<script setup lang="ts">
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import ArticleInterface from "../../../models/interfaces/ArticleInterface.ts";
import CountIndicator from "../../../components/CountIndicator.vue";
import Article from "../../../models/classes/Article.ts";
import {useUserInfoStore} from "../../../stores/counter.ts";

const router = useRouter()
const article = Article.getInstance()
const userStorage = useUserInfoStore()

const articleModel = ref<ArticleInterface>({
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

let articleId:any = null

const goToUpdate = () => {
  router.push({
    path: '/article/post',
    query: {
      articleId: articleId
    }
  })
}

const updateArticle = () => {
 article.updateArticleStatic(articleId,articleModel.value.articleReadCount+1,
     articleModel.value.articleUpvoteCount,articleModel.value.articleBookmarkCount)
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
            <el-icon size="20"><Medal /></el-icon>
          </template>
        </CountIndicator>

        <CountIndicator class="bookmark-count"
                        v-model="articleModel.articleBookmarkCount"
        >
          <template #icon>
           <el-icon size="20"><Star /></el-icon>
          </template>
        </CountIndicator>

        <el-avatar class="avatar" :src="articleModel.userAvatarURL"/>
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
                   @click="goToUpdate">修改</el-button>
      </div>


    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout{
  background: antiquewhite;
  .article-container{
    .article-header{
      height: 50px;
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
        margin-top: 5px;
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
      height: 445px;
    }
    .update_button{
      margin-top: 10px;
      margin-left: 20px;
    }
  }
}
</style>