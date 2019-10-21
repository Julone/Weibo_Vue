<template lang="">
    <div>
          <el-form ref="pwForm">
                         <el-form-item label="原始密码">
                            <el-input v-model="userinfo.user_id"></el-input>
                         </el-form-item>
                        <el-form-item label="新密码">
                            <el-input v-model="userinfo.user_id"></el-input>
                         </el-form-item>
                         <el-form-item label="确认密码">
                            <el-input v-model="userinfo.user_id"></el-input>
                         </el-form-item>
                         <el-form-item label="">
                             <el-button>更改密码</el-button>
                         </el-form-item>
                     </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userinfo:{
                user_id:''
            }
        } 
    }
}
</script>