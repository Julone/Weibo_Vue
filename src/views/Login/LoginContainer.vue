<template>
    <div class="container">
        <div class="wrapper">
            <router-view></router-view>
            <footerBar />
        </div>
    </div>
</template>
<script>
export default {
    components:{
        footerBar:()=>import('@/components/Public/Footer/footerBar')
    }
}
</script>

<style scoped lang="less">
    @import './../../assets/css/app/app_var.less';
    .container {
        margin: 0 auto;
        padding: 30px 10px;
        height: calc(100vh - @nav_height);
        width: 100%;
        display: flex;
        justify-content: center;
        background: url(./../../assets/img/social.svg) white bottom center/105% no-repeat;
            box-sizing: border-box;
        .wrapper{
            max-width: 400px;
            
        }
    }
</style>