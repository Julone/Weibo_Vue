<template>
    <div>
        <ul v-for="el in comments" :key="el.id">
            <li>
                {{el.user_name}}:{{el.reply_text}}
                <a @click="delComment(el.id)">删除</a>
            </li>
        </ul>
     
        <el-pagination v-if="reply_count" layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="cur_page" :page-size="page_size" :total="total">
        </el-pagination>
        <el-divider v-else>暂无评论</el-divider>
    </div>
</template>
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
                page_size: 2
            }
        },
        props: ['say_id','trigger','reply_count'],
        mounted(){
            if(!this.trigger && this.reply_count > 0 ){
                this.getComment();
                this.$emit('ajax')
            }
        },
        updated(){
           
            
        },
        methods: {
            handleSizeChange(val) {
                this.getComment();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.cur_page = val;

                this.getComment();
                console.log(`当前页: ${val}`);
            },
            delComment(id) {
                del_comment({
                    com_id: id
                }).then(r => {

                })
            },
            getComment() {
                get_comment({
                    say_id: this.say_id,
                    page_id: this.cur_page,
                    page_count: this.page_size
                }).then(r => {
                    var data = r.data.data;
                    this.comments = data.data
                    this.total = r.data.data.total;
                    this.trigger = true
                    console.log(this.comments);
                })
            }

        },


    }
</script>