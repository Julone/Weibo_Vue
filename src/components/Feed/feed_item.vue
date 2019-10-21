<template>
    <el-card shadow="hover" class="card">
        <div class="item" :class="{'isTop': showTop && data.say_top}"  >
            <div class="left" >
                <usericon :src="data.user_icon" @click.native="$router.push({path:'/user/' + data.user_id})" :size="50"/>
                <span>{{data.user_name}}</span>
                id : {{data.id}}
            </div>
            <div class="right">
                <div class="times">
                    <el-link disabled>{{data.say_time | shortTime}} <span v-if="data.repost">[转发]</span></el-link>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="data.auth.can_setTop">
                                <span v-if="!topped" @click="set_top(data.id)">置顶</span>    
                                <span v-else @click="unset_top(data.id)">取消置顶</span>                                   
                            </el-dropdown-item>
                            <el-dropdown-item v-if="data.auth.can_follow">
                                <span v-if="!followed" @click="set_follow(data.user_id)">关注</span>    
                                <span v-else @click="unset_follow(data.user_id)">取消关注</span>                                   
                            </el-dropdown-item>
                            <el-dropdown-item  @click.native="$router.push({path:'/home/detail/' + data.id})">查看原微博</el-dropdown-item>
                            <el-dropdown-item :disabled="!data.auth.can_delete" @click.native="deleteItem(data.id)">删除</el-dropdown-item>
                            <el-dropdown-item>举报</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="usertext">{{data.say_text}}</div>

                <div class="userimg">
                    <el-image style="width: 100px; height: 100px" v-for="(el,index) in parseImg" :key="index"
                    :src="'/api/uploads/'+el.path" :preview-src-list="prevImg(index)">
                    </el-image>
                </div>
                <feed-item-repost v-if="data.repost && !data.repost.delete" @click.native.stop="$router.push({path:'/home/detail/' + data.repost.id})" :data="data.repost"></feed-item-repost>
                <el-divider v-if="data.repost && data.repost.delete">原微博已删除</el-divider>
                <bottom :key="data.id" :data="bottomData"></bottom>
            </div>
        </div>
    </el-card>
</template>

<script>
    import {del_feed,set_top,unset_top} from '@/api/feed'
    import {set_follow_user,unset_follow_user} from '@/api/user'
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
        data(){
            return {
                followed:this.data.follow_status,
                topped:this.data.say_top
            }
        },
        components:{
            bottom:()=>import('./feed_item_bottom.vue'),
            feedItemRepost:() => import('./../../components/Feed/feed_item_repost')
        },
        computed: {
            parseImg() {
                try {
                    return JSON.parse(this.data.say_img)
                } catch {
                    return []
                }
            },
            bottomData(){
                return {
                    id:this.data.id,
                    like:{
                        like_count:this.data.like.count,
                        isLiked:this.data.like.isLiked,
                    },
                    repost:{
                        repost_count:this.data.repost_count,
                        repost_from_id:this.data.repost ? this.data.id : this.data.id,
                        repost_original_id:this.data.repost ? this.data.repost.id : this.data.id
                    },
                    reply:{
                        reply_count:this.data.reply.count,
                        say_id:this.data.id,
                        to_user_id:this.data.user_id,
                    }
                }
            }
        },
        methods: {
            prevImg(index) {
                var or = this.parseImg.map(el => {
                    return '/api/uploads/' + el.path
                })
                var b = or.splice(index);
                return [...b, ...or]
            },
            set_follow(val) {
                set_follow_user({
                    follow_id: val
                }).then((result) => {
                    console.log(result);
                    if(result.data.code == 200){
                        this.followed = true;
                        this.$message.success(result.data.msg)
                    }
                })
            },
            unset_follow(val) {
                unset_follow_user({
                    follow_id: val
                }).then((result) => {
                    console.log(result);
                    if(result.data.code == 200){
                        this.followed = false;
                        this.$message.success(result.data.msg)
                    }
                })
            },
            set_top(val) {
                set_top({
                    id: val
                }).then((result) => {
                    console.log(result);
                    if(result.data.code == 200){
                        this.topped = true;
                        this.$message.success(result.data.msg)
                    }
                })
            },
            unset_top(val) {
                unset_top({
                    id: val
                }).then((result) => {
                    console.log(result);
                    if(result.data.code == 200){
                        this.topped = false;
                        this.$message.success(result.data.msg)
                    }
                })
            },
            deleteItem(el){
                del_feed({
                    say_id:el
                }).then(r=>{
                    if(r.data.code == 200){
                        this.$el.style.display = 'none'
                        this.$message.success('微博删除成功');
                    }
                })
            }
        },
        mounted() {

        }
    }
</script>
<style lang="less" scoped>
    .card {
        width: 90%;
        margin: 20px auto;
        max-width: 500px;

        .flex {
            display: flex;
        }

        .item {
            .flex;
            position: relative;
            &.isTop{
                background: red;

            }
            @left_width: 20%;
            .left {
                width: @left_width;
                .flex;
                flex-direction: column;
            }

            .right {
                width: calc(100% - @left_width);
                .flex;
                flex-direction: column;

                .times {
                    width: 100%;
                    .flex;
                    justify-content: space-between;
                }

            }



        }
    }
</style>