<template>
    <div class="cont">
        <el-table border :row-class-name="tableRowClassName" class="needScroll" height="500" :data="tableData" stripe>
            <el-table-column label="评论ID" fixed="left" width="100">
                <template slot-scope="scope">
                    <div align='center'>
                        {{scope.row.id}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评论用户" fixed="left" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                    <userIcon :size='30' style="flex:none" :src='scope.row.user_icon'></userIcon>
                    <span>{{ scope.row.user_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="被评论用户" fixed="left" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                    <userIcon :size='30' style="flex:none" :src='scope.row.to_user_icon'></userIcon>
                    <span>{{ scope.row.to_user_name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="评论内容" show-overflow-tooltip width="300">
                <template slot-scope="scope">
                    <div style="white-space:nowrap">
                    {{scope.row.reply_text}}

                    </div>
                </template>
            </el-table-column>
          
      
            <el-table-column label="删除" prop="say_deleted" width="50">
                <template slot-scope="scope">
                    <div align='center'>
                        <i :class="scope.row.deleted == 0? 'el-icon-close':'el-icon-check checked'"></i>
                    </div>
                </template>
            </el-table-column>


            <el-table-column label="发布时间" prop="say_time">
                <template slot-scope="scope">
                    <div>
                        <Timer :time='scope.row.reply_time' />
                    </div>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.deleted == 0" @click="delreply(scope.row)"
                    type="danger" size="small">删除
                    </el-button>
                    <el-button v-else @click="recreply(scope.row)" type="success" size="small">恢复
                    </el-button>
                    <el-button type="warning" size="small" @click="admin_show_user_dialog(scope.row.user_id)">账号操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page_id"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page_count"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_total">
            </el-pagination>
        </div>
        <el-dialog title="图片预览" :visible.sync="dialogVisible" width="60%" append-to-body>
            <el-carousel height="350px">
                <el-carousel-item v-for="item in im" :key="item.path"
                    style="display:flex;justify-content:center;padding:20px ">
                    <img :src="'/api/uploads/' + item.path" height="100%" alt="">
                </el-carousel-item>
            </el-carousel>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="search">
            <el-input placeholder="请输入关键词" v-model="q" class="input-with-select" @keyup.enter.native='search'>
                <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
            </el-input>
        </div>
     

    </div>
</template>

<script>
    import {
        reply_get,
        reply_del,
        reply_rec
    } from './../api'
    import mixins from './../mixins'
    export default {
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                im: [],
            }
        },
        components: {
            sayText: () => import('@/components/Feed/Item/text.vue')
        },
        watch:{
            '$route':'getData'
        },
        mixins:[mixins],
        methods: {
            delreply({id}){
                reply_del({com_id:id}).then(r=>{
                    r.data.code ==200 && this.$message.success(r.data.msg);
                    this.$store.dispatch('admin_refresh');
                })
            },
            recreply({id}){
                reply_rec({com_id:id}).then(r=>{
                    r.data.code ==200 && this.$message.success(r.data.msg);
                    this.$store.dispatch('admin_refresh');
                })
            },
         
            showImg(im) {
                this.im = this.parseImg(im);
                this.dialogVisible = true;
                console.log(im);
            },
            getData(){
                return reply_get({
                    page_id:this.page_id,
                    page_count:this.page_count,
                    q:this.q
                }).then(r => {
                    this.tableData = r.data.data.map(el=>{
                        el.say_img = this.parseImg(el.say_img);
                        return el
                    });
                    this.page_total = r.data.page_total;
                })
            },
        },
        created() {
            this.getData();
        }
    }
</script>
<style  src="./../style.less" lang="less" scoped></style>