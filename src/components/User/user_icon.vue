<template lang="">
    <div>
        <el-avatar :size="size">
            <el-image :src="truesrc" @error="jj">
                <div slot="error" class="image-slot" style="font-size:4rem">
                    <i class="el-icon-user"></i>
                </div>
            </el-image>
        </el-avatar>
    </div>
</template>
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
        console.log(this.src);
    },
    methods:{
        jj(){
            console.log(arguments);
        }
    }
}
</script>