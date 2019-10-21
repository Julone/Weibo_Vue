<template>
<div class="container">
    <scroll class="wrapper" ref="container" style="height:90vh;overflow:hidden" :data="feed_list" listenScroll
        @pullup="loadMore" :pullup="!noMore" @scroll="scroll" @pulldown="refresh">
        <div class="wrapper2">
            <span style="position: absolute; top: -25px;" align="center">松手下拉数据</span>
            <div class="body">
                 <UserWB :feed_list="feed_list" :noData="noData" :noMore="noMore"/>
            </div>
        </div>
    </scroll>
    <el-button class="getTop" v-show="scrollTop <-100" @click="getTop">gettopo</el-button>
</div>
</template>
<style lang="less" scoped>

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
        get_follow_feed
    } from '@/api/feed'
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
                get_follow_feed({
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
       
        },
        mounted() {
           this.loadMore();
        }
    }
</script>