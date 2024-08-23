<script setup lang="ts">
import {ElMessage, ElNotification, UploadFile, UploadProps} from "element-plus";
import Files from "../models/classes/Files.ts";

let uploadedFile:any = null

const files = Files.getInstance()

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== ('csv'||'xlsx'||'txt')) {
    ElMessage.error('请上传目标格式文件!')
    return false
  }
  return true
}
const avatarSelected = async (uploadFile: UploadFile) => {
  uploadedFile = uploadFile
}
const confirmUpload = async() =>{
  console.log(uploadedFile)
  const formData = new FormData();
  formData.append('file', uploadedFile.raw);
  const isSuccess = await files.uploadFile(formData);
  if(isSuccess){
    ElNotification({
      title: 'Success',
      message: `文件${uploadedFile.name}上传成功 `,
      type: 'success',
      duration: 1500,
    })
  }else {
    ElNotification({
      title: 'Failed',
      message: `文件${uploadedFile.name}上传失败`,
      type: 'error',
      duration: 1500,
    })
  }
}
</script>

<template>
  <el-dialog>
    <el-upload
        id="file"
        action="#"
        :show-file-list="true"
        :on-change="avatarSelected"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :limit="1"
    >
      <el-button type="primary">敏感词文件上传</el-button>
      <template #tip>
        <div>
          请上传csv/xlsx/txt格式文件
        </div>
      </template>
    </el-upload>
    <el-button type="primary" @click="confirmUpload">确定上传</el-button>

  </el-dialog>
</template>

<style scoped lang="scss">

</style>