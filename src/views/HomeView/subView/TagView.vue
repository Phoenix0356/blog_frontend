<script setup lang="ts">
import Tag from "../../../models/classes/Tag.ts";
import {onMounted, ref} from "vue";
import TagInterface from "../../../models/interfaces/TagInterface.ts";

const tag = Tag.getInstance()

const allTagsList = ref<TagInterface[]>([])

const tagDialogVisible = ref(false)

const tagModel = ref<TagInterface>({
  tagId:"",
  tagContent:""
})
const checked = ref(false)
const getAllTagList = async () => {
  allTagsList.value = await tag.getAllTagList()
}

const clickTag = () => {
  tagDialogVisible.value = true
}

const clickConfirm = async () => {
  await tag.saveTag(tagModel.value)
  await getAllTagList()
  tagDialogVisible.value = false
  tagModel.value.tagContent = ''
}

onMounted(async () => {
  await getAllTagList()
})
</script>

<template>
  <el-container class="tag-container">
    <el-text class="">现有标签：</el-text>
    <el-container class="tag-pool">
      <el-check-tag
          :checked="true"
          class="tag"
          size="large"
          type="primary"
          v-for="tag in allTagsList.values()"
          :key="tag.tagId"
          @click="clickTag"
      >
        {{tag.tagContent}}
      </el-check-tag>
      <el-button  class="tag" @click="clickTag">+</el-button>
    </el-container>
  </el-container>

  <el-dialog
      v-model="tagDialogVisible"
      title="标签"
      style="left: 10%"
      :modal="false"
      :show-close="true"
  >
    <el-text >标签内容</el-text>
    <el-input maxlength="10"
              show-word-limit
              type="textarea"
              placeholder="请输入正文"
              v-model="tagModel.tagContent"
    >{{tagModel.tagContent}}</el-input>
    <el-button @click="clickConfirm()">确认</el-button>
  </el-dialog>

</template>

<style scoped lang="scss">
.layout{
  margin-left: 1%;
  .tag-container {
    display: block;
    .tag-pool {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 50%;
    }
  }



  .tag {
    margin: 2% 2% 2% 0;
  }
}

</style>