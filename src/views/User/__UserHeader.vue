<template>
    <div>
        <!-- <div class="skin_btn">
            <i class="el-icon-brush"></i>
        </div> -->
        <div class="header">
            <div class="headContent">
                <div class="user_icon item">
                    <userIcon @click.native="$store.dispatch('toUserCenterView',user_info.user_id)"
                        :src="user_info.user_icon" />
                </div>
                <div class="user_name item">
                    {{user_info.user_name}}
                </div>
                <div class="follow item">
                    <a @click="$store.dispatch('toUserFollowView',user_info.user_id)">
                        关注{{user_info.follow_count}}
                    </a>
                    <el-divider direction='vertical'></el-divider>
                    <a @click="$store.dispatch('toUserFansView',user_info.user_id)">
                        粉丝{{user_info.fans_count}}
                    </a>
                </div>
                <div class="user_introduce item">
                    简介：{{user_info.user_introduce}}
                </div>
            </div>
            <div class="headBg">
                <!-- autoplay loop muted -->
                {{video}}
                <video autoplay loop muted :src="video" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            user_info: {
                type: Object,
                default: {},
                required: true
            }
        },
        computed:{
            video(){
                return '/video/' + (!this.user_info.user_bg ?  'bg0.mp4':this.user_info.user_bg);
            }
        }
    }
</script>
<style lang="less" scoped>
    @hh: 33vmin;

    .header {
        width: 100%;
        // padding: 30px 0;
        height: @hh;
        overflow: hidden;

        position: relative;

        .headContent {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100%;
            background: linear-gradient(120deg, #94f0fb3d, #ef93843b);

            div.item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
                color: white;

                /deep/a {
                    color: white !important;

                    &:hover {
                        color: @a_active_color !important;
                    }
                }
            }
        }

        .headBg {
            video {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: auto !important;
                height: auto !important;
                min-height: 100%;
                min-width: 100%;
                z-index: -1;
                filter: grayscale(1)
            }
        }
    }
</style>