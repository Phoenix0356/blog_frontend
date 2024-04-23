<script lang="ts" setup>
import { ref} from 'vue'
import {useRouter} from "vue-router";
import UserInterface from "../models/interfaces/UserInterface.ts";
import User from "../models/classes/User.ts";

const router = useRouter()
const user = User.getInstance()

const userRef = ref()
const userModel = ref<UserInterface>({
  roleLevel: 0,
  userAvatarURL: "",
  password: "",
  username: ""
})

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


const goToRegister = () => {
  router.push('/user/register')
}
const login = async () => {
  try {
    await userRef.value.validate();
    const token:string = await user.login(userModel.value.username,userModel.value.password,
        ()=>{router.push('/')})
    localStorage.setItem('token', 'Bearer ' + token)
  } catch (error) {
    console.log(error);
    return;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title">登录</div>
      <el-form :model="userModel"
               :rules="rules"
                ref="userRef">

        <el-form-item prop="username">
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

        <el-form-item >
          <el-button type="primary" @click="login" >登录</el-button>
          <el-button type="primary" @click="goToRegister" >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" >
.login-container{
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  background-image: url("../assets/login-bg.jpg");

  .login-box{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    width: 350px;

    padding: 20px;
    background:rgba(44, 62, 80, 0.9);;
    border-radius: 8px;
    box-shadow: 2px 2px 8px #2c3e50;

    .login-title{
      font-size: 18px;
      color: #f2f2f2;
      text-align: center;
      margin-bottom: 10px;
    };
  }

}

</style>