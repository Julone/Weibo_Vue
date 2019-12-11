<template>
<div class="container">
    <scroll class="wrapper" ref="container" :data="feed_list" listenScroll
        @pullup="loadMore" :pullup="!noMore"  @pulldown="refresh">
        <div class="wrapper2">
            <headerVideoBg :user_info='user_info'/>
            <div class="body">
                <el-tabs v-model="activeName" style="width:100%;" stretch>
                    <el-tab-pane label="个人资料" name="first">
                        <userDetail :user_info="user_info"></userDetail>
                    </el-tab-pane>
                    <el-tab-pane label="微博" name="second">
                        <feedList class="feed_list" :feed_list="feed_list" showTop :noData="noData" :noMore="noMore"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </scroll>
</div>
</template>

<script>
    import {
        getUserFeed,
        getUserInfo
    } from '@/api/user'
    export default {
        data() {
            return {
                user_id: this.$route.params.user_id,
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
                activeName:'second',
                noData:false,
                req_time:Date.now()
            }
        },
        components:{
            headerVideoBg:()=>import('./__UserHeader.vue'),
            userDetail:()=>import('@/components/User/user_detail.vue')
        },
        methods: {
            refresh() {
                this.feed_list = [];
                this.cur_page_id = 1;
                this.noMore = false;
                this.noData = false;
                this.req_time = Date.now();
                this.loadMore().then(r => {
                    this.$refs.container.finishPullDown();
                })
            },
        
            errorHandler() {
                return true;
            },
            loadMore() {
                return getUserFeed({
                    user_id: this.user_id,
                    page_id: this.cur_page_id++,
                    req_time:this.req_time
                }).then(r => {
                    r.data.data && this.feed_list.push(...r.data.data);
                    this.page_total = r.data.page_total;
                    let {no_more,no_data} = r.data;
                    this.noMore = no_more;
                    this.noData = no_data;
                })
            },
            getUserData(){
                return getUserInfo({
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
           this.loadMore();
        }
    }
</script>
<style lang="less" scoped>
@hh : 35vh;
    .header {
        width: 100%;
        height: @hh;
        overflow: hidden;
        position: relative;
        .headContent{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100%;
                background: linear-gradient(120deg,#94f0fb3d,#ef93843b);
            div.item {
                display: flex;
                justify-content: center;
                width: 50%;
                color: white;
            }
        }
        .headBg{
            video{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: auto !important;
                height: auto !important;
                min-height: 100%;
                min-width: 100%;
                z-index: -1;
                filter:grayscale(1)
            }
        }
    }

    .body {
        width: 100%;
        max-width: @home_width;
        margin: 0 auto;
        display: flex;
        position: sticky;
        top: 0;
        /deep/.el-tabs__header{
            margin-bottom: 5px;
        }
        .feed_list {
            width: 100%;
            padding: 0 10px;
        }
    }
    .wrapper{
        height: @scroller_center_height;
        overflow: hidden;
    }
</style>