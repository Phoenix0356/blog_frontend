<script setup lang="ts">
import Messages from "../../models/classes/Messages.ts";
import {onMounted, ref} from "vue";
import MessageInterface from "../../models/interfaces/MessageInterface.ts";
import MessageType from "../../models/enums/MessageType.ts";
import DetailedDialog from "./DetailedDialog.vue";

const haveNewUpvoteMessage = ref(false)
const haveNewBookMarkMessage = ref(false)
const messages:Messages = Messages.getInstance()

const upvoteMessageList = ref<MessageInterface[]>([])
const bookmarkMessageList = ref<MessageInterface[]>([])

const upvoteDialogVisible = ref(false)
const bookmarkDialogVisible = ref(false)

const clickUpvote = async () => {
  bookmarkDialogVisible.value = false
  upvoteDialogVisible.value = true

  if(haveNewUpvoteMessage&&await messages.confirmMessage(MessageType.UPVOTE.value)){
    haveNewUpvoteMessage.value = false;
  }
}

const clickBookmark = async () => {
  upvoteDialogVisible.value = false
  bookmarkDialogVisible.value = true

  if(haveNewBookMarkMessage&&await messages.confirmMessage(MessageType.BOOKMARK.value)){
    haveNewBookMarkMessage.value = false;
  }
}

const clickReload = async () => {
  bookmarkDialogVisible.value = false
  upvoteDialogVisible.value = false
  await getAndClassifyMessages()
}

const getAndClassifyMessages = async () => {
  let messageList: MessageInterface[] =  await messages.getMessageList()
  upvoteMessageList.value = []
  bookmarkMessageList.value = []
  for(let message of messageList){
    if(message.messageType === MessageType.UPVOTE.name){
      if (!message.messageIsPulled){
        haveNewUpvoteMessage.value = true;
      }
      upvoteMessageList.value.push(message)
    }else{
      if (!message.messageIsPulled){
        haveNewBookMarkMessage.value = true;
      }
      bookmarkMessageList.value.push(message)
    }
  }
}
onMounted(() => {
  getAndClassifyMessages()
})
</script>

<template>
  <el-popover placement="bottom" width="150" trigger="hover">
    <template #reference>
      <el-icon v-if="!(haveNewUpvoteMessage||haveNewBookMarkMessage)" size="40"><Message /></el-icon>
      <el-badge v-if="haveNewUpvoteMessage||haveNewBookMarkMessage" is-dot>
        <el-icon size="40"><Message /></el-icon>
      </el-badge>
    </template>

    <div class="flex-column">

      <el-button class="box-button" v-if="!haveNewUpvoteMessage" @click="clickUpvote">收到的赞</el-button>
      <el-badge class="box-button" v-if="haveNewUpvoteMessage" is-dot>
        <el-button class="box-button" @click="clickUpvote">收到的赞</el-button>
      </el-badge>

      <el-button class="box-button" v-if="!haveNewBookMarkMessage" @click="clickBookmark">收藏我的</el-button>
      <el-badge class="box-button" v-if="haveNewBookMarkMessage" is-dot>
        <el-button class="box-button" @click="clickBookmark">收藏我的</el-button>
      </el-badge>

      <el-button class="box-button" @click="clickReload">刷新</el-button>
    </div>
  </el-popover>

  <DetailedDialog
      v-model="upvoteDialogVisible"
      :messages = upvoteMessageList.values()
  />

  <DetailedDialog
      v-model="bookmarkDialogVisible"
      :messages = bookmarkMessageList.values()
  />



</template>

<style scoped lang="scss">
.box-button{
  width: 100%;
  margin-left: 0 !important;
}
</style>