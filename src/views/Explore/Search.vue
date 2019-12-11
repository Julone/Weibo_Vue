<template>
    <div class="main">
        <jDivider top="10px" bottom='20px'>搜索结果</jDivider>
        <p v-if="users.length">微博用户</p>      
        <div v-if="users.length">
                <el-scrollbar style="min-height:100px;max-height:100px" wrapStyle='overflow-x: hidden'>
        <div class="data_wrapper">
                        <div v-for="el in users" :key="el.id" class="item" 
                        @click="$router.push({name:'user_center',params:{user_id:el.user_id}})">
                                <div class="left" style="display:flex">
                                    <userIcon :size="40" :src="el.user_icon" />
                                </div>
                                <div class="right">
                                        <div class="name">
                                            <div class="left">
                                            {{el.user_name}}
                                            </div>
                                            
                                        </div>
                                        <div class="text">{{el.user_introduce | nullText}}</div>
                                </div>
                        </div>
                </div>
                </el-scrollbar>
            
        </div>
        <p v-if="feed_list.length">相关微博</p>
        <feedList label='没有相关内容' :noFooter="true" :feed_list="feed_list" :noData="noData" :noMore="noMore"/>
        <footerBar/>
    </div>
</template>
<style lang="less" scoped>
.main{
    width: calc(100% - 240px);
    // flex: 1;
    padding:0  20px;
    .swiper-demo{
        margin: 0px auto 30px;
        img{
            border-radius: 10px;
        }
    }
}
.no_data{
    min-height: 120px;
    display: flex;
    flex-direction: column;

justify-content: center;
    align-items: center;
}
.data_wrapper {
    width: 100%;
display: flex;
overflow-x: hidden;
// flex-direction: column;
justify-content: space-between;
flex-wrap: wrap;
// margin-top: 20px;;
// min-height: 400px;
min-height: 240px;
    align-content: flex-start;
  
    .item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border: 1px solid #eee;
        padding: 10px;
        box-sizing: border-box;
        width: 48%;
        height: 80px;
        margin: 0 0 10px 0;
        flex:none;
        & > .right{
            flex: 1;
            margin-left: 10px;
            .text{
                height: 36px;
                margin-top: 5px;
                font-size: 12px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
            .name{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .right{
                    font-size: 10px;
                
                }
            }
        }
    }
}
.el-pagination{
    float: right;
}
</style>
<script>

   import {
        search_user,
        search_feed
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
                users:[],
                noData2:false,
                noMore2: false,
            }
        },
        watch:{
            "$route":'refresh'
        },
        filters:{
            nullText(val){
                console.log(val);
                return val ? val:'暂无介绍'

            }
        },
        methods: {
            loadMore() {
                if(!this.fetching){
                    this.fetching = true;
                }
                return search_feed({
                    page_id: 1,
                    page_count: 1000,
                    req_time: this.req_time,
                    q:this.$route.query.q
                }).then(r => {
                    this.fetching = false;
                    r.data.data && (this.feed_list = r.data.data);
                    this.page_total = r.data.page_total;
                    let {
                        no_more,
                        no_data
                    } = r.data;
                    this.noMore = true;
                    this.noData = true;
                }) 
            },
            loadUser(){
                return search_user({q:this.$route.query.q})
                .then(r=>{
                     r.data && (this.users = r.data.data);
                    this.noMore2 = true;
                    this.noData2 = !!!this.users.length;
                })
            },
            refresh(){
                Promise.all([this.loadUser(),this.loadMore()]).then(r=>{
                                console.log('oke');
                            })
            }
        },
        created() {
          this.refresh();
        },
        mounted() {
            
        },
        updated(){
            console.log(this.$route);
        }
}
</script>