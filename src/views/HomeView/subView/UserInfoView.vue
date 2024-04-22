<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "../../../router";
import {useUserInfoStore} from "../../../stores/counter.ts";


const userStorage = useUserInfoStore()

const userAvatarURL = ref('')
const username = ref('')

onMounted(() => {
  if (userStorage.user){
    userAvatarURL.value = userStorage.user.userAvatarURL
    username.value = userStorage.user.username
  }else {
    alert("Please login")
    router.push('/')
  }
})
</script>

<template>
<el-container direction="vertical">
  <el-avatar size="large" class="avatar" :src="userAvatarURL"/>
  <el-text  size="large" class="username">用户名：{{username}}</el-text>
</el-container>
</template>

<style scoped lang="scss">
.layout{
  .avatar{

  }
  .username{
    margin-top: 20px;
      font-size: 20px;
  }
}
</style>