<template>
  <div class='home_left'>
    <el-menu router :default-active="act">
      <el-menu-item index="/home">
        <i class="el-icon-house"></i>
        <span slot="title">微博首页</span>
      </el-menu-item>
      <el-menu-item index='/home/hot'>
        <i class="el-icon-guide"></i>
        <span slot="title">热门排行</span>
      </el-menu-item>
      <el-menu-item index="/home/follow">
        <i class="el-icon-news"></i>
        <span slot="title">关注中心</span>
      </el-menu-item>
      <el-menu-item index="/home/favor">
        <i class="el-icon-collection"></i>
        <span slot="title">收藏中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
  .home_left {
    width: 230px;
    .el-menu{
      border:none;
      .el-menu-item{
        .is-active{
          background: gray;
        }
      }
    }
  }
</style>
<script>
  export default {
    data(){
      return {
        act:this.$route.path
      }
    },
    mounted() {
    }
  }
</script>