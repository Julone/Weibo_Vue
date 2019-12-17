<template>
    <div class="cont">
        <el-table border :row-class-name="tableRowClassName" class="needScroll"
         height="200" :data="tableData" stripe >
               <!-- <el-table-column fixed="left" label="用户头像"  width="70">
                <template slot-scope="scope">
                    <userIcon :size='10' :src='scope.row.user_icon'></userIcon>
                </template>
            </el-table-column> -->
            <el-table-column label="用户ID" width="240" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div align='center'>
                        {{scope.row.user_id}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="用户头像" prop="user_icon" show-overflow-tooltip>
                 <template slot-scope="scope">
                    <userIcon :size='40' align='center' :src='scope.row.user_icon'></userIcon>
                </template>
            </el-table-column>
            <el-table-column label="用户名" prop="user_name" show-overflow-tooltip>
            </el-table-column>
              <el-table-column label="用户密码" prop="user_pass"  width="120">
                <template slot-scope="scope">
                    {{ Decrypt(scope.row.user_pass) }}
                </template>
            </el-table-column>
         
            <el-table-column label="邮箱" prop="user_email" show-overflow-tooltip width="100">
            </el-table-column>
            
            <el-table-column label="性别" prop="user_sex" show-overflow-tooltip width="50">
            </el-table-column>
            <el-table-column label="出生日期" prop="user_birth" show-overflow-tooltip width="120">
            </el-table-column>
            <el-table-column label="管理员" prop="user_amdin" show-overflow-tooltip width="80">
            </el-table-column>
            <el-table-column label="vip" prop="user_vip" show-overflow-tooltip width="80">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="130">
                <template slot-scope="scope">
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
        users_get,
        weibo_del,
        weibo_rec,
        report_handled
    } from './api'
    import mixins from './mixins'
    import {Decrypt} from './../../utils/Aes'
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
            Decrypt,
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
                return users_get({
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