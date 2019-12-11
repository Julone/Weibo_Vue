<template>
    <div class="card">
        <div class="item">
            <userIcon :src='userData.user_icon' :size='50'></userIcon>
        </div>
        <div class="item">
            {{userData.user_name}}
        </div>
        <div class="item">
            <div class="word pointer" @click="$store.dispatch('toUserFollowView',user_id)">
                <span>{{userData.follow_count}}</span>
                <span>关注</span>
            </div>
            <div class="word pointer" @click="$store.dispatch('toUserFansView',user_id)">
                <span>{{userData.fans_count}}</span>
                <span>粉丝</span>
            </div>
            <div class="word pointer" @click="$store.dispatch('toUserCenterView',user_id)">
                <span>{{userData.feed_count}}</span>
                <span>微博</span>
            </div>
        </div>
        <div class="item">
            <el-button @click="$store.dispatch('toUserCenterView',local_user_id)" size='mini'>我的主页</el-button>
        </div>
    </div>
</template>
<script>
import {getUserInfo} from '@/api/user'
import {mapGetters} from 'vuex'
export default {
    props:{
        user_id:{
            type:String
        }
    },
    computed:{
        is_self(){
            return this.$store.getters.user_id == this.user_id
        },
        local_user_id(){
            return this.$store.getters.user_id
        }
    },
    data(){
        return {
            userData:{}
        }
    },
    methods:{
        getUserInfo(){
            return getUserInfo({
                user_id: this.user_id
            }).then(r => {
                if(r.data.code == 200){
                    this.userData = r.data.data[0];
                }
            })
        }
    },
    mounted(){
        this.getUserInfo();
    }
}
</script>
<style lang="less" scoped>
    .card{
        @width: 230px;
        height: @width / 1.4;
        width: @width;
        background:white;
        border:1px solid #EBEEF5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px 0;
    align-items: center;
        .item{
            display: flex;
        //    flex-direction: column;
           // justify-content: center;
            .word{
                        display: flex;
           flex-direction: column;
               align-items: center;
    justify-content: center;
            margin: 0 10px;
           span:nth-child(2){
               font-size: 10px;
           }

            }
        }
    }
    
</style>