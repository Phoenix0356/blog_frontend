<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "../../../router";
import {useUserInfoStore} from "../../../stores/counter.ts";
import {getUserRole} from "../../../utils/CommonUtil.ts";
import User from "../../../models/classes/User.ts";
import UserInterface from "../../../models/interfaces/UserInterface.ts";

const userRef = ref()
const rules = {
  username:[{
    required:true,
    message:"用户名不能为空"
  },{
    max:20,
    message:"用户名过长"
  }]
}

const dialogVisible = ref(false)
const userStorage = useUserInfoStore()
const user = User.getInstance()
let userModel = null
const tempUserModel = ref<UserInterface>({
  password: "",
  roleLevel: 0,
  userAvatarURL: "",
  username:""
})
const updateUserInfo = async () => {
    await userRef.value.validate();
    if (userStorage.user&&tempUserModel.value.username !== userStorage.user.username) {
      userModel = await user.updateUser(tempUserModel.value.username)
      if (userModel) {
        userStorage.setUser(userModel)
        dialogVisible.value = false
      }
    }else {
      alert("新用户名与之前相同")
    }

}


onMounted(() => {
  if (userStorage.user){
    tempUserModel.value = JSON.parse(JSON.stringify(userStorage.user))
  }else {
    alert("Please login")
    router.push('/')
  }
})

const handleClose = () => {
  if (userStorage.user) {
    tempUserModel.value.username = userStorage.user.username
  }
  dialogVisible.value = false;
}

</script>

<template>
<el-container class="root" direction="vertical">
  <el-avatar class="avatar" size="large" :src="tempUserModel.userAvatarURL"/>
  <el-text  class="username" size="large">用户名：{{ tempUserModel.username }}</el-text>
  <el-text  class="userRole" size="large">身份：{{ getUserRole(tempUserModel.roleLevel) }}</el-text>
  <el-button class="update_button" size="large" type="primary" plain @click="dialogVisible = true">修改</el-button>
</el-container>
  <el-dialog
      class="dialog"
      v-model="dialogVisible"
      title="用户信息"
      :show-close="true"
      :before-close="handleClose"
  >
    <el-form :model="tempUserModel"
             :rules="rules"
             ref="userRef"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="tempUserModel.username" :maxlength="20"/>
      </el-form-item>
    </el-form>
    <el-button @click="handleClose">取消</el-button>
    <el-button @click="updateUserInfo" >确认</el-button>
  </el-dialog>

</template>

<style scoped lang="scss">
.root{
  display: flex;
  flex-direction: column;
  align-items: center;

  .username{
    margin-top: 20px;
    font-size: 20px;
  }
  .userRole{
    margin-top: 20px;
    font-size: 20px;
  }
  .update_button{
    margin-top: 38%;
  }
}
</style>