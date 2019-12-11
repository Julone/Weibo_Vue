<template>
    <div>
        <div v-if="feed_list.length == 0">
            <div class="no_data" v-if="noData">
                    <a-empty :description="label || '没有相关微博'" style="margin-bottom:5px;"/>
                    <slot name="default"></slot>
            </div>
            <el-card v-else shadow="hover" class="card " v-for="el in 7" :key="el" >
                <a-skeleton active avatar />
            </el-card>
        </div>
        
        <div class="feed_list" v-else>
            <div style='min-heihgt:100vh'>
               <div v-for="(el,index) in feed_list" :class="index< 5 ?'ani' + index :''" :key="el.id">
                    <feedItem @removeCard='removeCard' :data="el" :showTop='showTop'></feedItem>
                </div>
            </div>
            <div class="pullup-wrapper" v-if="!noMore && feed_list.length != 0">
                <div class="before-trigger">
                    <img src="./../../../assets/svg/feed_loading.svg" height="70" alt="">
                </div>
            </div>
            <el-divider v-else-if="noMore && !noData">已经到底部了</el-divider>
        </div>
        <imagePriview ref="imgPriview" v-if="!imageDestroy"></imagePriview>
        <reportForm v-if="!reportDestroy"/>
    </div>
</template>
<script>
    export default {
        props: ['feed_list', 'noMore', 'noData','label','showTop'],
        data(){
            return{
                imageDestroy:false,
                cur_list:this.feed_list,
                reportDestroy:false
            }
        },
        methods:{
            leave(){
                console.log(arguments);
            },
            removeCard(i){
                this.cur_list.splice(i,1);
            }
        },
        components: {
            imagePriview:()=>import('@/components/Public/Swiper/image_preview'),
            reportForm:()=>import('@/components/Public/Report')
        },
        destroyed(){
            this.imageDestroy = true;
            this.reportDestroy = true;
        }
    }
</script>
<style lang="less" scoped>
    .card{
        width: 100%;
        margin: 20px auto;
    }
    .no_data{
        display: flex;
        align-items: center;
        min-height: 300px;
        justify-content: center;
        flex-direction: column;
    }
    .before-trigger{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .feed_list{}
</style>