<template>
    <div class="user_info">
        <div class="head">
            <usericon :src="$store.getters.user_icon" @click.native="changeHeadIcon"></usericon>
        </div>
        <el-dialog title="更改头像" :close-on-click-modal="false" center custom-class="j_dialog" :visible.sync="dialogVisible">
            <div class="dialog_wrapper">
                <div class="left">
                    <div id="clipper-container" ref="con"></div>
                </div>
                <div class="right">
                    <el-button type="primary" style="position:relative">选择上传的图片文件<input type="file" id="file"></el-button>
                    <el-button type="success" @click="applyChangeHead" ref="applyChangeHead">更新头像</el-button>
                </div>
            </div>
        </el-dialog>
        <el-form ref="form" :model="userinfo" label-width="80px">
            <el-form-item label="用户ID">
                  <el-link type="info" disabled>{{userinfo.user_id}}</el-link>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="userinfo.user_name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="userinfo.user_sex">
                    <el-radio label="男生"></el-radio>
                    <el-radio label="女生"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="密码">
                <el-button type="warning" @click="$router.push({name:'changePwd'})">更改用户密码</el-button>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker :picker-options="pickerOptions" v-model="userinfo.user_birth" type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
             <el-form-item label="简介">
                <el-input v-model="userinfo.user_introduce"></el-input>
            </el-form-item>
   
            <el-form-item label="用户邮箱">
                <el-link type="info" disabled>{{userinfo.user_email}}</el-link>
                <!-- <el-input v-model="userinfo.user_email" ></el-input> -->
                <!-- <el-button>{{ userinfo.user_email }}</el-button> -->
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
    </div>
</template>
<style lang="less" scoped>
    .user_info {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;

        .head {
            display: flex;
            justify-content: center;
            padding:20px;
        }

        /deep/.j_dialog {
            width: 100%;
            max-width: 450px;
            min-width: 300px;;

            .dialog_wrapper {
                display: flex;
                flex-direction: column;
                max-width: 450px;
                ;

                .left,
                .right {
                    width: 100%;
                }
                .right{
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

    }
</style>
<script>
    import {
        getUserInfo,
        changeBasicUserInfo,
        upload_head_icon
    } from './../../api/user/index'
    export default {
        data() {
            return {
                userinfo: {},
                pickerOptions: {
                    disabledDate: (time) => {
                        return time.getTime() > Date.now()
                    }
                },
                dialogVisible: false,
                headData: '',
                initOk: false,
            
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
                this.$store.commit('setUserInfo',this.userinfo);
            })
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
                if(document.getElementById('file').files.length == 0){
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
                                user_id:that.userinfo.user_id,
                                user_name:that.userinfo.user_name
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
                changeBasicUserInfo(this.userinfo).then(res => {

                })
            },

        }


    }
</script>