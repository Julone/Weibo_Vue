<template>
    <div>
        
     
        <el-button @click="$router.push({name:'feed_send'})">click me to post</el-button>
        
        <div v-for="el in feed_list" :key="el.id">
            <feedItem :data="el"></feedItem>
        </div>

    </div>
</template>

<script>
import {get_feed} from './../../api/feed'
export default {
    data(){
        return {
            feed_list: [],
            req_time:Date.now()
        }
    },
    components:{
        feedItem:() => import('./../../components/Feed/feed_item'),
    },
    created(){},
    mounted(){
        get_feed({
            page_id:1,
            page_count:10000,
            req_time:this.req_time

        }).then(r => {
            this.feed_list.push(...r.data.data);

        })
    }
}
</script>
<style>
    
</style>