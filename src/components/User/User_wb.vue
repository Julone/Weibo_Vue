<template>
    <div class="feed-list">
        <div v-for="el in feed_list" :key="el.id">
            <feedItem showTop :data="el"></feedItem>
        </div>
        <div class="pullup-wrapper" v-if="!noMore">
            <div class="before-trigger"><span>加载更多</span></div>
        </div>
        <div v-else-if="noMore && !noData" >已经到底部了</div>
        <div class="no-feed-list" v-if="noData">
            没有数据
        </div>
    </div>
</template>
<script>
export default {
    props:['feed_list','noMore','noData'],
    components:{
    },
    mounted(){
        console.log("TCL: mounted ->  this.feed_list",  this.feed_list)
    }
}
</script>