<template>
    <div class="home_wrapper">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeName:'home'
        }
    }
}
</script>
<style lang="less" scoped>
.home_wrapper{
    width: 100%;
    max-width: @home_wrapper_width;
    margin:  0 auto;
    .nav{
        display: flex;
        justify-content: center;
        .success{
            color: green;
        }
    }
}
    
</style>