<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  created(){
    this.$message.success({message:'Token字符串有误,请稍候重试,如果不行,请告知管理员',duration:100000})
  }
}
</script>