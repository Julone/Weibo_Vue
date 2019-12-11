<template>
    <div class="login">
        <img src="@/assets/img/logo-text-static.svg" @click="resetForm('ruleForm')" width="100%" alt="">
        <el-form :model="formData" label-position="left" label-width="0px" hide-required-asterisk status-icon
            :rules="rules" ref="ruleForm" :class="{disable:!agreement}">
            <input type="text" no_input />
            <input type="password" no_input />
            <el-form-item prop="usermail">
                <el-autocomplete round clearable v-model="formData.usermail" :fetch-suggestions="querySearch"
                    placeholder="请输入邮箱账号" @select="handleSelect" highlight-first-item>
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-autocomplete>
            </el-form-item>
            <el-form-item prop="userpass">
                <el-input clearable type="password" show-password v-model="formData.userpass" placeholder="密码">
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
                <div class="cap">
                    <el-input clearable @keyup.native.enter="submitForm('ruleForm')" maxlength="4"
                        v-model="formData.captcha" placeholder="验证码">
                        <i slot="prefix" class="el-input__icon el-icon-c-scale-to-original"></i>
                    </el-input>
                    <el-divider direction="vertical"></el-divider>
                    <div class="img">
                        <img class="captcha" height="100%" :src="cap_addr" @click="get_cap" alt="">
                    </div>
                </div>
            </el-form-item>
            <div class="findBack">
                <el-checkbox v-model='formData.remember'>记住密码</el-checkbox>
                <el-link :underline="false" @click="$confirm('暂不支持')">找回密码</el-link>
            </div>

            <el-form-item align="center">
                <div class="login_btn" style="width:100%">
                    <el-button plain round type="primary" @click="submitForm('ruleForm')">登录
                    </el-button>
                </div>

            </el-form-item>

        </el-form>
        <el-link class="go_reg" :underline="false" @click="$router.push({name:'register'})">还没有账号?前往注册</el-link>
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
    } from '@/api/login'

    import {
        captcha,
        userpass,
        usermail
    } from './../../utils/validate.js'
    import md5 from '@/utils/md5.js'
    import {
        Encrypt,
        Decrypt
    } from './../../utils/Aes'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                formData: {
                    usermail: '',
                    userpass: '',
                    captcha: '',
                    remember: true
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
                }
            }
        },
        computed: {
            strictVerify() {
                return this.$store.state.login.strictVerify
            },
            ...mapState({
                accountList: state => state.login.accountList
            })
        },
        watch: {
            cap_addr(val) {
                this.formData.captcha = "";
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            querySearch(q, cb) {
                var restaurants = _.values(_.mapObject(this.accountList, (val, key) => ({
                    value: key
                })))
                var results = restaurants;
                cb(results);
            },
            handleSelect({
                value
            } = {}) {
                var {
                    usermail,
                    userpass,
                    remember
                } = this.accountList[value];
                console.log(this.accountList[value]);
                this.formData.usermail = usermail;
                this.formData.userpass = remember ? Decrypt(userpass) : '';
                this.formData.remember = remember;
                this.$refs['ruleForm'].validate()
            },
            get_cap() {
                this.cap_addr = "/api/verify/captcha?" + (+new Date());
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        login({
                            usermail: this.formData.usermail,
                            userpass: Encrypt(this.formData.userpass),
                            captcha: this.formData.captcha
                        }).then(res => {
                            let {
                                code,
                                strictVerify
                            } = res.data;
                            if (strictVerify) {
                                this.$store.commit('setStrictVerify', strictVerify);
                            }
                            if (code == 200) {
                                this.$message.success({
                                    message: res.data.msg,
                                    duration: 3000
                                })
                                this.$store.dispatch('loginSuccess', {
                                    data: res.data.data,
                                    form: this.formData
                                })
                            } else {
                                this.get_cap();
                            }
                        })
                    }
                });
            },
            get_last_account() {
                var {
                    usermail = '', userpass = '', remember = false
                } = _.isEmpty(this.accountList) ? {} : _.sortBy(this.accountList, el => -el.login_time)[0];
                this.formData.usermail = usermail;
                this.formData.userpass = remember ? Decrypt(userpass) : '';
                this.formData.remember = remember;
            }
        },
        mounted() {
            this.get_cap();
            this.get_last_account();
        }
    }
</script>

<style lang="less" scoped>
    .login {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        // background:Red;


        .cap {
            display: flex;
            align-items: center;


            .img {
                height: 40px;
                border: 1px solid #DCDFE6;
                border-radius: 500px;
                width: fit-content;
                width: 240px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                background: #f3fbfe;
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

        .go_reg {
            margin: 0 0 10px 0
        }

        .agreement {
            /deep/.el-checkbox__label {
                font-size: 13px;

            }

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