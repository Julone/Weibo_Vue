<template>
    <div class="cont">
        <el-table border :row-class-name="tableRowClassName" class="needScroll"
         height="500" :data="tableData" stripe  @selection-change="handleSelectionChange">
                <el-table-column
      type="selection"
      width="40">
    </el-table-column>
            <el-table-column label="ID" fixed="left" width="50">
                <template slot-scope="scope">
                    <div align='center'>
                        {{scope.row.id}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="被举报用户" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                    <userIcon :size='30' style="flex:none" :src='scope.row.to_user_icon'></userIcon>
                    <span>{{ scope.row.to_user_name }}</span>
                </template>
            </el-table-column>
            
            
            <el-table-column label="举报理由" prop="report_type" show-overflow-tooltip  width="100">
            </el-table-column>
            <el-table-column label="举报理由" prop="report_reason" show-overflow-tooltip width="100">
            </el-table-column>

            <el-table-column label="微博文本" prop="say_origin_text" show-overflow-tooltip width="300">
            </el-table-column>
            <el-table-column label="微博图片" prop="say_img" width="100">
                <template slot-scope="scope">
                    <div align='center'>
                        <el-link :underline='false' v-if="scope.row.say_img.length > 0"
                             icon="el-icon-view"
                            @click.native="showImg(scope.row.say_img)">
                            {{scope.row.say_img.length}}
                        </el-link>
                        <span v-else>没有图片</span>
                        <i class="el-icon-close" v-else></i>
                    </div>
                </template>
            </el-table-column>
      
            <el-table-column label="删除" prop="say_deleted" width="50">
                <template slot-scope="scope">
                    <div align='center'>
                        <i :class="scope.row.say_deleted == 0? 'el-icon-close':'el-icon-check checked'"></i>
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
            <el-table-column label="举报用户" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                    <userIcon :size='30' style="flex:none" :src='scope.row.from_user_icon'></userIcon>
                    <span>{{ scope.row.from_user_name }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.say_deleted == 0" @click="delreply(scope.row)"
                    type="danger" size="small">删除微博
                    </el-button>
                    <el-button v-else @click="recreply(scope.row)" type="success" size="small">恢复微博
                    </el-button>
                    <el-button type="warning" size="small" @click="admin_show_user_dialog(scope.row.user_id)">账号操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <div style="position:absolute;left:0;bottom:0">
                <el-button @click="handled" :type="multipleSelection.length?'primary':''">
                    处理完毕
                </el-button>
            </div>

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
        report_get,
        weibo_del,
        weibo_rec,
        report_handled
    } from './api'
    import mixins from './mixins'
    export default {
        data() {
            console.log(this.$route);
            return {
                tableData: [],
          
                dialogVisible: false,
                im: [],
                //pagination
    
                multipleSelection:[]
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
            handleSelectionChange(val) {
                this.multipleSelection = val.map(el=>el.id);
            },
            
            handled(){
                report_handled({id_arr:this.multipleSelection})
                    .then(r=>{
                        r.data.code ==200 && this.$message.success(r.data.msg);
                        this.$store.dispatch('admin_refresh');
                    })
            },
          
            delreply({say_id}){
                weibo_del({say_id:say_id}).then(r=>{
                    r.data.code ==200 && this.$message.success(r.data.msg);
                    this.$store.dispatch('admin_refresh');
                })
            },
            recreply({say_id}){
                weibo_rec({say_id:say_id}).then(r=>{
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
                return report_get({
                    page_id:this.page_id,
                    page_count:this.page_count
                }).then(r => {
                    this.tableData = r.data.data.map(el=>{
                        el.say_img = this.parseImg(el.say_img);
                        return el
                    });
                    this.page_total = r.data.page_total;
                })
            }
        },
        created() {
            this.getData();
           
        }

    }
</script>
<style src="./style.less" lang="less" scoped></style>