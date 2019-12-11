<template lang="">
    <div class="card">
        <div class="item">
            <div class="right">
                <div class="times">
                    <el-link :underline="false">{{data.user_name}}</el-link>
                    <el-divider direction="vertical" />
                    <Timer :time='data.say_time'/>
                </div>
                <feed-item-text v-if="data.say_text" :text='data.say_text' />
                <feed-item-img v-if="data.say_img" :data="data.say_img"></feed-item-img>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['data'],
        methods: {
            set_follow(val) {
                set_follow_user({
                    follow_id: val
                }).then((result) => {
                    console.log(result);
                }).catch((err) => {

                });
            }
        },
        mounted() {

        }
    }
</script>
<style lang="less" scoped>
    .card {
    margin: 10px auto;
    max-width: 500px;
    padding: 10px 15px 15px;
    background: linear-gradient(120deg, rgb(251, 251, 251), rgb(246, 246, 246));
    border-left: 3px solid #f2e0b0;
    border-radius: 0 3px 3px 0;

        .flex {
            display: flex;
        }

        .item {
            .flex;
            position: relative;

            .right {
                width: calc(100%);
                .flex;
                flex-direction: column;

                .times {
                    width: 100%;
                    align-items: center;
                    margin-bottom: 5px;
                    .flex;
                    // justify-content: space-between;
                    justify-content: flex-start;
                }

            }



        }
    }
</style>