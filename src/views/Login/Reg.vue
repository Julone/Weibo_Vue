<template>
    <div class="login">
        <img src="@/assets/img/logo-text.svg" @click="resetForm('ruleForm')" width="100%" alt="">
        <el-form :model="formData" label-position="left" label-width="0px" hide-required-asterisk status-icon
            :rules="rules" ref="ruleForm" :class="{disable:!agreement}">
            <el-form-item prop="usermail">
                <el-input clearable v-model="formData.usermail" autocomplete="off"
                 placeholder="请输入注册邮箱">
                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    </el-input>
            </el-form-item>
            <el-form-item prop="regCaptcha">
                <div class="cap">
                    <el-input maxlength="6" clearable v-model="formData.regCaptcha" placeholder="验证码">
                        <i slot="prefix" class="el-input__icon el-icon-c-scale-to-original"></i>
                    </el-input>
                    <el-divider direction="vertical"></el-divider>
                    <div class="img">
                        <el-button @click="sendCap" type="primary" plain style="width:100%">
                            <span v-if="!capLock"> 发送邮箱验证码 </span>
                            <span v-else>{{timeCount}}秒后可重发</span>
                        </el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item prop="username">
                <el-input clearable type="text" v-model="formData.username" autocomplete="off" placeholder="设置用户昵称">
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="userpass">
                <el-input clearable type="password" show-password v-model="formData.userpass" autocomplete="off"
                    placeholder="设置初始密码">
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-form-item>


            <el-form-item align="center">
                <div class="login_btn" style="width:100%">
                    <el-button plain type="primary" @click="submitForm('ruleForm')">立即注册
                    </el-button>
                </div>
                <el-link :underline="false" @click="$router.push({name:'login'})">已有账号?前往登录</el-link>
            </el-form-item>

        </el-form>
        <div class="flex agreement">
            <el-checkbox style="transform:scale(1)" v-model="agreement">
                <span class="accept_text">我已阅读并接受<a>《用户协议》</a>和<a>《隐私政策》</a></span>
            </el-checkbox>
        </div>
    </div>
</template>
<script>
    import {
        sendCap,
        register
    } from '@/api/login/'
    import {
        userpass,
        usermail,
        username,
        usermailcap
    } from './../../utils/validate.js'
    import {Encrypt} from './../../utils/Aes'
    export default {
        data() {
            return {
                formData: {
                    usermail: '',
                    userpass: '',
                    regCaptcha: '',
                    username: ''
                },
                agreement: true,
                rules: {
                    usermail: [{
                        validator: usermail,
                        trigger: 'blur'
                    }],
                    userpass: [{
                        validator: userpass,
                        trigger: 'blur'
                    }],
                    regCaptcha: [{
                        validator: usermailcap,
                        trigger: 'blur'
                    }],
                    username: [{
                        validator: username,
                        trigger: 'blur'
                    }]
                },
                capLock: '',
                timeCount: 60,
            }
        },

        methods: {
            sendCap() {
                if(!this.formData.usermail){
                    this.$message({message:'请先输入注册邮箱',type:'error'})
                    return;
                }

                if(this.capLock) return;
                this.capLock = setInterval(() => {
                    this.timeCount--;
                    if (this.timeCount < 0) {
                        this.timeCount = 60;
                        clearInterval(this.capLock)
                        this.capLock = null;
                    }
                }, 100)
            
                sendCap({
                    usermail: this.formData.usermail
                }).then(r => {
                    if(r.data.code==200){
                        this.$message.closeAll()
                        this.$message({message:r.data.msg,type:'success',center:true})                        
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            submitForm(formName) {
                
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        register({
                        usermail: this.formData.usermail,
                        userpass: Encrypt(this.formData.userpass),
                        code: this.formData.regCaptcha,
                        username:this.formData.username
                        }).then(res => {
                            console.log(res);
                            if(res.data.code == 200){
                                this.$message.success(res.data.msg);
                                this.$router.push({name:'login'})
                            }
                        })
                    }
                });
            },

        },

    }
</script>



<style lang="less" scoped>
    .login {
        width: 90%;
        margin: 0 auto;

        .cap {
            display: flex;
            align-items: center;

            .img {
                height: 40px;
                // border: 1px solid #DCDFE6;
                border-radius: 5px;
                width: 80%;
            }
        }

        .el-form-item.is-success {
            .el-input__inner {
                border-color: #67C23A;

            }

            .el-input__validateIcon::before {
                color: #67C23A;
            }

        }

        .findBack {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .login_btn {
            @width: 100%;
            display: flex;
            justify-content: center;

            button {
                width: @width;
                margin: 0 auto;
            }
        }

        .agreement {
            a {
                border: 1px solid transparent;
                color: #c2ac90;

                &:hover {
                    border: 1px dashed #e8c064;
                }
            }
        }

    }
</style>