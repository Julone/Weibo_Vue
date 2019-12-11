<template>
    <div class="jDividerWrapper" :style="{marginTop:top,marginBottom:bottom}">
        <div class="ani_line right"></div>
        <h1><slot></slot></h1>
        <div class="ani_line"></div>
    </div>
</template>
<script>
export default {
    props:{
        top:{
            type:String,
            default: '0px'
        },
        bottom:{
            type:String,
            default: '0px'
        }
    }   
}
</script>
<style lang="less" scoped>
.jDividerWrapper{
    width: 35%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    // border-left: 1px solid #1890ff;
        // border-right: 1px solid #1890ff;
    h1{
        font-size: 18px;
        letter-spacing: 4px;
        line-height: 40px;
        margin: 0;
    }
}
.ani_line {
  width: 100%;
  margin: 0 auto 0px;
  height: 2px;
  overflow: hidden;

  &::before {
    content: '';
    height: inherit;
    width: 64px;
    position: relative;
    display: inline-block;
    transform: translateX(-64px);
    background: linear-gradient(90deg, rgba(24, 144, 255, 0) 0, #1890ff);
    animation: pageTitleLine 1.5s linear 0s infinite
  }
  &.right::before{
      animation-direction: reverse;
    background: linear-gradient(-90deg, rgba(24, 144, 255, 0) 0, #1890ff);
      animation-delay: 0.7s;
  }
}

    
</style>