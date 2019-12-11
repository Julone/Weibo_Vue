export default {
    install(Vue) {
        Vue.component('userIcon', () => import('@/components/User/user_icon.vue'))
        Vue.component('userCard', () => import('@/components/User/user_card.vue'))

        Vue.component('feedItem', () => import('@/components/Feed/Item/item.vue'))
        Vue.component('scroll', () => import('@/components/Public/Scroller/scroller.vue'))
        Vue.component('feedList', () => import('@/components/Feed/List/list.vue'))
        Vue.component('Timer', () => import('@/components/Public/Timer/timer.vue'))
        Vue.component('feedItemText', () => import('@/components/Feed/Item/text.vue'))
        Vue.component('feedItemImg', () => import('@/components/Feed/Item/image.vue'))

        //public
        Vue.component('navBar', () => import('@/components/Public/Header/nav_bar.vue'))
        Vue.component('searchBar', () => import('@/components/Search/search_bar.vue'))
        Vue.component('footerBar', () => import('@/components/Public/Footer/footer_bar.vue'))
        Vue.component('windowSwiper', () => import('@/components/Public/Swiper/swiper.vue'))
        Vue.component('jDivider', () => import('@/components/Public/Divider/index.vue'))

    }
}