<template>
    <div class="bottom_wrapper">
         <div class="bottom">
        <div class="forward" @click="repost">
            <i class="el-icon-share"></i>转发 {{data.repost.repost_count}}
        </div>
        <div class="forward" @click="show_com">
            <i class="el-icon-chat-line-round"></i>评论{{data.reply.reply_count}}
        </div>
        <div class="forward">
            <i :class=" { 'isLiked':like,'el-icon-thumb':true}" @click="toggle_like(-1)" v-if="like"></i>
            <i class="el-icon-thumb" @click="toggle_like(1)" v-else></i>
            点赞{{likeCount}}
        </div>
    </div>
    <div class="comment" v-show="showComment">
        <div class="postMyThoghts" @click="comment">发表我的看法</div>
        <keep-alive>
            <comment-list v-if="showComment" :trigger="trigger" @ajax='trigger = true' :say_id="data.reply.say_id" :reply_count="data.reply.reply_count"></comment-list>
        </keep-alive>
    </div>
    </div>
   
</template>
<script>
    import {
        send_repost,
        send_comment,
        get_comment,
        set_like,unset_like
    } from '@/api/feed'
    export default {
        props: ['data'],
        data(){
            return {
                showComment:false,
                like:this.data.like.isLiked,
                likeCount:this.data.like.like_count * 1,
                trigger:false
            }
        },
        components:{
            commentList:()=>import('./feed_item_bottom_comment')
        },
        methods: {
            show_com(){
                this.showComment = !this.showComment
            },
            toggle_like(num){
                this.like = !this.like;
                this.likeCount = eval(this.likeCount + '+' + num);
                var api = null;
                if(num == 1) {
                    api = set_like({
                        say_id:this.data.id
                    })
                }else{
                    api =unset_like({
                        say_id:this.data.id
                    })
                }
                api.then(r=>{
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
                        console.log(result);
                    }).catch((err) => {

                    });
                })
            },
            comment() {
                this.$prompt('请输入评论内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({
                    value
                }) => {
                    send_comment({
                        say_id:this.data.reply.say_id,
                        to_user_id:this.data.reply.to_user_id,
                        reply_text:value
                    }).then((result) => {
                        console.log(result);
                    }).catch((err) => {

                    });
                })
            },
           
        },

        
    }
</script>
<style lang="less">
    .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .isLiked {
        color: red;
    }
    .postMyThoghts{
        width:100%;
        height: 40px;
        background: gray;
        text-align: center;
        line-height: 40px;;
        color:white;

    }
</style>