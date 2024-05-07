<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute,useRouter} from "vue-router";
import Article from "../../../models/classes/Article.ts";


const router = useRouter()
const route = useRoute()
const articleId = ref<string>(<string>route.query.articleId)
const article = Article.getInstance()

const articleForm = reactive({
  title:'',
  content:''
})
const postArticle = async () =>{
  await article.saveArticle(articleForm, () => router.push("/"))
}

const updateArticle = () => {
  article.updateArticleContent(articleId.value,articleForm.title,
      articleForm.content,()=> router.push(`/article/${articleId.value}`))
}

const deleteArticle = async () => {
  await article.deleteArticle(articleId.value,() => router.push("/"))
}

onMounted(async () => {
  if (articleId.value){
    const articleModel = await article.getArticle(articleId.value,)
    articleForm.title = articleModel.articleTitle
    articleForm.content = articleModel.articleContent
  }
})
</script>

<template>
<div>
  <el-container class="post-container">
    <el-form :model="articleForm"
             label-width="auto"
             style="max-width: 100%">
      <el-form-item label="title">
        <el-input
            style="width: 3000px"
            placeholder="请输入标题"
            v-model="articleForm.title"
            maxlength="30"
            show-word-limit/>
      </el-form-item>
      <el-form-item  label="content">
        <el-input
            rows="22"
            type="textarea" placeholder="请输入正文"
            v-model="articleForm.content"
            maxlength="4000"
            show-word-limit/>
      </el-form-item>
      <el-button style="margin-left: 63px" v-if="articleId" type="primary" @click="updateArticle">确认修改</el-button>
      <el-button style="margin-left: 20px" v-if="articleId" type="primary" @click="deleteArticle">确认删除</el-button>
      <el-button style="margin-left: 63px" v-else type="primary" @click="postArticle">确认发布</el-button>
    </el-form>

  </el-container>
</div>
</template>

<style scoped lang="scss">

</style>