<script setup lang="ts">
import {PropType} from 'vue'
import MessageInterface from "../../models/interfaces/MessageInterface.ts";
import messageType from "../../models/enums/MessageType.ts";

const props = defineProps({
  messages: {
    type: Array as PropType<MessageInterface[]>,
    required: true,
  },
})

const emit = defineEmits(['close'])
const determineMessageType = (message:MessageInterface):string => {
  if(message.messageType === messageType.UPVOTE.name){
    return '点赞'
  }else if (message.messageType === messageType.BOOKMARK.name){
    return '收藏'
  }else {
    return '取消收藏'
  }
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <el-dialog
      width="40%"
      title="最近点赞"
      style="left: 10%"
      :modal="false"
      :show-close="true"
      @close="handleClose"
  >
    <el-scrollbar max-height="300px">
      <div class="entries-container">
        <div class="entry-container"
             v-for="message in props.messages"
             :key="message.messageId">
          <el-badge
              class="entry"
              is-dot
              v-show="!message.messageIsPulled"
          >
            <el-card >
              用户{{message.messageProducerUsername}}{{determineMessageType(message)}}了您的文章《{{message.messageRelatedArticleName}}》
              <br>
              {{message.messageGenerateTime}}
            </el-card>
          </el-badge>

          <el-card class="entry" v-show="message.messageIsPulled">
            用户{{message.messageProducerUsername}}{{determineMessageType(message)}}了您的文章《{{message.messageRelatedArticleName}}》
            <br>
            {{message.messageGenerateTime}}
          </el-card>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>

</template>

<style scoped lang="scss">
.entries-container{
  margin:1%;
}
.entry{
  width: 99%;
  height: 99%;
}
</style>