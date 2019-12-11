<template>
    <div class="scroll_container">
        <scroll class="scroll_wrapper" ref="container" :data="feed_list" listenScroll @pullup="loadMore"
            :pullup="!noMore" @scroll="scroll" @pulldown="refresh">
            <div class="scroll_content">
                <feed-send @sendOK='sendOK' />
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
    }
</style>

<script>
    import {
        get_feed
    } from './../../api/feed'
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
                fetching: false
            }
        },
        components: {
            feedSend: () => import('@/components/Feed/Send/send.vue')
        },
        methods: {
            sendOK(data) {
                this.feed_list.unshift(...Array.isArray(data) ? data : [data]);
            },
            scroll(e) {
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
            getTop() {
                this.$refs.container.scroll.scrollTo(0, 0, 500)
            },
            errorHandler() {
                return true;
            },
            loadMore() {
                if (!this.fetching) {
                    this.fetching = true;
                    return get_feed({
                        page_id: this.cur_page_id++,
                        page_count: 6,
                        req_time: this.req_time
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
            // refresh() { //刷新微博方法
            //     this.feed_list = [];//清空微博列表
            //     this.cur_page_id = 1; //重置当前分页的页码
            //     this.noMore = false;//重置下页是否还有数据的标记
            //     this.noData = false;//重置是否拥有数据的标记
            //     this.req_time = Date.now();//请求时间设置为当前时间
            //     this.loadMore().then(r => {//执行加载微博方法
            //         this.$refs.container.finishPullDown();
            //         //结束滚动容器下拉操作
            //     })
            // },
            // loadMore() { //加载微博方法
            //     return get_feed({ //get_feed是ajax的封装函数
            //         page_id: this.cur_page_id++, //传入当前页的页码，并自增
            //         page_count: 6,//请求6条微博数据
            //         req_time: this.req_time //请求时间
            //     }).then(r => {//使用Promise得到返回结果
            //         r.data.data && this.feed_list.push(...r.data.data);
            //         //如果返回了数据，那么将数据push到微博数组
            //         this.page_total = r.data.page_total;//获取总页数
            //         //获取是否下页还有数据的标记
            //         this.noMore = r.data.no_more;
            //         //获取是否拥有数据的标记
            //         this.noData = r.data.no_data;
            //     })
            // }
        },
        created() {},
        mounted() {
            this.loadMore();
        }
    }
</script>