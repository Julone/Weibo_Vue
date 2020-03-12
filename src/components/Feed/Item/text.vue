<template>
    <div class="text_wrapper">
        <el-popover :disabled="translated" placement="top" width="120" trigger="click">
            <a  @click="trans">{{tword}}</a>

            <div slot="reference" class="usertext" ref="text" v-html='t_text'
                :style="{maxHeight: seeall?'unset':'80px'}"></div>
        </el-popover>
        <div class="translate usertext" v-if='translatedWord' v-html="translatedWord"></div>
        <div class="text-tool" v-if='cansee'>
            <a  @click="seeall = !seeall"> {{seeall ? '收起' : '阅读全部'}}</a>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .usertext {
        word-wrap: break-word;
        text-align: justify;
        line-height: 26px;
        max-height: 80px;
        overflow: hidden;
        padding-left: 5px;

        &:active {
            background: #eee;
        }

        /deep/img {
            width: 24px;
            height: 24px;
            ;
        }
    }

    .translate {
        // background:gray
        background: #50aaff26;
        padding: 8px 10px;
        border-right: 3px solid #4faaff;
        .usertext();
        word-break: break-all;
        max-height: unset;
    }

    .text-tool {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        a {
            margin-left: 10px;
        }
    }
</style>
<script>
    import {
        trans
    } from '@/api/baidu'
    export default {
        props: {
            text: {
                default: '',
                type: String
            }
        },
        data() {
            return {
                seeall: false,
                cansee: false,
                translatedWord: '',
                translated: false,
        
            }
        },
        methods: {
            trans() {
                if(this.translated) return;
                this.translatedWord = '正在翻译中，请稍等'
                trans({
                    q: this.text
                }).then((result) => {
                    var rs = result.data.trans_result;
                    this.translatedWord = rs[0].dst.replace(/\[e\w+\]/g, function (express) {
                        return express.replace(/\[/, `<img src='/emoji/`).replace(/\]/,
                            ".gif'>")
                    });
                              this.translated = true;
                }).catch((err) => {
                    this.translatedWord = '翻译失败，请稍后重试'
                }).then(r=>{
                   
                })
      
            }
        },
        computed: {
            t_text() {
                var text = this.text || '';
                return text.replace(/\[e\w+\]/g, function (express) {
                    return express.replace(/\[/, `<img src='/emoji/`).replace(/\]/,
                        ".gif'>")
                })
            },
            tword(){
                return this.translated? '翻译完成':'翻译内容'
            }
        },
        mounted() {
            var a = this.$refs.text.offsetHeight;
            if (a >= 80) {
                this.cansee = true;
            }
        }

    }
</script>