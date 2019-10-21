<template>
    <div class="container">
        <div class="editWrapper">
            <el-scrollbar height="100%">
                <div id="editText" contenteditable @input="input($event)"></div>
            </el-scrollbar>
            <el-button @click="send">发送</el-button>
        </div>
        <div class="imgWrapper">
            <el-upload multiple action="/api/upload/img" :headers="header" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :limit="9" :on-error="handleErr" :on-change="handleChange">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {
        send_feed
    } from '@/api/feed'
    export default {
        data() {
            return {
                say_text: '',
                say_img:[],
                dialogImageUrl:'',
                dialogVisible:false,
                header:{
                    authorization:this.$store.getters.token
                }
            }
        },
        methods: {
            getEditText(){
                this.$nextTick(()=>{
                    var html = document.querySelector('#editText').innerHTML;
                    return html;
                })
            },
            input($event){
                this.say_text = $event.target.innerHTML;
            },
            send() {
                send_feed({
                    say_text: this.say_text,
                    say_img: this.say_img,
                }).then((result) => {
                    console.log(result);
                }).catch((err) => {

                });
            },
            handlePictureCardPreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(el,fileList){
                if (el.status == "success")
                this.getImg(fileList);  
            },
            getImg(fl) {
                this.say_img = fl.map((el) => {
                    for (var img of el.response.data ) {
                      return img
                    }
                })
            },
            handleRemove(f, fl) {
                this.getImg(fl);
            },
            handleErr(err, f, fl) {
                this.$message.error('文件上传失败，请联系管理员！');
            }
        }
    }
</script>
<style lang="less" scoped>
    .container {
        width: 100%;
        display: flex;

        justify-content: center;
        flex-direction: column;

        .editWrapper {
            height: 100px;
            width: 500px;
            border: 1px solid gray;
            display: flex;
          
            #editText {
                width: 400px;
               
                height: 100px;
            }
        }
        .imgWrapper{
            &:extend(.container);
        }
    }
</style>