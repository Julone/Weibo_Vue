<template>
    <div class="exp_wrapper">
        <router-view></router-view>
        <div class="right">
            <div class="topic_wrapper">
                <div class="title">
                    热门话题<i class="el-icon-guide"></i>
                
                </div>
                <el-scrollbar style="height:230px">
  <ul class="hot_top">
                    <li class="item" @click="clickTopic(index)" v-for="(el,index) in topic" :key="el.id">
                   
                        <router-link tag="a" :to="{name:'search',query:{q:`#${el.topic_name}#`}}" replace>
                         #{{el.topic_name}}#
                        </router-link>
                        <span>{{el.click_count}}</span>
                    </li>
                </ul>
                </el-scrollbar>
            </div>


        </div>
    </div>
</template>
<script>
    import {
        get_topic_list,
        topic_click
    } from '@/api/explore'
    export default {
        data() {
            return {
                topic: [],
                req_time:Date.now()
            }
        },
        methods:{
            clickTopic(i){
                // console.log(this.topic[i]);
                this.$set(this.topic[i],'click_count',this.topic[i].click_count+1);
                topic_click({id:this.topic[i].id})
            }
        },
        created() {
            get_topic_list().then((result) => {
                this.topic = result.data.data
            }).catch((err) => {

            });
        }

    }
</script>
<style lang="less" scoped>
    .exp_wrapper {
        display: flex;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding-top: 20px;
        justify-content: space-between;

        .right {
            flex: none;
            width: 240px;

            .topic_wrapper {
                width: 100%;
                background: #f5f7fa;
                padding: 10px 15px;
                border-radius: 10px;

                .title {
                    padding: 10px 0;
                    letter-spacing: 3px;

                    span {
                        float: right;
                    }
                }

                ul {
                    .item {

                        padding: 4px 0;

                        span {
                            float: right;
                            margin-right: 20px
                        }
                    }
                }
            }
        }
    }
</style>