<template>
    <div class="dw">
        <el-dropdown :show-timeout='0' @visible-change='showDropdown = $event'>
            <el-link :underline='false'>
                <i class="el-icon-arrow-down" :style="{transform:showDropdown?'rotate(180deg)':''}"></i>
            </el-link>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="data.auth.can_setTop"  @click.native="set_top(data.id)">
                    <i class='iconfont1' v-html="topped?'&#xe711;':'&#xe712;'"></i>
                    <span>{{topped? '取消':''}}置顶</span>
                </el-dropdown-item>
                <el-dropdown-item v-if="data.auth.can_follow" @click.native="set_follow(data.user_id)">
                    <i class="iconfont1" v-html="followed? '&#xe6e3;':'&#xe6e4;'"></i>
                    <span>{{ followed? '取消':''}}关注</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="addStar(data.id)">
                    <i class="iconfont1" v-html="favored?'&#xe6f4;':'&#xe6f5;'" />
                    <span>{{ favored? '取消':''}}收藏</span>
                </el-dropdown-item>
                <el-dropdown-item v-show="data.auth.can_delete" @click.native="deleteItem(data.id)">
                    <i class='iconfont1'>&#xe76f;</i>
                    删除
                </el-dropdown-item>
                <el-dropdown-item @click.native="$store.dispatch('openReport',{say_id:data.id,to_user_id:data.user_id})">
                    <i class='iconfont1'>&#xe777;</i>
                    举报</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<style lang="less" scoped>
.el-icon-arrow-down{
    transition: transform linear .3s;
}
/deep/.el-dropdown-menu__item{
        display: flex;
        align-items: center;
}
//
</style>
<script>
import {del_feed,set_top,unset_top,set_favor,unset_favor} from '@/api/feed'
import {unset_follow_user,set_follow_user } from '@/api/user'
export default {
    props:{
        data:{
            required:true
        }
    },
    data(){
        return {
            followed:this.data.follow_status?this.data.follow_status:false,
            topped:this.data.say_top?this.data.say_top:false,
            favored:this.data.favor_status?this.data.favor_status:false,
            showDropdown: false,
        }
    },
    methods:{
            set_follow(val) {
                if(this.followed){
                    return unset_follow_user({
                        follow_id: val
                    }).then((result) => {
                        if(result.data.code == 200){
                            this.followed = false;
                            this.$message.success(result.data.msg)
                        }
                    })
                }
                return set_follow_user({
                    follow_id: val
                }).then((result) => {
                    if(result.data.code == 200){
                        this.followed = true;
                        this.$message.success(result.data.msg)
                    }
                })
            },
            addStar(val){
                if(this.favored){
                    return unset_favor({
                        say_id: val
                    }).then((result) => {
                        if(result.data.code == 200){
                                    this.$message.success(result.data.msg)
                            this.favored = false;
                        }
                    })
                }
                return set_favor({
                    say_id: val
                }).then((result) => {
                    if(result.data.code == 200){
                            this.$message.success(result.data.msg)
                        this.favored = true;
                    }
                })
            },
            set_top(val) {
                if(this.topped){
                    return unset_top({
                        id: val
                    }).then((result) => {
                        if(result.data.code == 200){
                            this.$message.success(result.data.msg)
                            this.topped = false;
                        }
                    })
                }
                return set_top({
                    id: val
                }).then((result) => {
                    if(result.data.code == 200){
                    this.$message.success(result.data.msg)
                        this.topped = true;
                    }
                })
            },
       
            deleteItem(id){
                console.dir(this);
                // this.$parent.$el.style.display = 'none'
                this.$confirm('此操作将删除该微博', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center:true
                }).then(() => {
                    del_feed({
                        say_id:id
                    }).then(r=>{
                        if(r.data.code == 200){
                            this.$message.success(r.data.msg); 
                            this.$emit('remove',id);
                        }
                    })
                })
            }
        },
}
</script>