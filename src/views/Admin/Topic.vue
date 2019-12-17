<template>
    <div class="cont">
        <el-table border :row-class-name="tableRowClassName" class="needScroll" height="500" :data="tableData" stripe>
            <el-table-column label="话题ID" fixed="left" width="100">
                <template slot-scope="scope">
                    <div align='center'>
                        {{scope.row.id}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="话题名称" prop="topic_name" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column label="话题类型" prop="topic_type" show-overflow-tooltip width="100">
            </el-table-column>
             <el-table-column label="创建时间" prop="create_time">
                <template slot-scope="scope">
                    <div>
                        <Timer :time='scope.row.create_time' />
                    </div>
                </template>
            </el-table-column>
             <el-table-column label="更新时间" prop="update_time">
                <template slot-scope="scope">
                    <div>
                        <Timer :time='scope.row.update_time' />
                    </div>
                </template>
            </el-table-column>
          

            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.deleted == 0" @click="delItem(scope.row)"
                    type="danger" size="small">删除
                    </el-button>
                    <el-button v-else @click="recItem(scope.row)" type="success" size="small">恢复
                    </el-button>
                    <el-button type="warning" size="small" @click="dialogVisible = true">
                        发布话题</el-button>
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
        <el-dialog title="话题发布" :visible.sync="dialogVisible" width="350px" append-to-body>
               <el-form ref="form" :model="topic_data" label-width="80px" style="padding:10px">
                <el-form-item label="话题名称">
                    <el-input v-model="topic_data.topic_name"></el-input>
                </el-form-item>
                <el-form-item label="话题类型">
                    <!-- <el-input v-model="topic_data.topic_type"></el-input> -->
                    <el-select v-model="topic_data.topic_type" style="width:100%" placeholder="请选择分类">
                        <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
             
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
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
        topic_get,
        topic_del,
        topic_rec,
        topic_add
    } from './api'
    import mixins from './mixins'
    export default {
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                im: [],
                topic_data:{
                    topic_name:'',
                    topic_type:'默认'   
                },
                options:['默认','网络','新闻','娱乐','学校','游戏','青春','职场']
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
            submit(){
                topic_add({
                    topic_name:this.topic_data.topic_name,
                    topic_type:this.topic_data.topic_type
                }).then(r=>{
                    r.data.code ==200 && this.$message.success(r.data.msg);
                    this.$store.dispatch('admin_refresh');
                })
                this.dialogVisible =false;
            },
            delItem({id}){
                topic_del({id:id}).then(r=>{
                    r.data.code ==200 && this.$message.success(r.data.msg);
                    this.$store.dispatch('admin_refresh');
                })
            },
            recItem({id}){
                topic_rec({id:id}).then(r=>{
                    r.data.code ==200 && this.$message.success(r.data.msg);
                    this.$store.dispatch('admin_refresh');
                })
            },
         
            showImg(im) {
                this.im = this.parseImg(im);
                this.dialogVisible = true;
            },
            getData(){
                return topic_get({
                    page_id:this.page_id,
                    page_count:this.page_count,
                    q:this.q
                }).then(r => {
                    this.tableData = r.data.data.map(el=>{
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
