<template>
    <div>
        <router-view></router-view>

        <el-dialog title="提示" :visible.sync="show_user_dialog" width="600px">
            <el-form ref="form" :model="user_data" label-width="80px" style="padding:10px">
                <el-form-item label="唯一账号">
                    {{user_id}}
                </el-form-item>
                <el-form-item label="账号名称">
                    {{user_data.user_name}}
                </el-form-item>
                <el-form-item label="账号禁言">
                    <el-date-picker v-model="user_data.user_silent" type="datetimerange" value-format='timestamp'
                        placeholder="选择日期时间" start-placeholder='选择禁言开始日期' end-placeholder='选择禁言结束日期'
                        format="yyyy-MM-dd hh:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="账号封锁">
                    <el-date-picker v-model="user_data.user_banned" type="datetimerange" value-format='timestamp'
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="账号注销">
                    <el-radio v-model="user_data.deleted" disabled label="1">是</el-radio>
                    <el-radio v-model="user_data.deleted" disabled label="0">否</el-radio>
                    <el-popconfirm v-if="user_data.deleted == '0'" confirmButtonText='确定' cancelButtonText='取消' center
                        icon="el-icon-info" iconColor="#f09191"
                        title="确定注销此账号吗？" @onConfirm="user_data.deleted = '1' ">
                        <el-button type="danger" slot="reference">注销此账号</el-button>
                    </el-popconfirm>
                     <el-button type="success" v-else @click="user_data.deleted = '0'">恢复此账号</el-button>
                </el-form-item>
                <el-form-item label="账号VIP">
                    <el-radio v-model="user_data.user_vip" label="1">是</el-radio>
                    <el-radio v-model="user_data.user_vip" label="0">否</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="admin_hide_user_dialog">取 消</el-button>
                <el-button type="primary" @click="admin_user_submit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    export default {
        computed: {
            ...mapState({
                user_id: s => s.admin.user_id,
                user_data: s => s.admin.user_data
            }),
            show_user_dialog: {
                get() {
                    return this.$store.state.admin.show_user_dialog
                },
                set(val) {
                    this.$store.commit('setUserDialog', val)
                }
            },
        },
        watch: {
            user_data: {
                deep: true,
                handler(v) {
                    this.$store.commit('setUserData_admin', v)
                }
            }
        },
        methods: {
            ...mapActions(['admin_hide_user_dialog', 'admin_user_submit']),
            ret() {
                console.log(arguments);
                return
            }
        }

    }
</script>