<template>
    <div class="scroll_container">
        <scroll class="scroll_wrapper" ref="container" :data="feed_list" listenScroll @pullup="loadMore"
         :pullup="!noMore" @scroll="scroll" @pulldown="refresh">
            <div class="scroll_content">
                <jDivider bottom='20px'>
                    热门排行
                </jDivider>

                <div class="sort">
                    <div class="left">
                        微博热榜: <Timer :time="req_time" noPop type='yyyy-M-d hh:mm:ss'/>更新
                    </div>

                    <div class="right">
                                <el-radio v-model="sort" label="reply_count">回复量</el-radio>
                    <el-radio v-model="sort" label="like_count">点赞量</el-radio>

                    </div>
            
                </div>
                <div class="item_container">
                    <feedList :feed_list="feed_list" :noData="noData" :noMore="noMore" />
                </div>
            </div>
        </scroll>
    </div>
</template>
<style lang="less" scoped>
    .scroll_container {
        max-width: @home_max_width;
        // width: 100%;
        margin: 0 auto;
        padding: 0 5px;
        height: @scroller_center_height;
        overflow: hidden;
        box-sizing: border-box;
    }

    .pulldown {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        top: -100px;
    }

    .scroll_wrapper {
        height: @scroller_center_height;
        overflow: hidden;
        padding: 5px 0;
        .sort{
            display: flex;
            justify-content: space-between;

        }
    }
</style>

<script>
    import {
        get_hot
    } from '@/api/explore'
    export default {
        data() {
            return {
                feed_list: [],
                req_time: Date.now(),
                noMore: false,
                cur_page_id: 1,
                page_total: -1,
                scrollTop: 0,
                noData: false,
                fetching:false,
                sort:'reply_count'
            }
        },
        components: {
            feedSend: () => import('@/components/Feed/Send/send.vue')
        },
        watch:{
            sort(val){
                this.refresh();
            }
        },
        methods: {
            scroll(e) {
                this.scrollTop = e.y
            },
            refresh() {
                this.feed_list = [];
                this.cur_page_id = 1;
                this.noMore = false;
                this.noData = false;
                this.req_time = Date.now();
                this.fetching = false;
                this.loadMore().then(r => {
                    this.$refs.container.finishPullDown();
                })
            },
            getTop() {
                this.$refs.container.scroll.scrollTo(0, 0, 500)
            },
            errorHandler() {
                return true;
            },
            loadMore() {
                if(!this.fetching){
                    this.fetching = true;
                }
                return get_hot({
                    page_id: this.cur_page_id++,
                    page_count: 6,
                    req_time: this.req_time,
                    sort:this.sort
                }).then(r => {
                    this.fetching = false;
                    r.data.data && this.feed_list.push(...r.data.data);
                    this.page_total = r.data.page_total;
                    let {
                        no_more,
                        no_data
                    } = r.data;
                    this.noMore = no_more;
                    this.noData = no_data;
                }) 
            }
        },
        created() {},
        mounted() {
            this.loadMore();
        }
    }
</script>