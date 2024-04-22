<script setup lang="ts">

const curValue = defineModel({
  type: Number,
  required: true,
})

let isClicked = false
const add = ()=>{
  console.log(curValue.value)
  if (!isClicked){
    isClicked = true
    curValue.value += 1
  }else {
    isClicked = false
    curValue.value -= 1
  }
}
</script>

<template>
  <el-container class="container" @click="add" >
    <slot name="icon"/>
    <el-text class="value">
      {{curValue}}
    </el-text>
  </el-container>
</template>

<style scoped lang="scss">
.container{
  width: 40px;
  .value{
    margin-left: 5px;
    font-size: 15px;
  }
}
</style>