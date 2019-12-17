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
                <!-- enter-active-class="animated bounceInRight" move-class='adc' leave-active-class="animated bounceOutRight" -->
                <transition-group tag="div" name="flip-list-noEnter">
                    <!-- <div > -->
                        <feedItem @remove='remove' v-bind:data.sync="el" :showTop='showTop'
                         v-for="(el,index) in cur_list" :key="el.id"></feedItem> 
                    <!-- </div> -->
                </transition-group>
            </div>
            <div class="pullup-wrapper" v-if="!noMore && feed_list.length != 0">
                <div class="before-trigger">
                    <img src="./../../../assets/svg/feed_loading.svg" height="70" alt="">
                </div>
            </div>
            <el-divider v-else-if="noMore && !noData">已经到底部了</el-divider>
            <footerBar v-if="!noFooter"/>
        </div>
        <imagePriview ref="imgPriview" v-if="!imageDestroy"></imagePriview>
        <reportForm v-if="!reportDestroy"/>
         
    </div>
</template>
<script>
    import animate from 'animate.css'
    export default {
        props:{
            feed_list:{
                required:true,
            },
            noMore:{
                type:Boolean
            },
            noData:{
                type:Boolean
            },
            label:{
                type:String
            },
            showTop:{
                type:Boolean,
                default:false
            },
            noFooter:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                imageDestroy:false,
                reportDestroy:false,
                removeList:[]
            }
        },
      
        computed:{
            cur_list(){
                return this.feed_list.filter(el=> !this.removeList.find(re => re === el.id) )
            }
        },
        methods:{
            remove(id){
                this.removeList.push(id);
            }
        },
        mounted(){
            
        },
        components: {
            imagePriview:()=>import('@/components/Public/Swiper/image_preview'),
            reportForm:()=>import('@/components/Public/Report')
        },
        beforeDestroy(){
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