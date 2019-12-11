<template>
  <div id="phantom">
    <navBar />
    <transition name='fadeApp'>
      <router-view />    
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  mounted(){
    this.$store.dispatch('appInit');
    window.onresize = (e)=>{
      this.$store.dispatch('computeWindow');
    }
  }
}
</script>
<style lang="less">
  @import './assets/css/app/normalize.less';
  @import './assets/css/app/animation.less';
  @import './assets/css/app/app.less';

</style>
