<template>
    <div>
        <div class="user_main">
            <user-card v-if="token" :user_id="user_id"></user-card>
            <el-alert class="item" title="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
                type="primary" show-icon :closable="false"></el-alert>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['user_id','token'])
    }
}
</script>

<style lang="less" scoped>
    .user_main{
        width: 230px;
        height: 200px;
        // background: red;
    }
</style>