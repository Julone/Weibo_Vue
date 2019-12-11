<template>
    <el-card shadow="hover" class="card" >
        <div class="item">
            <div class="left" >
                <div class="user_icon">
                    <userIcon  class="pointer" :src="data.user_icon"
                    @click.native="$router.push({name:'user_center',params:{user_id:data.user_id}})"
                    :size="50"/>
                    <span>{{data.user_name}}</span>
                </div>
            </div>
            <div class="right">
                <div class="times">
                    <span class="small">
                        <Timer :time="data.say_time"/>
                        <el-tag type="danger" effect='dark'  class="tag" v-if="showTop && data.say_top" size='mini'>置顶</el-tag>
                        <el-tag class="tag"  effect='dark' size="mini" v-if="data.repost">转发</el-tag>
                    </span>
                    <feed-item-dropdown @remove="$emit('remove',$event)" :data="data"></feed-item-dropdown>
                </div>
                <feed-item-text :text="data.say_text"></feed-item-text>
                <feed-item-img :data="data.say_img"></feed-item-img>
                <feed-item-repost v-if="data.repost && !data.repost.delete"
                 @click.native.stop="$router.push({name:'feed_detail',params:{id:data.repost.id}})"
                  :data="data.repost" />
                <el-divider v-if="data.repost && data.repost.delete">原微博已删除</el-divider>
                <bottom :key="data.id" :data="bottomData" @repostOK='repostOK'></bottom>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        props:{
            data:{
                type:Object,
                default:{}
            },
            showTop:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            repostOK(data){
                this.$parent.feed_list.unshift(...data);
            }
        },
        components:{
            bottom:()=>import('./bottom.vue'),
            feedItemRepost:() => import('./repost'),
            feedItemDropdown:() =>import('./dropdown')
        },
        computed: {
            bottomData(){
                var temp = this.data;
                return {
                    id:this.data.id,
                    like:{
                        like_count:temp.like? temp.like.count : 0,
                        isLiked:temp.like? temp.like.isLiked : false,
                    },
                    repost:{
                        repost_count:temp.repost_count?temp.repost_count:0,
                        repost_from_id:temp.repost ? temp.id : temp.id,
                        repost_original_id:temp.repost ? temp.repost.id : temp.id
                    },
                    reply:{
                        reply_count:temp.reply?temp.reply.count : 0,
                        say_id:temp.id,
                        to_user_id:temp.user_id,
                    }
                }
            }
        },
        
        mounted() {

        }
    }
</script>
<style lang="less" scoped>
    .card {
        width: 100%;
        margin: 20px auto;
        .flex {
            display: flex;
        }
        .item {
            .flex;
            position: relative;
         
            @left_width: 16%;
            .left {
                width: @left_width;
                .flex;
                flex-direction: column;
                .user_icon{
                    .flex;
                    flex-direction: column;
                    width: 60px;
                    align-items: center;
                    span{
                        display: inline-block;
                        width: 60px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-align: center;
                        line-height: 36px;
                        text-overflow: ellipsis;
                    }
                }
            }

            .right {
                width: calc(100% - @left_width);
                .flex;
                flex-direction: column;

                .times {
                    width: 100%;
                    .flex;
                    justify-content: space-between;
                    .small{
                        font-size: 12px;
                        color:gray;
                        .tag{
                            margin:0 5px;
                        }
                    }
                }

            }



        }
    }
</style>