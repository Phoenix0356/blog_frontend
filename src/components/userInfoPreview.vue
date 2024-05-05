<script setup lang="ts">
import {onMounted,  ref} from "vue";
interface userPreview{
  userAvatarURL:string
  username:string

}

const userModel = defineModel<userPreview>()

const avatar = ref<HTMLDivElement|null>(null)

// const userAvatarURL = computed(() => userModel.value ?
//     userModel.value.userAvatarURL
//     : "http://localhost:8093/avatar/default.jpg"
// )
// const username = computed(() => userModel.value ?
//     userModel.value.username
//     : "未登录"
// )

onMounted(() => {
  if (avatar.value) {
    avatar.value.style.height = `${avatar.value.clientWidth}px`
  }
})
</script>

<template>
<div class="root">
  <div ref="avatar" class="avatar-wrapper">
    <el-avatar class="avatar" :src="userModel?userModel.userAvatarURL:'http://localhost:8093/avatar/default.jpg'"/>
  </div>
  <el-text  class="username" >{{userModel?userModel.username : "未登录"}}</el-text>
</div>
</template>

<style scoped lang="scss">
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
  .avatar-wrapper {
    width: 40%;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .username {
    margin-top: 5%;
    color: #181818;
    font-size: 15px;
  }
}

</style>