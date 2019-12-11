<template>
    <div class="admin_wrapper">
        <el-menu router class="el-menu-demo" mode="horizontal" >
            <el-submenu  index="/admin/weibo">
                <template slot="title">微博管理</template>
                <el-menu-item index="/admin/weibo">微博管理</el-menu-item>
                <el-menu-item index="/admin/weibo/reply">评论管理</el-menu-item>
                <el-menu-item index="2-3" disabled>图片管理</el-menu-item>
            </el-submenu >
            <el-menu-item index="/admin/topic">话题管理</el-menu-item>
            <el-menu-item index="/admin/report">举报中心</el-menu-item>
            <el-menu-item index="/admin/users">用户管理</el-menu-item>
        </el-menu>
        <router-view :key="refresh"></router-view>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    mounted(){
   
    },
    computed:{
        ...mapState({
            'refresh':s => s.admin.refresh
        })
    },
}
</script>

<style lang="less" scoped>
.admin_wrapper{
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}
</style>