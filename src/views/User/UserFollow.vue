<template>
<div class="container">
        <headerVideoBg :user_info="user_info"></headerVideoBg>
        <div class="body">
            <el-tabs v-model="activeName" style="width:100%" stretch>
                <el-tab-pane label="关注" name="user_follow">
                    <followList :target_id='user_id'/>
                </el-tab-pane>
                <el-tab-pane label="粉丝" name="user_fans">
                    <fansList :target_id='user_id'/>
                </el-tab-pane>
            </el-tabs>
        </div>
       <footerBar/>
</div>
</template>
<style lang="less" scoped>
    .body {
        width: 100%;
        max-width: @home_width;
        margin: 0 auto;
        display: flex;
        /deep/.el-tabs__header{
            margin-bottom: 5px;
        }
        .feed_list {
            width: 100%;
            padding: 0 10px;
        }
    }

    .getTop{
        position: fixed;
        bottom: 20%;right: 5%;
    }
</style>
<script>
    import {
        getUserInfo,
    } from '@/api/user'

    export default {
        data() {
            return {
                user_id: this.$route.query.user_id,
                feed_list: [],
                user_info: {
                    user_icon:'',
                    user_name:'加载中',
                    fans_count:0,
                    follow_count:0,
                    user_introduce:'',
                },
                cur_page_id: 1,
                page_total:-1,
                noMore: false,
                activeName:this.$route.name,
                noData:false,
                req_time:Date.now(),
                follow_list:[]
            }
        },
        components:{
            followList:()=>import('@/components/User/follow_list.vue'),
            fansList:()=>import('@/components/User/fans_list.vue'),
            headerVideoBg:()=>import('./__UserHeader')
        },
        methods: {
            refresh() {
                this.feed_list = [];
                this.cur_page_id = 1;
                this.noMore = false;
                this.noData = false;
                this.req_time = Date.now();
                this.loadMore();
            },
            getTop(){
                this.$refs.container.scroll.scrollTo(0, 0, 500)
            },
            errorHandler() {
                return true;
            },
         
            getUserData(){
                getUserInfo({
                    user_id: this.user_id
                }).then(r => {
                    if(r.data.code == 100){
                        this.$router.push({path:'/error'})
                    }
                    if(r.data.code == 200){
                        this.user_info = r.data.data[0];
                    }
                })
            }
        },
        mounted() {
           this.getUserData();
           window.scrollBy(0,100)
           console.log(this.$route);
        }
    }
</script>