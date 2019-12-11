<template>
    <div class="editContainer">
        <div class="editWrapper">
            <div id="editText" ref="editText" contenteditable @paste='paste($event)' @input="editInput"
                placeholder="有什么想和大家分享的？" @keydown.delete="backspace($event)"></div>
        </div>
        <div class="editBottom">
            <div class="left">
                <el-popover popper-class='feed_send_popover_upload' placement="bottom-start"
                    :title="'图片上传 ' + say_img.length + ' / 9'" width="300" trigger="click"
                    @show="iconToggle('picture',1)"  @hide="iconToggle('picture',0)" transition="fast_fade">
                    <div class="imgWrapper">
                        <el-upload :class="{hide:hideUpload}" multiple accept="image/*" action="/api/upload/img" :headers="header"
                            list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                            :limit="9" :on-error="handleErr" :on-exceed='handleExceed' :on-change="handleChange" ref="upload">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog top='35vh' :visible.sync="dialogVisible" append-to-body>
                            <div style="width:100%;padding:30px;">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </div>
                        </el-dialog>
                    </div>
                    <i class="iconfont1" v-html="icon_picture" slot="reference"></i>
                </el-popover>

                <el-popover placement="bottom-start" width="300" trigger="click" @show="iconToggle('emoji',1)"
                    @hide="iconToggle('emoji',0)" transition="fast_fade">
                    <div class="emojiWrapper">
                        <img :class="'ani' + parseInt(el / 6)" @click="addFace($event)" :src="`/emoji/e${el}.gif`"
                            :name="`e${el}`" v-for="el in 24" :key="el">
                    </div>
                    <i class="iconfont1" v-html="icon_emoji" slot='reference'></i>
                </el-popover>

                <el-popover placement="bottom-start" width="240" trigger="click" @show="iconToggle('at',1)"
                    @hide="iconToggle('at',0)" transition="fast_fade">
                    <i class="iconfont1" v-html="icon_at" slot="reference"></i>
                    <el-autocomplete v-model="atUser" :fetch-suggestions="querySearchAsync" placeholder="请输入@的人"
                        @select="handleSelect" highlight-first-item>
                        <slot slot-scope="scope">
                            <div style="display:flex;align-items:center;padding:5px 0;border-bottom:1px solid #eee">
                                <userIcon :src='scope.item.user_icon' :size="30" />
                                <span style="margin-left:10px">{{scope.item.user_name}}</span>
                            </div>
                        </slot>
                    </el-autocomplete>
                </el-popover>

                <el-popover placement="bottom-start" width="200" trigger="click" @show="iconToggle('topic',1)"
                    @hide="iconToggle('topic',0)" transition="fast_fade">
                    <i slot="reference" class="iconfont1" v-html="icon_topic"></i>
                    <el-autocomplete v-model="atTopic" :fetch-suggestions="querySearchAsync2" placeholder="请输入相关话题"
                        @select="handleSelect2" highlight-first-item>
                    </el-autocomplete>
                </el-popover>
            </div>
            <div class="right">
                <el-popover placement="bottom" width="220" trigger="manual" ref="popover_Text" 
                v-model="textMaxShowTip">
                    <div style="text-align:center;display:flex;align-items:center" @click="textMaxShowTip=false">
                        <i class="el-icon-info" style="margin-right:5px"></i>
                        <span style="font-size:12px;color:#a0a0a0;white-space: nowrap;
                         overflow: hidden; text-overflow: ellipsis;">微博超过140个字，将被折叠哦~</span>
                    </div>
                </el-popover>
                <div class="text_indicator" v-popover:popover_Text>
                    已输入<span class="text_count" :style="{color:textMax?'#f1cc64':'black'}">{{text_length}}</span>个字
                </div>
                <el-button size="mini" type="primary" @click="send" style="width:100px;padding:10px 12px"
                    :disabled="say_text == '' && say_img.length == 0">
                    发送
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        send_feed,
        topic,
        test_word
    } from '@/api/feed'
    import {
        get_users,
        get_topic_list
    } from '@/api/explore';
    let iconArr = {
        picture: ['&#xe73e;', '&#xe73d;'],
        emoji: ['&#xe709;', '&#xe708;'],
        at: ['&#xe6e4;', '&#xe6e3;'],
        topic: ['&#xe720;', '&#xe71f;']
    };
    export default {
        data() {
            return {
                icon_picture: iconArr.picture[0],
                icon_emoji: iconArr.emoji[0],
                icon_at: iconArr.at[0],
                icon_topic: iconArr.topic[0],
                //四个图标
                say_text: '',
                say_img: [],
                dialogImageUrl: '',
                dialogVisible: false,
                atUser: '',
                atTopic: '',
                header: {
                    authorization: this.$store.getters.token
                },
                text_length: 0,
                textMaxShowTip:false,
                hideUpload:false
            }
        },
        computed: {
            textMax() {
                return this.text_length > 140
            }
        },
        watch:{
            textMax(val){
                this.textMaxShowTip = val 
            }
        },
        methods: {
            editInput() {
                this.refreshText();
            },
            iconToggle(el, status) {
                this['icon_' + el] = iconArr[el][status];
            },
          
            querySearchAsync(q, cb) {
                get_users({
                    user_name: q
                }).then(r => {
                    var {
                        data
                    } = r.data;
                    cb(data.map(el => {
                        return {
                            value: el.user_name,
                            user_id: el.user_id,
                            user_introduce: el.user_introduce,
                            user_icon: el.user_icon,
                            user_name: el.user_name
                        }
                    }))
                })
            },
            querySearchAsync2(q, cb) {
                get_topic_list({
                    q: q
                }).then(r => {
                    var {
                        data
                    } = r.data;
                    cb(data.map(el => {
                        return {
                            value: el.topic_name,
                            topic_name: el.topic_name,
                            click_count: el.click_count
                        }
                    }))
                })
            },
            handleSelect(item) {
                this.$nextTick(() => {
                    var text = document.querySelector('#editText');
                    var block = document.createElement('a');
                    block.innerHTML = '@' + item.user_name;
                    block.setAttribute('href', '/user/' + item.user_id);
                    text.appendChild(block);
                    text.innerHTML += "&nbsp;";
                    this.atUser = "";
                    this.refreshText();
                })
            },
            handleSelect2(item) {
                console.log(item);
                this.$nextTick(() => {
                    var text = document.querySelector('#editText');
                    var block = document.createElement('a');
                    block.innerHTML = '#' + item.topic_name + "#";
                    block.setAttribute('href', '/topic?name=' + item.topic_name);
                    text.appendChild(block);
                    text.innerHTML += "&nbsp;";
                    this.atTopic = "";
                    this.refreshText();
                })
            },
            refreshText() {
                this.$nextTick(() => {
                    var html = document.querySelector('#editText').innerHTML;
                    this.text_length = 0;
                    var textlen = document.querySelector('#editText').textContent.length;
                    this.say_text = html.replace(/<img src=\"[^>]{0,}emoji\//g, express => {
                        this.text_length++;
                        return "[";
                    }).replace(/.gif\">/g, "]");
                    this.text_length += textlen;
                    return html;
                })
            },
            paste(e) {
                var that = this;
                if (!(e.clipboardData && e.clipboardData.items)) {
                    return;
                }
                for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
                    var item = e.clipboardData.items[i];
                    if (item.kind === "string") {
                        item.getAsString(function (str) {
                            that.refreshText();
                        })
                    } else if (item.kind === "file") {
                        that.$message.warning('请不要粘贴文件或图片');
                        e.returnValue = false;
                    }
                }
            },
            backspace(e) {
                var match = this.say_text.match(/\[e\w+\]$/);
                if (match) {
                    this.say_text = this.say_text.slice(0, match.index);
                } else {
                    this.say_text = this.say_text.slice(0, this.say_text.length - 1)
                }
            },

            addFace(e) {
                this.$nextTick(() => {
                    var text = document.querySelector('#editText');
                    var img = document.createElement('img');
                    img.src = `/emoji/${e.target.name}.gif`;
                    text.appendChild(img)
                    this.refreshText();
                })
            },
            beforeSend() {
                var a = {
                    say_text: this.say_text,
                    say_img: this.say_img
                }
                if (this.say_text.length > 2000) {
                    return this.$message.warning('文本内容过大,无法发送哦');
                }
                this.$refs.upload.clearFiles();
                this.$refs.editText.innerHTML = '';
                this.say_text = '';
                this.say_img = [];
                return a;
            },
            send() {
                var data = this.beforeSend();
                if (data) {
                    send_feed(data).then(result => {
                        this.$emit('sendOK', result.data.data);
                    })
                }

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(el, fileList) {
                this.hideUpload = fileList.length >= 9;
                if (el.status == "success"){
                     this.getImg(fileList);
                }  
            },
            handleExceed(f,fl){
                this.$message.error('请不要超出9张图片')
                this.getImg(fl);
            },
            getImg(fl) {
                this.say_img = fl.map((el,index) => {
                    for (var img of el.response.data) {
                        if(index < 9 )
                            return img
                    }
                })
            },
            handleRemove(f, fileList) {
                this.hideUpload = fileList.length >= 9;
                this.getImg(fileList);
            },
            handleErr(err, f, fl) {
                try {
                    var json = JSON.parse(err.message);
                    if (json.code == 403) {
                        this.$message.error(json.msg);
                        this.$router.push('/login')
                    } else {
                        this.$message.error(json.msg);
                    }
                } catch (e) {
                    this.$message.error('图片上传失败')
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @emoji_wh_regular: 40px;
    @emoji_wh_small: 24px;

    .icon {
        font-size: 30px;
        margin-right: 20px;
        line-height: 39px;
        color: #a0a0a0;
    }

    .edit_text_size {
        width: 100%;
        height: 100px;
    }

    .editContainer {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border: 1px solid #EBEEF5;
        padding: 15px;
        border-radius: 5px;

        .editWrapper {
            &:extend(.edit_text_size);

            &:focus-within {
                border-color: #f1cc64;

                &::before {
                    color: #f1cc64
                }
            }

            border: 1px solid #eee;
            border-radius: 5px;
            display: flex;

            #editText {
                &:extend(.edit_text_size);
                overflow-x: hidden;
                overflow-y: auto;
                word-break: break-all;
                padding: 5px;
                box-sizing: border-box;
                line-height: @emoji_wh_small;

                &:empty::before {
                    content: attr(placeholder);
                }

                /deep/img {
                    width: @emoji_wh_small;
                    height: @emoji_wh_small;
                    vertical-align: middle;
                }
            }
        }

        .editBottom {
            display: flex;
            margin-top: 10px;
            justify-content: space-between;
            align-items: center;

            .left {
                .iconfont1 {
                    margin-right: 20px;
                    font-size: 24px;
                    display: inline-block;

                    &:hover {
                        transform: scale(1.2)
                    }
                }
            }

            .right {
                display: flex;

                .text_indicator {
                    margin-right: 10px;
                    font-size: 12px;
                    color: #a0a0a0;

                    .text_count {
                        font-size: 20px;
                        display: inline-block;
                        padding: 5px;
                        font-family: Constantia, Georgia
                    }
                }

            }
        }
    }


    .emojiWrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        img {
            width: @emoji_wh_regular;
            height: @emoji_wh_regular;
            transition: all ease .2s;

            &:hover {
                border-radius: 50px;
                background: #ebeef5;
                transform: scale(1.2);
            }
        }
    }
</style>
<style lang="less">
    .feed_send_popover_upload {
        .imgWrapper {
            @sq: 80px;

            .el-upload-list__item {
                width: @sq ;
                height: @sq;
            }

            .el-upload {
                width: @sq;
                height: @sq;
                line-height: @sq;
            }
            .hide .el-upload--picture-card {
                    display: none;
                }   
        }

        .el-popover__title {
            color: gray;
            font-size: 10px;
        }
    }
    
</style>