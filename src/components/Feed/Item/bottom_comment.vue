<template>
    <div>
        
        <transition-group v-if="isAjax" name="reply_list" tag='ul' mode="out-in">
            <el-card :body-style="{padding:'10px'}" shadow="hover" class="card"
             v-for="el in (reply_count<=3 ? reply_count:3)" :key="el" >
                <a-skeleton active avatar :paragraph='{rows:1}'
                 :title='{width: rand[el] + 200}'>
                </a-skeleton>
            </el-card>
        </transition-group>
        <transition-group name="reply_list" tag='ul' mode="out-in">
            <li v-for="(el,index) in comments" :key="el.id">
                <el-dropdown :show-timeout='0' placement="top-end" trigger="hover" @visible-change="el.showDropdown = $event">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="toReply(el)">回复</el-dropdown-item>
                        <el-dropdown-item @click.native="delComment(el.id,index)">删除</el-dropdown-item>
                        <el-dropdown-item>举报</el-dropdown-item>
                    </el-dropdown-menu>
                    <i class="el-icon-arrow-down menu" :style="{transform:el.showDropdown?'rotate(180deg)':''}"></i>
                </el-dropdown>
                   <div class="wrapper">
                        <div class="left">
                            <router-link :to="{name:'user_center',params:{user_id:el.from_user_id}}" tag="a">
                                <userIcon :src="el.user_icon" :size="40"></userIcon>
                            </router-link>
                        </div>
                        <div class="right">
                            <div class="top">
                                <router-link :to="{name:'user_center',params:{user_id:el.from_user_id}}" tag="a">
                                    {{el.user_name}}
                                </router-link>
                                 <span v-if="el.reply_type == 'reply'">回复</span>
                                <a v-if="el.reply_type == 'reply'"
                                 @click="$router.push({name:'user_center',params:{user_id:el.to_user_id}})">
                                 {{el.to_user_name}}
                                 </a>
                                <Timer :time="el.reply_time" />
                            </div>
                            <div class="btm">
                                <sayText @click.stop :text='el.reply_text' />
                            </div>
                        </div>
                    </div>
            </li>
        </transition-group>
        <div class="no_data" v-if="noData">
            <a-empty :description="'没有相关微博'" style="margin-bottom:5px;"/>
        </div>
        <el-pagination
            :current-page.sync="cur_page"
            hide-on-single-page
            background
            @current-change="handleCurrentChange"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<style lang="less" scoped>
.card{
    margin: 10px auto;
}
    ul {
        & > li:not(.el-dropdown-menu__item) {
            background:white;
            position: relative;;
            margin-bottom: 10px;
            min-height: 50px;
            .el-dropdown {
                display: block;
                i.menu{
                    position: absolute;
                    right: 10px;top:10px;
                    // width: 20px;height: 20px;
                    transition: all linear .3s;

                    z-index: 100;
                }
            }
            .wrapper {
                    display: flex;
                    border: 1px solid #eee;
                    padding: 10px 10px;

                    .left {
                        flex: none;
                    }

                    .right {
                        width: 80%;
                        flex: 1;
                        padding-left: 10px;
                        display: flex;
                        flex-direction: column;
                    }
                }
        }
        /deep/.ant-skeleton-with-avatar .ant-skeleton-content{
            .ant-skeleton-title{
                margin:0;
            }
            .ant-skeleton-paragraph{
                margin-top:10px;
            }
        }


    }
</style>
<script>
    import {
        get_comment,
        del_comment
    } from '@/api/feed'
    export default {
        data() {
            return {
                comments: [],
                cur_page: 1,
                total: 0,
                page_size: 3,
                noMore: false,
                noData: false,
                firstLoad:true,
                isAjax:false,
                showDropdown:false
            }
        },
        components:{
            sayText:()=>import('./text.vue')
        },
        computed:{
            rand(){
                var arr= Array.from({length:this.reply_count},el => (Math.random() * 200) - 100 );
                return  arr;
            }
        },
        props: ['say_id', 'trigger', 'reply_count','type'],
        mounted() {
            if (!this.trigger && this.reply_count > 0) {
                this.getComment();
                this.$emit('ajax');
            }
        },
        methods: {
            delComment(id,index) {
                del_comment({
                    com_id: id
                }).then(r => {
                    r.data.code == 200 && this.$message.success(r.data.msg);
                    this.comments.splice(index,1);
                    this.$emit('delCom')
                })
            },
            closeReply(){
                this.$emit('closeReply');
            },
            handleCurrentChange(index){
                this.cur_page = index;
                this.getComment()
            },
            toReply(el){
                this.$emit('reply2reply',{
                    say_id:this.say_id,
                    to_user_id:el.user_id,
                    o_id:this.reply_type == 'reply' ? el.origin_id:el.id,
                    p_id:el.id,
                    reply_type:'reply'
                })
            },
            getComment() {
                this.isAjax =true;
                return get_comment({
                    say_id: this.say_id,
                    page_id: this.cur_page,
                    page_count: this.page_size
                }).then(r => {
                    this.trigger = true;
                    var data = r.data;
                    this.comments = data.data.map(el => (el.showDropdown = false,el));
                    this.noMore = data.no_more;
                    this.noData = data.no_data;
                    this.total = data.page_total;
                }).catch(e=>e)
                .then(r => {
                    this.isAjax= false
                })
            }

        },


    }
</script>