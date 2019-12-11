<template>
    <el-avatar :size="size" circle>
        <el-image :src="truesrc" @error="jj">
            <div slot="error" class="image-slot" style="display:flex;align-items:center;">
                <!-- <i class="el-icon-user"></i> -->
                <img src="/img/default_user.jpg" width="100%" alt="">
            </div>
        </el-image>
    </el-avatar>
</template>
<style lang="less" scoped>
    .el-avatar{
        border:1px solid #eee;
        background:white;
    }
    .el-image__inner{
        overflow: hidden;
    }
    
</style>
<script>
export default {
    props:{
        src:{
            type:String
        },
        size:{
            type:Number,
            default:100
        }
    },
    computed:{
        truesrc(){
            return '/api/uploads/user_icon/' + this.src
        }
    },
    created(){
       
    },
    methods:{
        jj(){
          
        }
    }
}
</script>