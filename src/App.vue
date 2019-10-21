<template>
  <div id="app">
    <navBar />
    <router-view />
    <!-- <footerBar /> -->
  </div>
</template>

<script>
export default {
  components:{
    navBar:()=>import('@/components/Public/Above/navBar'),
    footerBar:()=>import('@/components/Public/Footer/footerBar')
  }
}
</script>

<style lang="less">
  @import './assets/css/app/normalize.less';
  @import './assets/css/app/app.less';
  #nprogress{
    .peg{
      box-shadow: 0 0 10px #ff5400, 0 0 5px #ff8d15 !important;
    }
    .bar{
      background: #E8C064 !important;
    }
  } 
  .el-form-item.is-success {
    @successColor: #67C23A;
    .el-input__inner,.el-input__validateIcon::before {
        border-color: @successColor !important;
    }
  }
  .el-form-item.is-error {
    @successColor: #f09191 !important;
    .el-input__inner,.el-input__validateIcon::before {
        border-color: @successColor !important;
    }
    .el-form-item__error{
      color: @successColor;
    }
  }
</style>
