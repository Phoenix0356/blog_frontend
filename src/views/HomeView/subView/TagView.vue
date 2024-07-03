<script setup lang="ts">
import Tag from "../../../models/classes/Tag.ts";
import {onMounted, ref} from "vue";
import TagInterface from "../../../models/interfaces/TagInterface.ts";
import ArticleTag from "../../../components/ArticleTag.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import RequestTypeEnum from "../../../models/enums/RequestTypeEnum.ts";

const tag = Tag.getInstance()
const tagRef = ref()
const allTagsList = ref<TagInterface[]>([])
const tagDialogVisible = ref(false)
const popoverVisible = ref(false)
let buttonType = ''
const tagModel = ref<TagInterface>({
  tagId:"",
  tagContent:""
})

const getAllTagList = async () => {
  allTagsList.value = await tag.getAllTagList()
}

const deleteTag = async (tagId:string) => {
  allTagsList.value = allTagsList.value.filter(tag=> tag.tagId !== tagId)
  await tag.deleteTage(tagId)
}

const clickAdd = (requestType:string) => {
  if (buttonType !== requestType) {
    clearTagModel()
  }
  buttonType = requestType
  tagDialogVisible.value = true
}

const clickUpdate = (requestType:string, tag:TagInterface) => {
  popoverVisible.value = false
  buttonType = requestType
  tagModel.value.tagId = tag.tagId
  tagModel.value.tagContent = tag.tagContent
  tagDialogVisible.value = true
}

const clickConfirm = async (requestType:string) => {
  await tagRef.value.validate();
  if(requestType === RequestTypeEnum.UPDATE.name){
    await tag.updateTag(tagModel.value)
  }else if(requestType === RequestTypeEnum.SAVE.name){
    await tag.saveTag(tagModel.value)
  }
  await getAllTagList()
  tagDialogVisible.value = false
  clearTagModel()
}

const clearTagModel = () => {
  tagModel.value.tagId = ''
  tagModel.value.tagContent = ''
}

onMounted(async () => {
  await getAllTagList()
})

const clickDelete = (tagId:string) => {
  ElMessageBox.confirm(
      '确定要删除这个tag吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteTag(tagId)
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {})
}

const rules = {
  tagContent:[{
    required:true,
    message:"标签名不能为空"
  },{
    max:10,
    message:"标签名过长"
  }]
}
</script>

<template>
  <el-container class="tag-container">
    <el-text class="">现有标签：</el-text>
    <el-container class="tag-pool">
      <el-popover
          class="popover"
          v-for="tag in allTagsList.values()"
          :key="tag.tagId"
          width="10%"
          v-model="popoverVisible"
      >
        <div style="display: flex; justify-content: center;">
          <el-button size="small" type="primary" @click="clickUpdate(RequestTypeEnum.UPDATE.name,tag)">修改</el-button>
          <el-button size="small" type="primary" @click="clickDelete(tag.tagId)">删除</el-button>
        </div>
        <template #reference>
          <article-tag
              :checked="true"
              class="tag"
              size="large"
              type="primary"
              :tag="tag"
          />
        </template>
      </el-popover>
      <el-button  class="tag" @click="clickAdd(RequestTypeEnum.SAVE.name)">+</el-button>
    </el-container>
  </el-container>

  <el-dialog
      v-model="tagDialogVisible"
      title="标签"
      style="left: 10%"
      :modal="false"
      :show-close="true"
  >
    <el-form
        :model="tagModel"
        :rules="rules"
        ref="tagRef"
    >
      <el-form-item label="标签名" prop="tagContent">
        <el-input
            :maxlength="10"
            placeholder="请输入标签名"
            v-model="tagModel.tagContent"
            show-word-limit
        />
      </el-form-item>
    </el-form>
    <el-button @click="clickConfirm(buttonType)">确认</el-button>
  </el-dialog>

</template>

<style scoped lang="scss">
.layout{
  .tag-container {
    display: block;
    margin: 1% 0 0 1%;
    .popover {
      z-index: 0;
      .tag-pool {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 50%;
      }
    }
  }

  .tag {
    margin: 2% 2% 2% 0;
  }

  .button{
    margin: 0 1% 0 0 ;
  }
}

</style>