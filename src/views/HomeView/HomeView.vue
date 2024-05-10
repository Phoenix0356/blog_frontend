<script setup lang="ts">
import { useRouter,useRoute} from 'vue-router'
import {onMounted,ref, watchEffect} from "vue";
import ArticleInterface from "../../models/interfaces/ArticleInterface.ts"
import ArticlePreview from "../../components/ArticlePreview.vue";
import Article from "../../models/classes/Article.ts";
import UserInterface from "../../models/interfaces/UserInterface.ts";
import User from "../../models/classes/User.ts";
import {useCommonStore, useUserInfoStore} from "../../stores/counter.ts";
import UserInfoPreview from "../../components/UserInfoPreview.vue";



const router = useRouter()
const route = useRoute()
const userStorage = useUserInfoStore()
const commonStorage = useCommonStore()

const user:User = User.getInstance()
const article:Article = Article.getInstance();

const userModel = ref<UserInterface>()
const allArticleList = ref<ArticleInterface[]>([]);
const buttonClicked = ref(0);

//菜单栏router
const userCollection = "/user/collection"
const userBlog = "/article/userList"
const userInfo = "/user/info"
const homePage = "/"

const goToLogin = () => {
  router.push("/user/login")
}
const goToPost = () => {
  router.push("/article/post")
}

const logout = async ()=>{
  await user.logout(()=>{
    router.push("/").then(() => window.location.reload())
  })
}

const clickSort = async (sortStrategy:number) => {
  commonStorage.setSortStrategy(sortStrategy)
  buttonClicked.value = sortStrategy
  allArticleList.value = await article.getAllArticleList(sortStrategy)
}


watchEffect( async () => {
  if (route.path === '/') {
    await clickSort(commonStorage.articleSortStrategy)
  }
})
onMounted(async () => {
  if (route.path === '/') {
      if (localStorage.getItem('token')) {
          userModel.value = await user.getUser();
          userStorage.setUser(userModel.value)
      }
    }
});

</script>

<template>
  <div class="layout" >
    <el-container >
      <el-aside class="left-container" width="200px">
        <user-info-preview
            class="left-avatar"
            v-model="userStorage.user"
        />
        <el-menu class="left-menu"
                 default-active="2"
                 text-color="#fff"
                 active-color="#fff"
                 :router = true
        >
          <el-menu-item :index="homePage">主页</el-menu-item>
          <el-menu-item :index="userInfo" >我的信息</el-menu-item>
          <el-menu-item :index="userBlog">我的博客</el-menu-item>
          <el-menu-item :index="userCollection">我的收藏夹</el-menu-item>
        </el-menu>

      </el-aside>

      <el-container class="right-container">
        <el-header class="header-box">
          <div>
            <el-button class="login-button"
                       v-if="!userStorage.user"
                       type="primary"
                       @click="goToLogin">登录</el-button>

            <el-button class="post-button"
                       v-if="userStorage.user&&userStorage.user.roleLevel>=2"
                       type="primary"
                       @click="goToPost">发布</el-button>

            <el-button class="logout-button"
                       v-if="userStorage.user"
                       type="primary"
                       @click="logout">登出</el-button>
          </div>
        </el-header>

        <el-main class="main-box">
          <template v-if="$route.path === '/'&& allArticleList&&allArticleList.length">
            <el-button-group>
              <el-button :type="buttonClicked === 0?'primary':'plain'" text @click="clickSort(0)">默认排序</el-button>
              <el-button :type="buttonClicked === 1?'primary':'plain'" text @click="clickSort(1)">按阅读量排序</el-button>
              <el-button :type="buttonClicked === 2?'primary':'plain'" text @click="clickSort(2)">按点赞数排序</el-button>
            </el-button-group>
            <div>
              <article-preview
                  v-for="article in allArticleList.values()"
                  :key="article.articleId"
                  :article="article"
              />
            </div>
          </template>
          <router-view/>
        </el-main>

        <el-footer class="right-footer" v-if="$route.path === '/'" >
          <img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" style="width: 16px; margin-left: 26%;" alt=“”>
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=33010902003837" target="_blank" >浙公网安备33010902003837号</a>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" style="margin-left: 1%">浙ICP备2024090842号</a>
        </el-footer>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.layout{
  background: url("../../assets/home-bg.jpg");
  background-size: cover;
    .left-container{
      margin:10px;
      height: 100%;
      opacity: 0.8;
      .left-avatar{
        height: 110px;
      }
      .left-menu{
        margin-top: 10px;
        height: 540px;
        background: #2c3e50;
        border-radius: 10px;
      }

    }
    .right-container {
      margin:10px;
      opacity: 0.8;
      height: 661px;
      .header-box {
        background: #f2f2f2;
        border-radius: 10px;
        .post-button{
          margin-top: 13px;
          margin-left: 5px;
        }
        .login-button{
          margin-top: 13px;
          margin-right: 10px;
        }
        .logout-button{
          margin-top: 13px;
          margin-right: 10px;
        }

      }
      .main-box {
        padding: 10px;
        margin-top: 10px;
        background: antiquewhite;
        border-radius: 10px;
      }
      .right-footer{
        padding: 10px;
        margin-top: 10px;
        height: 6%;
        background: antiquewhite;
        border-radius: 10px;
      }
    }
}
</style>
