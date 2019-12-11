<template>
    <div class="user_info">
        
        <div class="head">
            <userIcon class="pointer" :src="$store.getters.user_icon" @click.native="changeHeadIcon"></userIcon>
        </div>
        <el-dialog title="更改头像" :close-on-click-modal="false" center custom-class="j_dialog"
            :visible.sync="dialogVisible">
            <div class="dialog_wrapper">
                <div class="left">
                    <div id="clipper-container" ref="con"></div>
                </div>
                <div class="right">
                    <el-button type="primary" style="position:relative">选择上传的图片文件<input type="file" id="file">
                    </el-button>
                    <el-button type="success" @click="applyChangeHead" ref="applyChangeHead">更新头像</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog center append-to-body title="修改密码" custom-class="j_dialog" :visible.sync="PWstatus" width="30%">
            <el-form ref="pwform" :rules="pass_rules" style="margin:15px 40px" :model="changePWform" label-position="top" label-width="100px">
                <input type="text" no_input />
                <input type="password" no_input />
                <el-form-item label="原始密码" prop="originalPW">
                    <el-input v-model="changePWform.originalPW" show-password clearable prefix-icon="el-icon-lock" placeholder="请输入原始密码"></el-input>
                </el-form-item>
                <el-form-item label="修改密码" prop="changedPW">
                    <el-input v-model="changePWform.changedPW" show-password clearable prefix-icon="el-icon-lock" placeholder="请输入修改密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPW">
                    <el-input v-model="changePWform.confirmPW" show-password clearable prefix-icon="el-icon-lock" placeholder="请输入确认密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="PWstatus = false" round>我点错了</el-button> -->
                <el-button type="primary" @click="pwSubmit" round>更改密码</el-button>
            </span>
        </el-dialog>

        <el-tabs tab-position="top" type="border-card">
            <el-tab-pane label="个人信息">
                <el-form :model="userinfo" label-width="80px">
                    <el-form-item label="微博ID">
                        <el-row align='middle'>
                            <el-col>
                                {{userinfo.id}}
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-row>
                            <el-col :span="12">
                                <el-input v-model="userinfo.user_name" width></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="userinfo.user_sex">
                            <el-radio label="男生"></el-radio>
                            <el-radio label="女生"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-row>
                            <el-col :span="12">
                                <el-date-picker style="width:100%" :picker-options="pickerOptions"
                                    v-model="userinfo.user_birth" type="date" :clearable="false" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" placeholder="介绍下自己吧~" v-model="userinfo.user_introduce" maxlength="80"
                            :rows='3' show-word-limit>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所在地">
                        <el-row>
                            <el-col :span="24">
                                <el-cascader style="width:100%" size="large" :options="regionData"
                                    v-model="userinfo.user_locate"></el-cascader>

                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submit">更新个人资料</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="安全信息">
                <el-form :model="userinfo" label-width="80px">
                    <el-form-item label="更改密码">
                        <el-button type="" @click="PWstatus = true">更改用户密码</el-button>
                    </el-form-item>
                    <el-form-item label="用户邮箱">
                        <el-link type="info" disabled>{{userinfo.user_email}}</el-link>
                    </el-form-item>
                    <el-form-item label="注册日期">
                        <el-date-picker v-model="userinfo.user_reg_time" value-format="timestamp" type="datetime"
                            placeholder="暂无数据" disabled>
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submit">更新个人资料</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="less" scoped>
/deep/.j_dialog {
            width: 100% !important;
            max-width: 450px !important;
            min-width: 300px !important;
            ;
            .dialog_wrapper {
                display: flex;
                flex-direction: column;
                max-width: 450px;
                ;

                .left,
                .right {
                    width: 100%;
                }

                .right {
                    display: flex;
                    justify-content: space-around;
                    padding: 16px 0;
                }

                #file {
                    width: 100%;
                    height: 100%;
                    display: block;
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                #clipper-container {
                    height: 500px;
                    width: 100%;

                    position: relative;
                    margin: 0 auto;
                }
            }
        }

    .user_info {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;

        .head {
            display: flex;
            justify-content: center;
            padding: 20px;
        }

        /deep/.el-form {
            .el-form-item {}

        }

        
    }
</style>
<script>
    import {
        getUserInfo,
        changeBasicUserInfo,
        upload_head_icon,
        changeUserPassword
    } from './../../api/user/index'
    import {
        regionData
    } from 'element-china-area-data'
    import { userpass, captcha, userpass2 } from './../../utils/validate'
    export default {
        data() {
            return {
                userinfo: {},
                userinfo_copy: {},
                pickerOptions: {
                    disabledDate: (time) => {
                        return time.getTime() > Date.now()
                    }
                },
                dialogVisible: false,
                headData: '',
                initOk: false,
                regionData: regionData,
                PWstatus: false,
                changePWform: {
                    originalPW: '',
                    changedPW: '',
                    confirmPW: ''
                },
            }
        },
        created() {
            var s = document.createElement('script');
            s.src = '/js/clipper.js';
            document.head.appendChild(s);
        },
        mounted() {
            getUserInfo().then(r => {
                this.userinfo = r.data.data[0];
                this.userinfo.user_locate = JSON.parse(this.userinfo.user_locate) || [];
                this.userinfo_copy = _.clone(this.userinfo);
                this.$store.commit('setUserInfo', this.userinfo);
            })
        },
        beforeRouteLeave(to, from, next) {
            if (!this.NoChangeSomething) {
                this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改'
                    })
                    .then(() => {
                        console.log(this.submit);
                        this.submit();
                        next()
                    })
                    .catch(action => {

                    })
            } else {
                next()
            }
        },
        computed: {
            NoChangeSomething() {
                return _.isEqual(this.userinfo, this.userinfo_copy)
            },
            pass_rules(){
                var { originalPW, changedPW } = this.changePWform;
                return {
                    originalPW: [
                        { validator: userpass, trigger: 'blur' }
                    ],
                    changedPW: [
                        { validator: userpass, trigger: 'blur' },
                        { 
                            validator: userpass2(originalPW, '===', '不能和原密码一样'),
                            trigger:'blur'
                        }
                    ],
                    confirmPW: [
                        { validator: userpass, trigger: 'blur' },
                        { validator: userpass2(changedPW, '!==', '请与修改密码一致'),
                        trigger:'blur'}
                    ],
                }
            }
        },
        methods: {
            changeHeadIcon() {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    if (!this.initOk) {
                        this.clipper = new Clipper(document.querySelector('#clipper-container'), {
                            coverShape: 'circle',
                            coverColor: '#000000',
                            coverSize: 0.9,
                            coverOpacity: 0,
                        })
                        var that = this;
                        document.getElementById('file').onchange = function (event) {
                            let fileReader = new FileReader()
                            fileReader.onload = function (e) {
                                that.clipper.drawImg(e.target.result);
                            }
                            fileReader.readAsDataURL(event.target.files[0])
                        }
                        this.initOk = true;
                    }
                })
            },
            applyChangeHead() {
                var that = this;
                if (document.getElementById('file').files.length == 0) {
                    this.$message.error('请先选择图片文件');
                    return;
                }
                that.clipper.clip(function (data) {
                    upload_head_icon({
                        data
                    }).then(r => {
                        var {
                            path
                        } = r.data.data;
                        if (path && r.data.code == 200) {
                            that.$store.commit('setUserInfo', {
                                user_icon: path,
                                user_id: that.userinfo.user_id,
                                user_name: that.userinfo.user_name
                            })
                            that.dialogVisible = false;
                        }
                    })
                }, {
                    format: 'base64',
                    quality: 1
                })

            },
            submit() {
                if (this.NoChangeSomething) {
                    return this.$message.warning('没有更新资料');
                }
                changeBasicUserInfo(this.userinfo).then(res => {
                    res.data.code == 200 && this.$message.success(res.data.msg);
                    this.userinfo_copy = _.clone(this.userinfo);
                    console.log(this.userinfo_copy);
                })
            },
            pwSubmit(){
                  this.$refs['pwform'].validate((valid) => {
                      if(valid){
                        changeUserPassword({
                            old_pass:this.changePWform.originalPW,
                            new_pass:this.changePWform.changedPW
                        }).then(r=>{
                            r.data.code == 200 && this.$store.dispatch('reLogin');
                        })
                        this.PWstatus = false;
                      }

                  })
                
            }

        }


    }
</script>