<template>
    <div>
        <div class="no_data" v-if="noData">
            <a-empty :description="'没有粉丝'" style="margin-bottom:5px;" />
            <slot name="default"></slot>
        </div>
        <div v-else>
             <div class="data_wrapper" >
                    <div v-for="el in data" :key="el.id" class="item"
                     @click="$router.push({name:'user_center',params:{user_id:el.user_id}})">
                            <div class="left" style="display:flex" >
                                <userIcon :size="40" :src="el.user_icon" />
                            </div>
                            <div class="right">
                                    <div class="name">
                                        <div class="left">
                                        {{el.user_name}}
                                        </div>
                                        <div class="right">
                                            <Timer :time="el.update_time"></Timer>被关注
                                        </div>
                                    </div>
                                    <div class="text">{{el.user_introduce}}</div>
                            </div>
                    </div>
            </div>
        </div>
            <el-divider></el-divider>

        <el-pagination
        background
         @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page_id"
            :page-sizes="[10, 20, 30, 40]" :page-size="page_count" layout="total, sizes, prev, pager, next, jumper"
            :total="page_total">
        </el-pagination>

    </div>
</template>
<style lang="less" scoped>
       @import './follow.less';

</style>
<script>
    import {
        get_fans_list
    } from '@/api/user/follow'
    export default {
        props: {
            target_id: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                data: [],
                cur_page_id: 1,
                page_count: 10,
                page_total: -1,
                req_time: Date.now(),
                noMore: false,
                noData: false,
                fetching: false
            }
        },
        methods: {
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.page_count = val
                this.getlist();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.cur_page_id = val;
                this.getlist();
            },
            getlist() {
                this.fetching = true;
                get_fans_list({
                    page_id: this.cur_page_id,
                    req_time: this.req_time,
                    page_count: this.page_count,
                    user_id: this.target_id
                }).then(r => {
                    if (r.data.code == 200) {
                        this.data = r.data.data;
                        this.page_total = r.data.page_total;
                        this.cur_page_id = r.data.page_id;
                        this.page_count = r.data.page_count;
                        this.noMore = r.data.no_more,
                            this.noData = r.data.no_data
                    }
                    this.fetching = false;
                })
            }
        },
        mounted() {
            // this.loadMore();
            this.getlist();
        }
    }
</script>