<template>
    <div class="container" v-if="feed_data">
        <div class="info">
            <div class="left">
                <userIcon :size="50" :src="feed_data.user_icon" />
                <div class="nametime">
                    <span>{{feed_data.user_name}}</span>
                    <span>{{feed_data.say_time}}</span>
                </div>
            </div>
            <div class="rihgt">
                >>
            </div>
        </div>
        <div class="text">
            {{feed_data.feed_say || '暂无文本'}}
        </div>
        <feedItemImg :data='feed_data.say_img'></feedItemImg>
        <el-tabs v-model="activePanel" type="border-card" stretch>
            <el-tab-pane :label="'转发' + feed_data.repost_count" name="repost">
                <repostList :target_id="feed_data.id"/>
            </el-tab-pane>
            <el-tab-pane :label="'评论' + feed_data.reply.count" name="reply">
                <replyList :target_id="feed_data.id"/>
            </el-tab-pane>
            <el-tab-pane :label="'点赞' + feed_data.like.count" name="like">
                <!-- <likeList :target_id="feed_data.id"/> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="less" scoped>
    .container{
        width: 100%;
        max-width: 500px;
        border: 1px solid gray;
               margin: 0 auto;
        .info{
            display: flex;
            justify-content: space-between;
            .left{
                display: flex;
                widows: 30%;;
                .nametime{
                    display: flex;
                    flex-direction: column;
                }
            }
        }
        .text{
            
        }
    }
</style>
<script>
    import {
        get_feed_by_id
    } from '@/api/feed'
    export default {
        data() {
            return {
                feed_data: null,
                activePanel:'reply'
            }
        },
        components:{
            repostList:()=>import('@/components/Feed/Detail/repost'),
            replyList:()=>import('@/components/Feed/Detail/reply'),
            likeList:()=>import('@/components/Feed/Detail/like'),

            // repost:()=>import('@/components/Feed/feed_item')
        },
        computed:{
            // bottomData(){
            //     return {
            //         id:this.feed_data.id,
            //         like:{
            //             like_count:this.feed_data.like.count,
            //             isLiked:this.feed_data.like.isLiked,
            //         },
            //         repost:{
            //             repost_count:this.feed_data.repost_count,
            //             repost_from_id:this.feed_data.repost ? this.feed_data.id : this.feed_data.id,
            //             repost_original_id:this.feed_data.repost ? this.feed_data.repost.id : this.feed_data.id
            //         },
            //         reply:{
            //             reply_count:this.feed_data.reply.count,
            //             say_id:this.feed_data.id,
            //             to_user_id:this.feed_data.user_id,
            //         }
            //     }
            // }
        },
        mounted() {
            get_feed_by_id({
                ids: this.$route.params.id
            }).then(r => {
                console.log(r);
                if (r.data.code == 200) {
                    this.feed_data = r.data.data[0];
                }
            })
        }

    }
</script>