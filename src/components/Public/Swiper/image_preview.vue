<template>

    <div class="swiper_container" v-show="show_status" id="image_preview" ref="swiper_container">
        <swiper :options="swiperOption" ref="swiper">
            <swiper-slide class="slide" v-for="(item, i) in image_arr" :key="i">
                <div class="swiper-zoom-container" data-swiper-zoom="3" @click="exit">
                    <div>
                        <img @click.stop style="width:800px;height:auto;" :src="'/api/uploads/' + item.path"
                            :alt="item.path">
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="swiper-tool">
            <button class="big" @click="rotate(-1)">
                <i class="el-icon-refresh-left" />
            </button>
            <button class="small" @click="slideTo(1)">
                <i class=" el-icon-arrow-left" /></button>
            <button class="close" @click="exit">
                <i class="el-icon-close" /></button>
            <button class="small" @click="slideTo(-1)">
                <i class="el-icon-arrow-right" /></button>
            <button class="big" @click="rotate(1)">
                <i class="el-icon-refresh-right" />
            </button>
        </div>

        <div class="swiper-shade"></div>

    </div>


</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {

        data() {
            var _this = this;
            return {
                swiperOption: {
                    spaceBetween: 0,
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
                    on: {
                        zoomChange: function (scale, imageEl, slideEl) {
                            slideEl.style.transform = `rotate(${_this.rotateDeg}deg)`
                        },
                        slideChange() {
                            _this.$nextTick(() => {
                                _this.resetImg();
                            })
                        }
                    }
                },
                rotateDeg: 0,

            }
        },
        computed: {
            ...mapState({
                'show_status': state => state.swiper.show_status,
                'image_arr': state => state.swiper.image_arr,
                'index': state => state.swiper.index
            })
        },
        watch: {
            show_status(val) {

                this.$nextTick(() => {
                    if (val) {
                        this.rotateDeg = 0;
                        this.$refs.swiper.swiper.slideTo(this.index, 0, false);
                    } else {
                        document.body.style.overflow = 'auto'
                    }
                })
            }
        },
        methods: {
            rotate(direction = 1) {
                this.rotateDeg += direction * 90;
                var img = this.$refs.swiper.$el.querySelector('.swiper-slide-active');
                img.style.transform = `rotate(${this.rotateDeg}deg)`;
            },
            slideTo(direction = 1) {
                var s = this.$refs.swiper.swiper;
                !!~direction ? s.slidePrev(500) : s.slideNext(500);
            },
            exit() {
                this.resetImg();
                this.$store.dispatch('closeImageSwiper');
            },
            resetImg(){
                var ar = this.$refs.swiper.swiper.el.querySelectorAll('.swiper-slide');
                [...ar].forEach(element => {
                    element.style.transform = ''
                });
                this.rotateDeg = 0;
            }
        },
        mounted() {
            this.bodyElement = this.$refs.swiper_container;
            document.body.appendChild(this.bodyElement);
        },
        destroyed() {
            this.bodyElement.remove();
        }
    }
</script>
<style lang="less" scoped>
    .swiper-shade {
        width: 100vw;
        height: 100vh;
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        background: #0000008c;
    }

    .swiper_container {
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        position: fixed;
        z-index: 10000;

        .slide {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            transition: all ease .4s;
            img{
                border-radius: 10px;;
            }
        }

        .swiper-tool {
            position: fixed;
            bottom: 6vh;
            left: 50vw;
            width: 30vw;
            margin-left: -15vw;
            height: 50px;
            border-radius: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100000;

            button {
                width: 50px;
                height: 50px;
                border: none;
    
                color: gray;
                border-radius: 50px;
                transition: all ease .2s;
                font-size: 1.5rem;
                background: #000000bd;
                cursor: pointer;

                &:hover {
                    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.3);
                    // background: rgba(128, 128, 128, 0.9);
                    color: white;
                    margin-top: -5%;
                }
            }

            .close {
                width: 65px;
                height: 65px;
                font-size: 1.8rem;
            }



        }
    }
</style>