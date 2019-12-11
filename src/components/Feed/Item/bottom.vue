<template>
    <div class="bottom_wrapper">
        <div class="bottom">
            <div class="forward" @click="repost">
                <i class="iconfont1">&#xe759;</i>
                <span>
                    转发 {{repostCount}}                    
                </span>
            </div>
            <div class="forward" @click="show_com">
                <i v-if="showComment" class="iconfont1">&#xe72f;</i>
                <i v-else class="iconfont1">&#xe72e;</i>
                <span>
                评论{{replyCount}}
                </span>
            </div>
            <div class="forward">
                <i :class=" { 'isLiked':like,'iconfont1':true}"
                 @click="toggle_like(-1)" v-if="like">&#xe743;</i>
                <i class="iconfont1" @click="toggle_like(1)" v-else>&#xe744;</i>
                <span>
                    点赞{{likeCount}}
                </span>
            </div>
        </div>
        <div class="comment" v-show="showComment">
            <div class="postMyThoghts" @click="comment">发表我的看法</div>
            <keep-alive>
                <comment-list 
                @closeReply="closeReply"
                @reply2reply="comment($event)"
                @delCom="replyCount--"
                ref="comlist" v-if="showComment"
                 :trigger="trigger" @ajax='trigger = true'
                    :say_id="data.reply.say_id" :type='data.reply.reply_type'
                     :reply_count="replyCount"></comment-list>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import {
        send_repost,
        send_comment,
        get_comment,
        set_like,
        unset_like
    } from '@/api/feed'
    export default {
        props: ['data'],
        data() {
            return {
                showComment: false,
                like: this.data.like.isLiked,
                likeCount: this.data.like.like_count * 1,
                replyCount: this.data.reply.reply_count * 1,
                repostCount: this.data.repost.repost_count * 1,
                trigger: false,

            }
        },
        components: {
            commentList: () => import('./bottom_comment')
        },
        methods: {
            closeReply(){
                this.showComment = false
            },
            show_com() {
                this.showComment = !this.showComment
            },
            toggle_like(num) {
                this.like = !this.like;
                this.likeCount = eval(this.likeCount + '+' + num);
                var api = null;
                if (num == 1) {
                    api = set_like({
                        say_id: this.data.id
                    })
                } else {
                    api = unset_like({
                        say_id: this.data.id
                    })
                }
                api.then(r => {
                    this.$message.success(r.data.msg)
                })

            },
            repost() {
                this.$prompt('请输入转发内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({
                    value
                }) => {
                    send_repost({
                        repost_from_id: this.data.repost.repost_from_id,
                        repost_original_id: this.data.repost.repost_original_id,
                        repost_text: value
                    }).then((result) => {
                        if (result.data.code == 200) {
                            this.$emit('repostOK', result.data.data);
                            this.repostCount++;
                        }
                        console.log(result);
                    }).catch((err) => {

                    });
                })
            },
            comment({say_id,to_user_id,o_id,p_id,reply_type}) {
                this.$prompt('请输入评论内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({
                    value
                }) => {
                    send_comment({
                        say_id: say_id ||this.data.reply.say_id,
                        to_user_id: to_user_id || this.data.reply.to_user_id,
                        origin_id:o_id,
                        parent_id:p_id,
                        reply_text: value,
                        type:reply_type || 'com'
                    }).then((result) => {
                        console.log(result);
                        if (result.data.code == 200) {
                            this.$message.success(result.data.msg);
                            this.$refs.comlist.comments.unshift(...result.data.data);
                            this.replyCount++;
                            console.log(this.$refs);
                        }
                    }).catch((err) => {

                    });
                })
            },

        },


    }
</script>
<style lang="less" scoped>
.bottom_wrapper{

    /deep/.bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .forward{
            display: flex;
            align-items: center;
            position: relative;

            i{
                font-size: 22px;
                position: absolute;
            }
            span{
            font-size: 12px;
                margin-left: 26px;
  
            }
        }
    }

    .isLiked {
        color:#E8C064;
        //    background-image: -webkit-linear-gradient(-158deg, #E8C064, #ffee78);
    // text-shadow: 0px 3px 9px #ffe4a5;
    // -webkit-background-clip:text; 
    // -webkit-text-fill-color:transparent;
  &+span{
      color:#E8C064
  }
    }

    .postMyThoghts {
        width: 100%;
        @h: 40px;
        height: @h;
        background: #8f9195e0;
        text-align: center;
        line-height: @h;
        margin: 7px 0;
        color: white;
        border-radius: @h / 8;
    }
}

</style>