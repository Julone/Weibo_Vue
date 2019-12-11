<template>
    <div>
        <div class="userimg" :class='len'>
            <el-image v-for="(el,index) in parseImg" :key="index" :src="'/api/uploads/'+el.path"
                @click.native.stop="openSwiper(index)" fit="cover">
            </el-image>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .scale(@size, @margin) {
        width: @size;
        height: @size;
        margin: @margin;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        background:#ccc;
    }
    .userimg {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        max-width: 400px;

        &.one {
            .el-image {
                .scale(140px, 5px);
            }
        }

        &.double {
            .el-image {
                .scale(120px, 5px);
            }
        }

        &.triple {
            .el-image {
                .scale(100px, 5px);
            }
        }
    }
</style>
<script>
    export default {
        props: {
            data: {
                default: [],
            }
        },
        computed: {
            parseImg() {
                if(!this.data) return [];
                try {
                    var data = this.data;
                    return Array.isArray(data) ? data : JSON.parse(data)
                } catch {
                    return []
                }
            },

            len() {
                if (this.parseImg) {
                    if (this.parseImg.length == 1) {
                        return 'one'
                    }
                    if (this.parseImg.length % 2 == 0) {
                        return 'double'
                    }
                    return 'triple'
                } else {
                    return ''
                }
            }
        },

        methods: {
            openSwiper(i) {
                this.$store.dispatch('openImageSwiper',{image_arr:this.parseImg,index:i});
            }
        }

    }
</script>