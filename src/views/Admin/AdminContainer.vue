<template>
    <div>
        <router-view></router-view>

        <el-dialog title="提示" :visible="show_user_dialog" width="400px">
            <el-form ref="form" :model="user_data" label-width="80px" style="padding:10px">
                <el-form-item label="账号ID">
                    {{user_id}}
                    <!-- <el-input v-model="user_id" disabled></el-input> -->
                </el-form-item>
                <el-form-item label="账号名称">
                    {{user_data.user_name}}
                    <!-- <el-input v-model="user_data.user_name" disabled></el-input> -->
                </el-form-item>
                <el-form-item label="账号禁言">
                    {{user_data.user_silent}}
                       <el-date-picker
      v-model="user_data.user_silent"
      type="datetimerange" value-format='timestamp'
      placeholder="选择日期时间"
      >
    </el-date-picker>
                </el-form-item>
                <el-form-item label="账号封锁">
                                   <el-date-picker
      v-model="user_data.user_banned"
      type="datetimerange" value-format='timestamp'
      placeholder="选择日期时间">
    </el-date-picker>
                </el-form-item>
                <el-form-item label="账号注销">
                    {{user_data.deleted}}
                      <el-radio v-model="user_data.deleted" label="0">否</el-radio>
  <el-radio v-model="user_data.deleted" label="1">是</el-radio>
                </el-form-item>
                <el-form-item label="账号VIP">
                    {{user_data.user_vip}}
                               <el-radio v-model="user_data.user_vip" label="0">否</el-radio>
  <el-radio v-model="user_data.user_vip" label="1">是</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="admin_hide_user_dialog">取 消</el-button>
                <el-button type="primary" @click="admin_hide_user_dialog">确 定</el-button>
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
        data() {
            return {
                form: {},
            }
        },
        computed: {
            ...mapState({
                show_user_dialog: s => s.admin.show_user_dialog,
                user_id: s => s.admin.user_id
            }),
            user_data: {
                get(){
                    return this.$store.state.admin.user_data
                },
                set() {
                    this.$store.commit('setUserData_admin', val)
                }
            }
        },
        methods: {
            ...mapActions(['admin_hide_user_dialog']),
            aa() {
                this.$store.commit('setUserData_admin', val)
            }
        }

    }
</script>