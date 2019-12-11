<template>
    <div class="home_container">
        <div class="__container">
            <HomeLeft  style="margin-top:10px"/>
            <router-view style="margin-top:10px"></router-view>
            <HomeRight style="margin-top:10px" />
        </div>
       
    </div>
</template>
<script>
    export default {
        components: {
            HomeLeft: () => import('@/components/Home/HomeLeft.vue'),
            HomeRight: () => import('@/components/Home/HomeRight.vue')
        }
    }
</script>
<style lang="less" scoped>
    .__container {
        display: flex;
        justify-content: space-between;
        width: 1000px;
        margin: 0px auto;

    }
    .home_container{
        overflow: hidden;
        max-height: calc(100vh - @nav_height);
        background: url('./../../assets/img/price-bg-c3663ebd9d.svg') left bottom / 100%  no-repeat;

    }
    .bg{
        position: fixed;
        z-index: -1;
        width: 100%;
        height: 60%;left: 0;
        bottom: 0;
        pointer-events: none;

        .bg_left{
            width: 400px;
            img{
                width: 100%;
            }
        }
    }
</style>