<template>
    <div class="main">
        
        <swiper ref="swiper" :options="swiperOption" class="swiper-demo">
            <swiper-slide class="slide" v-for="(item, i) in img"  :key="i">
                <img @click.stop style="width:100%;height:auto;" :src="'/img/' + item" :alt="item">
            </swiper-slide>
        </swiper>

        <jDivider>精彩发现</jDivider>
        <feedList :feed_list="feed_list" :noData="noData" :noMore="noMore"/>
    </div>
</template>
<style lang="less" scoped>
.main{
    width: calc(100% - 240px);
    // flex: 1;
    padding:0  20px;
    .swiper-demo{
        margin: 0px auto 30px;
        img{
            border-radius: 10px;
        }
    }
}
</style>
<script>

   import {
        get_hot
    } from '@/api/explore'
export default {
    data() {
            return {
                feed_list: [],
                req_time: Date.now(),
                noMore: false,
                cur_page_id: 1,
                page_total: -1,
                scrollTop: 0,
                noData: false,
                fetching:false,
                img:[
                    '1572859364_912.png',
                    '1573186463_935.png',
                    '1573202882_722.jpeg',
                    '1574157846_103.jpeg'
                ],
                 swiperOption: {
                    spaceBetween: 20,
                    speed: 700,
                    initialSlide: 0,
                    lazy: {
                        loadPrevNext: true,
                        loadPrevNextAmount: 4,
                    },
                    mousewheel: true,
                    zoom: true,
                    keyboard: {
                        enabled: true,
                    },
                },
            }
        },
      
        methods: {
            loadMore() {
                if(!this.fetching){
                    this.fetching = true;
                }
                return get_hot({
                    page_id: this.cur_page_id++,
                    page_count: 9,
                    req_time: this.req_time,
                    sort: 'reply_count'
                }).then(r => {
                    this.fetching = false;
                    r.data.data && this.feed_list.push(..._.shuffle(r.data.data));
                    this.page_total = r.data.page_total;
                    let {
                        no_more,
                        no_data
                    } = r.data;
                    this.noMore = true;
                    this.noData = no_data;
                }) 
            }
        },
        created() {this.loadMore();},
        mounted() {
            
        }
}
</script>