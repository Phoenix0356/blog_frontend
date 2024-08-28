<script setup lang="ts">
import {ElMessage, ElNotification, UploadFile, UploadProps} from "element-plus";
import Files from "../models/classes/Files.ts";

let uploadedFiles:any = []
let endPointInd:number = 0
const files = Files.getInstance()

const beforeFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== ('csv'||'xlsx'||'txt')) {
    ElMessage.error('请上传目标格式文件!')
    return false
  }
  return true
}

const fileSelected = async (uploadFile: UploadFile) => {
  const chunkSize = 1024 * 2; // 1MB
  if (uploadFile.raw) {
    const chunks = Math.ceil(uploadFile.raw.size / chunkSize);
    //对文件进行分块
    for (let i = 0; i < chunks; i++) {
      uploadedFiles[i] = uploadFile.raw.slice(i * chunkSize, (i + 1) * chunkSize)
    }
  }
}

const confirmUpload = async() =>{
  let isSuccess = true
  for (let i = 0; i < uploadedFiles.length; i++) {
    let chunk = uploadedFiles[i]
    endPointInd = i;
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('index', endPointInd.toString())
    formData.append('totalChunks', uploadedFiles.length);

    //失败重传
    if (!await files.uploadFile(formData)){
      let retryCnt = 3;
      isSuccess =false
      while (retryCnt>0){
        retryCnt--;
        if (await files.uploadFile(formData)){
          isSuccess = true;
          break;
        }
      }
    }
  }
  if (isSuccess) {
    ElNotification({
      title: 'Success',
      message: `文件上传成功 `,
      type: 'success',
      duration: 1500,
    })
  } else {
    ElNotification({
      title: 'Failed',
      message: `文件上传失败`,
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
        :on-change="fileSelected"
        :before-upload="beforeFileUpload"
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