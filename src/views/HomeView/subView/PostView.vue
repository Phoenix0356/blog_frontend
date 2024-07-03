<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute,useRouter} from "vue-router";
import Article from "../../../models/classes/Article.ts";
import Tag from "../../../models/classes/Tag.ts";
import ArticleTag from "../../../components/ArticleTag.vue";
import TagInterface from "../../../models/interfaces/TagInterface.ts";

const router = useRouter()
const route = useRoute()
const articleId = ref<string>(<string>route.query.articleId)
const article = Article.getInstance()
const tag = Tag.getInstance()

const allTagList = ref<TagInterface[]>([])
const tagClickedMap = ref<Map<string, boolean>>(new Map());

const tagDialogVisible = ref(false)

const clickedTags = ref({
  articleId: articleId.value,
  tagIdList:[] as string[]
})

const articleForm = reactive({
  title:'',
  content:''
})

const clickPostArticle = async () =>{
  let postedArticle = await article.saveArticle(articleForm, () => router.push("/"))
  clickedTags.value.articleId = postedArticle.articleId
  await tag.updateTagToArticle(clickedTags.value)
}

const clickAddTag = async () => {
  tagDialogVisible.value = true
  allTagList.value = await tag.getAllTagList()
  //第一次点击按钮时初始化tagClickedSet,后续点击不需要初始化
  if (tagClickedMap.value.size === 0) {
    for (let tagElement of allTagList.value) {
        tagClickedMap.value.set(tagElement.tagId, false)
    }
  }
}

const clickUpdateArticle = async () => {
  await article.updateArticleContent(articleId.value,articleForm.title,
      articleForm.content,()=> router.push(`/article/${articleId.value}`))
  await tag.updateTagToArticle(clickedTags.value)
}

const clickUpdateTag = async () => {
  tagDialogVisible.value = true
  allTagList.value = await tag.getAllTagList()

  //第一次点击按钮时初始化tagClickedSet,后续点击不需要初始化
  if (tagClickedMap.value.size === 0) {
    let articleTagSet = new Set((await tag.getArticleTagList(articleId.value)).map(tag => tag.tagId))
    for (let tagElement of allTagList.value) {
      if (articleTagSet.has(tagElement.tagId)) {
        tagClickedMap.value.set(tagElement.tagId, true)
      } else {
        tagClickedMap.value.set(tagElement.tagId, false)
      }
    }
  }
}

const clickTag = (tagId:string) => {
    if (tagClickedMap.value.get(tagId)){
      tagClickedMap.value.set(tagId, false)
    }else {
      tagClickedMap.value.set(tagId, true)
    }
}

const clickConfirmTag = async() => {
  clickedTags.value.tagIdList = []
  tagClickedMap.value.forEach((value,key)=>{
    if(value){
      clickedTags.value.tagIdList.push(key)
    }
  })
  tagDialogVisible.value = false
}

const clickDeleteArticle = async () => {
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
      <el-form-item class="title" label="title">
        <el-input
            style="width: 3000px"
            placeholder="请输入标题"
            v-model="articleForm.title"
            maxlength="30"
            show-word-limit/>
      </el-form-item>
      <el-form-item  class="content" label="content">
        <el-input
            rows="22"
            type="textarea" placeholder="请输入正文"
            v-model="articleForm.content"
            maxlength="4000"
            show-word-limit/>
      </el-form-item>
    </el-form>
  </el-container>
  <div v-if="articleId">
    <el-button class="left-most-button" type="primary" @click="clickUpdateArticle">确认修改</el-button>
    <el-button class="button" type="primary" @click="clickDeleteArticle">确认删除</el-button>
    <el-button class="button" type="primary" @click="clickUpdateTag()">修改标签</el-button>
  </div>
  <div  v-else>
    <el-button class="left-most-button" type="primary" @click="clickPostArticle">确认发布</el-button>
    <el-button class="button" type="primary" @click="clickAddTag()">添加标签</el-button>
  </div>
</div>
  <el-dialog
      v-model="tagDialogVisible"
      title="标签"
      style="left: 10%"
      :modal="false"
      :show-close="true"
  >
    <el-text class="">现有标签：</el-text>
      <el-container class="tag-pool">
        <article-tag
            class="tag"
            v-for="tag in allTagList.values()"
            :key="tag.tagId"
            :tag="tag"
            :checked="tagClickedMap.get(tag.tagId)"
            @click="clickTag(tag.tagId)"
        />

      </el-container>
      <el-button type="primary" @click="clickConfirmTag">确认</el-button>
  </el-dialog>

</template>

<style scoped lang="scss">

.tag-pool{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 50%;
}

.left-most-button{
  margin-left: 6%;
}
.button{
  margin-left: 2%
}
.tag{
  margin: 2% 2% 2% 0;
}

</style>