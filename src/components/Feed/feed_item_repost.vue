<template lang="">
    <div class="card">
         <div class="item">
            <div class="left">
                <el-avatar></el-avatar>
                <span>{{data.user_name}}</span>
            </div>
            <div class="right">
                <div class="times">
                    <el-link disabled>{{data.say_time | shortTime}}</el-link>
                </div>
                <div class="usertext">{{data.say_text}}</div>
                <div class="userimg">
                    <el-image style="width: 100px; height: 100px" v-for="(el,index) in parseImg" :key="index"
                    :src="'/api/uploads/'+el.path" :preview-src-list="prevImg(index)">
                    </el-image>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['data'],
       computed: {
            parseImg() {
                try {
                    return JSON.parse(this.data.say_img)
                } catch {
                    return []
                }
            }
        },
         methods: {
            prevImg(index) {
                var or = this.parseImg.map(el => {
                    return '/api/uploads/' + el.path
                })
                var b = or.splice(index);
                return [...b, ...or]
            },
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
        width: 90%;
        margin: 20px auto;
        max-width: 500px;
            padding: 20px 12px;
    background: #ebeef5;

        .flex {
            display: flex;
        }

        .item {
            .flex;
            position: relative;

            @left_width: 20%;

            .left {
                width: @left_width;
                .flex;
                flex-direction: column;
            }

            .right {
                width: calc(100% - @left_width);
                .flex;
                flex-direction: column;

                .times {
                    width: 100%;
                    .flex;
                    justify-content: space-between;
                }

            }



        }
    }
</style>