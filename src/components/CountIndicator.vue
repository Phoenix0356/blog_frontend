<script setup lang="ts">
const props = defineProps({
  curValue: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required:true
  }
});

</script>

<template>
  <el-container class="container" >
    <div class="icon-val">
      <slot name="icon"/>
      <el-text class="value">
        {{props.curValue<=999?props.curValue:"999+"}}
      </el-text>
    </div>
    <el-text class="state">
      {{props.message}}
    </el-text>

  </el-container>

</template>

<style scoped lang="scss">
.container{
  width: 40px;
  display: flex;
  flex-direction: column;
}
.icon-val{
  display: flex;
  flex-direction: row;
}
.value{
  margin-left:5px;
  margin-bottom: 3px;
  font-size: 15px;
}
.state{
  font-size: 12px;
}
</style>