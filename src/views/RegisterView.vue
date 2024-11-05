<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import {ElMessage, UploadFile, UploadProps} from "element-plus";
import UserInterface from "../models/interfaces/UserInterface.ts";
import User from "../models/classes/User.ts";
import {useUserInfoStore} from "../stores/counter.ts";
import {hashPassword} from "../utils/CommonUtil.ts";

const userStorage = useUserInfoStore()
const userRef = ref()
const router = useRouter()
const userModel = reactive<UserInterface>({
  roleLevel: 0,
  userAvatarURL: "",
  password: "",
  username: ""
})
const user = User.getInstance()
const confirmPassword = ref()

const imageUrl = ref('')


let avatarBase64:any = null

const rules = {
  username:[{
    required:true,
    message:"用户名不能为空"
  }],
  password:[{
    required:true,
    message:"密码不能为空"
  }]
}
const register = async () => {
  if (userModel.password !== confirmPassword.value) {
    alert("密码和确认密码不匹配");
    return;
  }
  try {
    await userRef.value.validate();
    let cryptPassword = await hashPassword(userModel.password)
    const regUser:UserInterface = await user.register(userModel.username,cryptPassword,
        avatarBase64,()=>router.push("/"))
    userStorage.setUser( await user.getUser())
  } catch (error) {
    console.log(error);
    return;
  }
}
const fileToBase64 = (file:any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
const avatarSelected = async (uploadFile: UploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  avatarBase64 = await fileToBase64(uploadFile.raw)
  avatarBase64 = avatarBase64.split(',')[1]
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== ('image/jpeg'||'png')) {
    ElMessage.error('Avatar picture must be JPG or png format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <div class="container">
    <div class="box">
      <div class="title">注册</div>
      <el-form :model="userModel"
               :rules="rules"
               ref="userRef">
          <el-upload
              id="avatar"
              action="#"
              class="avatar-uploader"
              :key="imageUrl"
              :show-file-list="false"
              :on-change="avatarSelected"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :limit="1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar"   alt=""/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        <el-form-item class="username" prop="username">
          <el-input placeholder="请输入用户名" v-model="userModel.username" size="large"/>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="请输入密码"
                    v-model="userModel.password"
                    size="large"
                    show-password
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="确认密码"
                    v-model="confirmPassword"
                    size="large"
                    show-password
          />
        </el-form-item>

        <el-form-item >
          <el-button type="primary" @click="register" style="margin-left: 125px">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" >
.container{
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  background-image: url("../assets/login-bg.jpg");

  .box{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    width: 350px;
    height: 420px;

    padding: 20px;
    background:rgba(44, 62, 80, 0.9);;
    border-radius: 8px;
    box-shadow: 2px 2px 8px #2c3e50;

    .title{
      font-size: 18px;
      color: #f2f2f2;
      text-align: center;
      margin-bottom: 10px;
    };
    .avatar-uploader .el-upload {
      width: 130px;
      height: 130px;
      margin-left: 90px;
      border: 1px dashed var(--el-border-color);
      border-radius:  50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }

    .username{
      margin-top: 15px;
    }
  }

}

</style>