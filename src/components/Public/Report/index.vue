<template>
    <div>
        <el-dialog title="举报处理" top="20vmin" append-to-body destroy-on-close :visible.sync="report_status">
            <el-form label-position='top' style="padding:10px 30px">
                <el-form-item label="举报原因">
                    <el-row>
                      <el-radio-group v-model="form_type" style="display:block">
                        <el-row>
                            <el-col :span='8'><el-radio label="色情"></el-radio></el-col>
                            <el-col :span='8'><el-radio label="政治"></el-radio></el-col>
                            <el-col :span='8'><el-radio label="违法"></el-radio></el-col>                  
                        </el-row>
                        <el-row style="margin-top:15px">
                            <el-col :span='8'><el-radio label="广告"></el-radio></el-col>
                            <el-col :span='8'><el-radio label="病毒木马"></el-radio></el-col>
                            <el-col :span='8'><el-radio label="其他"></el-radio></el-col>                  
                        </el-row>
                        <el-row style="margin-top:15px">
                            <el-col :span='8'><el-radio label="侵犯未成年权益"></el-radio></el-col>     
                        </el-row>
                    </el-radio-group>
                    </el-row>
                  
                </el-form-item>
                <el-form-item label="详细描述">
                    <el-input type="textarea" :rows="3" placeholder="帮助我们快速处理" v-model="textarea">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$store.dispatch('closeReport')">取 消</el-button>
                <el-button type="primary" @click="submit">举报</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        data() {
            console.log(this.$store.state);
            return {
                textarea: '',
                form_type: ''
            }
        },
        computed: {
            ...mapState({
                'report_status': state => state.report.report_status,
            })
        },
        watch: {
            textarea(newVal) {
                this.setTextarea(newVal);
            },
            form_type(newVal) {
                this.setFormType(newVal)
            }
        },
        methods: {
            ...mapMutations([
                'setTextarea', 'setFormType'
            ]),
            submit() {
                this.$store.dispatch('reportFeed', {
                    report_type: this.form_type,
                    report_reason: this.textarea
                })
            }
        },
        mounted() {

        },
        destroyed() {

        }
    }
</script>
<style lang="less" scoped>
/deep/.el-dialog{
    max-width: 450px;;
}
</style>