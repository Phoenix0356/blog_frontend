<script setup lang="ts">
import {Edit} from '@element-plus/icons-vue'
import Comments from "../models/classes/Comments.ts";
import {ref} from "vue";
import CommentInterface from "../models/interfaces/CommentInterface.ts";
import {useUserInfoStore} from "../stores/counter.ts";

const props = defineProps(['comments'])
const commentsModel = ref<CommentInterface>(JSON.parse(JSON.stringify(props.comments)))
const comments = Comments.getInstance()
const dialogVisible = ref(false)
const userStorage = useUserInfoStore()

const tempComment = ref({
  commentContent:commentsModel.value.commentContent
})

const commentRef = ref()
const rules = {
  commentContent:[{
    required:true,
    message:"评论不能为空"
  }]
}
const clickConfirmUpdate = async () => {
  try {
    await commentRef.value.validate()
    await comments.updateComment(commentsModel.value.commentId, tempComment.value.commentContent)
    commentsModel.value = await comments.getComment(commentsModel.value.commentId)

    dialogVisible.value = false
  }catch (error){
    console.log(error)
    return;
  }
}

</script>

<template>
<div>
  <el-avatar  :src="commentsModel.userAvatarURL"/>
  <el-text >{{commentsModel.commentContent}}</el-text>
  <el-text >最后修改：{{commentsModel.commentReviseTime}}</el-text>
  <el-button v-if="userStorage.user&&userStorage.user.username === commentsModel.username" :icon="Edit" circle @click="dialogVisible = true"/>
</div>
<el-dialog
    v-model="dialogVisible"
    title="修改评论"
    :show-close="true"
>
  <el-form
      :model="tempComment"
      :rules="rules"
      ref="commentRef"
  >
    <el-form-item prop="commentContent">
      <el-input v-model="tempComment.commentContent"
                rows="20"
                maxlength="200"
                show-word-limit
      />
    </el-form-item>
    <el-button type="primary" @click="clickConfirmUpdate">确认</el-button>
  </el-form>
</el-dialog>
</template>

<style scoped lang="scss">

</style>