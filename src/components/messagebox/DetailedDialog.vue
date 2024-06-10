<script setup lang="ts">
import { PropType } from 'vue'
import MessageInterface from "../../models/interfaces/MessageInterface.ts";
import messageType from "../../models/enums/MessageType.ts";

const upvote = '点赞'
const bookmark = '收藏'
const bookmarkCancel = '取消收藏'

const determineMessageType = (message:MessageInterface):string => {
  if(message.messageType === messageType.UPVOTE.name){
    return upvote
  }else if (message.messageType === messageType.BOOKMARK.name){
    return bookmark
  }else {
    return bookmarkCancel
  }
}
const props = defineProps({
  messages: {
    type: Array as PropType<MessageInterface[]>,
    required: true,
  },
})

</script>

<template>
<el-dialog
    width="40%"
    title="最近点赞"
    style="left: 10%"
    :modal="false"
    :show-close="true">
  <el-card
      v-for="message in props.messages"
      :key="message.messageId"
  >用户{{message.messageProducerUsername}}{{determineMessageType(message)}}了您的文章《{{message.messageRelatedArticleName}}》
    <br>
    {{message.messageGenerateTime}}
  </el-card>
</el-dialog>
</template>

<style scoped lang="scss">

</style>