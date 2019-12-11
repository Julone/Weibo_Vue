<template>
    <div>
       <el-form ref="form" :model="user_info" label-width="80px" style="padding:0 10%;">
            <el-form-item label="用户邮箱">
                <el-link type="info" disabled>{{user_info.user_email}}</el-link>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-link type="info" disabled>{{user_info.user_name}}</el-link>

            </el-form-item>
            <el-form-item label="性别">
                {{user_info.user_sex}}
                <!-- <el-radio-group v-model="user_info.user_sex">
                    <el-radio label="男生"></el-radio>
                    <el-radio label="女生"></el-radio>
                </el-radio-group> -->
            </el-form-item>
        
            <el-form-item label="出生日期">
                <Timer type='yyyy-M-d' :time='+new Date(user_info.user_birth)' />
            </el-form-item>
             <el-form-item label="简介">
                <!-- <el-input v-model="user_info.user_introduce"></el-input> -->
                {{user_info.user_introduce}}
            </el-form-item>
             <el-form-item label="所在地">
                <!-- <el-input v-model="user_info.user_locate"></el-input> -->
                {{user_info.user_locate | toLocation}}
            </el-form-item>
       </el-form>
    </div>
</template>
<script>
   import {
        CodeToText
    } from 'element-china-area-data'
export default {
    props:['user_info'],
    filters:{
        toLocation(val){
            if(!val){
                return '正在查找地区。。。'
            }
            try{
                var a = JSON.parse(val);
                return a.reduce((t,el) => {
                                t+=CodeToText[el];
                                return t + " "
                            }, "")
            }catch(e){
                console.log(e);
                return '未知地区'
            }
           
        }
    }
}
</script>