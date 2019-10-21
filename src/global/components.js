export default {
    install(Vue) {
        Vue.component('usericon', ()=>import('@/components/User/user_icon.vue'))
        Vue.component('feedItem', ()=>import('@/components/Feed/feed_item.vue'))
        Vue.component('scroll', ()=>import('@/components/Public/Scroller/scroller.vue'))
        
    }
}