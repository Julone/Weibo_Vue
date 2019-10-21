<template>
    <div>
        <scroll class="wrapper" ref="container" :data="data" listenScroll
            @pullup="loadMore" :pullup="!noMore">
            <div v-if="noData">
                <el-divider>没有数据</el-divider>
            </div>
            <div v-else>
                <div v-for="el in data" :key="el.id" class="item">
                    <div class="left" style="display:flex">
                        <usericon :size="60" :src="el.user_icon" />
                        <div>
                            <div>{{el.user_name}}</div>
                            <div>{{el.say_text}}</div>
                        </div>
                    </div>
                    <div class="right">
                        {{el.say_time}}
                    </div>
                </div>
                <div v-if="noMore">
                    <el-divider>没有更多了</el-divider>
                </div>
            </div>

        </scroll>
    </div>
</template>
<style lang="less" scoped>
.wrapper{
    overflow: hidden;
    height: calc(60vh - 45px);
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
    }
}
</style>
<script>
    import {
        get_repost_list
    } from '@/api/feed'
    export default {
        props: {
            target_id: {
                type: Number,
                
                required: true,
            }
        },
        components: {
            scroll: () => import('@/components/Public/Scroller/scroller.vue')
        },
        data() {
            return {
                data: [],
                cur_page_id: 1,
                page_count: -1,
                req_time: Date.now(),
                noMore: false,
                noData: false
            }
        },
        methods: {
            loadMore() {
                get_repost_list({
                    ids: this.target_id,
                    page_id: this.cur_page_id++,
                    req_time: this.req_time,
                    page_count:2
                }).then(r => {
                    if (r.data.code == 200) {
                        this.data.push(...r.data.data);
                        this.noMore = r.data.no_more,
                            this.noData = r.data.no_data
                    }
                })
            }
        },
        mounted() {
            this.loadMore();
        }
    }
</script>