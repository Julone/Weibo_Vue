<template>
    <div class="admin_wrapper">
        <div class="nav">
            <el-menu router class="el-menu-demo" :default-active="$route.path" mode="horizontal">
                <el-menu-item index="/admin/weibo"><i class="el-icon-files"></i>微博管理</el-menu-item>
                <el-menu-item index="/admin/reply"><i class='el-icon-chat-dot-round'></i>评论管理</el-menu-item>
                <el-menu-item index="/admin/report"><i class="el-icon-receiving"/>举报中心</el-menu-item>
                <el-menu-item index="/admin/topic"><i class='el-icon-connection'></i>话题管理</el-menu-item>
                <el-menu-item index="/admin/users"><i class='el-icon-user'></i>用户管理</el-menu-item>
            </el-menu>
        </div>
        <router-view :key="refresh"></router-view>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        computed: {
            ...mapState({
                'refresh': s => s.admin.refresh
            })
        },

    }
</script>

<style lang="less" scoped>
    .admin_wrapper {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }
</style>