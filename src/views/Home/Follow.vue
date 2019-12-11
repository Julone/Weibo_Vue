<template>
<div class="container">
    <scroll class="wrapper" ref="container" :data="feed_list" listenScroll
        @pullup="loadMore" :pullup="!noMore" @scroll="scroll" @pulldown="refresh">
        <div class="wrapper2">
               <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="width:60%">
                        <jDivider style="float:left">
                            关注中心
                        </jDivider>
                    </div>
                    <div style="display:flex;align-items:center">
                        <searchBar style="flex:none"></searchBar>
                    </div>
                </div>
            <feedList :feed_list="feed_list" :noData="noData" :noMore="noMore" label='暂无关注人'>
                <el-link :underline='false' @click.native="$router.push('/')" type='warning'>前往主页发现</el-link>
            </feedList>
        </div>
    </scroll>
</div>
</template>
<style lang="less" scoped>
    .getTop{
        position: fixed;
        bottom: 20%;right: 5%;
    }
    .container {
        max-width: @home_max_width;
        margin: 0 auto;
        padding: 5px;
         height: @scroller_center_height;
        overflow: hidden;
        box-sizing: border-box;
    }
     .wrapper{
        height: @scroller_center_height;
        overflow: hidden;
            padding: 5px;
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
        methods: {
            scroll(e){
                this.scrollTop = e.y
            },
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