<template>
<div class="container">
    <scroll class="wrapper" ref="container" style="height:90vh;overflow:hidden" :data="feed_list" listenScroll
        @pullup="loadMore" :pullup="!noMore" @scroll="scroll" @pulldown="refresh">
        <div class="wrapper2">
            <span style="position: absolute; top: -25px;" align="center">松手下拉数据</span>
            <div class="header" v-if="user_info">
                <div class="user_icon item">
                    <usericon :src="user_info.user_icon" />
                </div>
                <div class="user_name item">
                    {{user_info.user_name}}
                </div>
                <div class="follow item">
                    关注{{user_info.follow_count}} |
                    粉丝{{user_info.fans_count}}
                </div>
                <div class="user_introduce item">
                    简介：{{user_info.user_introduce}}
                </div>
            </div>
            <div class="body">
                <el-tabs v-model="activeName" style="width:100%" stretch>
                    <el-tab-pane label="主页" name="first">
                        43
                    </el-tab-pane>
                    <el-tab-pane label="微博" name="second">
                        <UserWB :feed_list="feed_list" :noData="noData" :noMore="noMore"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
          
        </div>
    </scroll>
    <el-button class="getTop" v-show="scrollTop <-100" @click="getTop">gettopo</el-button>
</div>
</template>
<style lang="less" scoped>
    .header {
        width: 100%;
        background: skyblue;
        padding: 20px 0;

        div.item {
            margin: 10px auto;
            display: flex;
            justify-content: center;
            width: 50%;
        
        }
    }

    .body {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        display: flex;

        .feed-list {
            width: 100%;
        }


    }
    .getTop{
        position: fixed;
        bottom: 20%;right: 5%;
    }
</style>
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
                user_info: null,
                cur_page_id: 1,
                page_total:-1,
                noMore: false,
                scrollTop:0,
                activeName:'second',
                noData:false,
                req_time:Date.now()
            }
        },
        components: {
            scroll: () => import('@/components/Public/Scroller/scroller.vue'),
            UserWB:()=>import('@/components/User/User_wb.vue')
        },
        methods: {
            scroll(e){
                this.scrollTop = e.y
            },
            refresh() {
                

            },
            getTop(){
                this.$refs.container.scroll.scrollTo(0, 0, 500)
            },
            errorHandler() {
                return true;
            },
            loadMore() {
                getUserFeed({
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
           this.loadMore();
        }
    }
</script>