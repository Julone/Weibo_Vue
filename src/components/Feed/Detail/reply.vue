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
                        <userIcon :size="60" :src="el.user_icon" />
                        <div>
                            <div>{{el.user_name}}</div>
                            <div>{{el.reply_text}}</div>
                        </div>
                    </div>
                    <div class="right">
                        <Timer :time='el.reply_time' />
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
        get_comment
    } from '@/api/feed'
    export default {
        props: {
            target_id: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                data: [],
                cur_page_id: 1,
                page_count: 2,
                req_time: Date.now(),
                noMore: false,
                noData: false,
                total:-1
            }
        },
        methods: {
            loadMore() {
                 get_comment({
                    say_id: this.target_id,
                    page_id: this.cur_page_id++,
                    page_count: this.page_count
                }).then(r => {
                    var data = r.data;
                    this.data.push(...data.data);
                    this.noMore = data.no_more;
                    this.noData = data.no_data;
                    this.total = data.page_total;
                })
            }
        },
        mounted() {
            this.loadMore();
        }
    }
</script>