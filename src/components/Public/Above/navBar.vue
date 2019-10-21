<template>
    <div class="nav">
        <div class="left">
            <ul>
                <router-link tag="li" to="/">首页</router-link>
                <router-link tag="li" to="/find">发现</router-link>
                <router-link tag="li" to="/chat">聊天</router-link>
                <router-link tag="li" to="/user/info">用户</router-link>
                <router-link tag="li" :to="'/user/' + $store.getters.user_info.user_id">我的主页</router-link>
                <router-link tag="li" to="/about">关于</router-link>

            </ul>
        </div>
        <div class="right">
            
            <ul>
                <li><router-link to="/login">登录 / 注册</router-link></li>
                <li @click="$store.dispatch('logout')">注销</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
@import './../../../assets/css/app/app_var.less';
.nav {
    &:extend(.flex);
    width: 100%;
    background: #f0f0f0;
    justify-content: space-around;
    height: @nav_height;
    position: sticky;
    top: 0;
    z-index: 100;

    .left {
        width: 50%;

        ul {
            &:extend(.flex);
            justify-content: flex-start;

            li {
                &:extend(.pointer);
                margin-right: 10px;
            }
        }
        
    }
}
</style>