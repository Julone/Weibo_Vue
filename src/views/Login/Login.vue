<template>
    <div class="login">
        <img src="@/assets/img/logo-text.svg" @click="resetForm('ruleForm')" width="100%" alt="">
        <el-form :model="formData" label-position="left" label-width="0px" hide-required-asterisk status-icon
            :rules="rules" ref="ruleForm" :class="{disable:!agreement}">
            <el-form-item prop="usermail">
                <el-input clearable type="text" v-model="formData.usermail" autocomplete="off" placeholder="请输入邮箱账号">
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="userpass">
                <el-input clearable type="password" show-password v-model="formData.userpass" autocomplete="off"
                    placeholder="密码">
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha" v-if="strictVerify">
                <div class="cap">
                    <el-input clearable @keyup.native.enter="submitForm('ruleForm')" maxlength="4" v-model="formData.captcha" placeholder="验证码">
                        <i slot="prefix" class="el-input__icon el-icon-c-scale-to-original"></i>
                    </el-input>
                    <el-divider direction="vertical"></el-divider>
                    <div class="img">
                        <img class="captcha" height="100%" :src="cap_addr" @click="get_cap" alt="">
                    </div>
                </div>
            </el-form-item>
            <div class="findBack">
                <el-checkbox>记住密码</el-checkbox>
                <el-link :underline="false" @click="$router.push({name:'register'})">找回密码</el-link>
            </div>

            <el-form-item align="center">
                <div class="login_btn" style="width:100%">
                    <el-button plain  type="primary" @click="submitForm('ruleForm')">登录
                    </el-button>
                </div>
                <el-link :underline="false" @click="$router.push({name:'register'})">还没有账号?前往注册</el-link>
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
        login
    } from '@/api/login/'

    import {
        captcha,
        userpass,
        usermail
    } from './../../utils/validate.js'
    import md5 from '@/utils/md5.js'
    import {Encrypt} from './../../utils/Aes'
    import {setStorage} from './../../utils/storage.js'
    export default {
        data() {
            return {
                formData: {
                    usermail: '',
                    userpass: '',
                    captcha: '',
                },
                cap_addr: '',
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
                    captcha: [{
                        validator: captcha,
                        trigger: 'blur'
                    }],

                },

            }
        },
        computed:{
            strictVerify(){
                return this.$store.state.login.strictVerify
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            get_cap() {
                this.cap_addr = "/api/verify/captcha?" + (+new Date());
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        login({
                            usermail: this.formData.usermail,
                            userpass: Encrypt(this.formData.userpass),
                            captcha:this.formData.captcha
                        }).then(res => {
                            let {code,strictVerify} = res.data;
                            if(strictVerify){
                                this.$store.commit('setStrictVerify',strictVerify);
                            }
                            if(code == 200) {
                                this.$message.success({message:res.data.msg,duration:3000})
                                this.$store.dispatch('login',res.data.data)
                            }else{
                                this.get_cap();
                            }
                        })
                    }
                });
            },
      
        },
        mounted() {
            this.get_cap();
        }
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
                border: 1px solid #DCDFE6;
                border-radius: 5px;
                width: fit-content;
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