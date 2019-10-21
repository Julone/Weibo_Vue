<template>
    <div>
        <router-link :to="{name:'home_follow'}">关注</router-link>
        <router-link :to="{name:'home'}">主页</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    

}
</script>