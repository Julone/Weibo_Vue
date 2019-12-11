<template>
  <div ref="wrapper" class="scroll_wrapper">
    <div class="scroll_content">
      <transition name='fromTop'>
        <div class="pull_down_item" :style="{height: pos.y + 'px',top: - pos.y+'px'}" v-show="showpulldown">
          <img src="@/assets/svg/fill-ranbow.svg" height="100%" alt="">
          <span class="tip-content">{{pulldownTip.text}}</span>
        </div>
      </transition>
      <slot></slot>
      <div class="bodyElement toolBox" ref="toolBox">
        <a-button shape='circle' size='large' icon="rocket" @click="backTop" v-show="pos.y < -200" />
        <a-button shape='circle' size='large' icon="reload" @click="refresh1" :loading='reload' />
      </div>

    </div>
  </div>
</template>
<style lang="less" scoped>
  .scroll_wrapper {
    user-select: none;

    .pull_down_item {
      position: absolute;
      top: -100px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      padding: 10px 0;

      img {
        max-height: 150px;
      }

      .tip-content {
        font-size: 12px;
        color: gray
      }
    }

    .pull_down_loading {
      text-align: center;
      z-index: -1;
    }
  }

  .toolBox {
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 100px;
    height: fit-content;
    // padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    button {
      margin: 0 auto 15px;
    }
  }
</style>
<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      beforePullDown: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 2
      },
      click: {
        type: Boolean,
        default: true
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default: true
      },
      beforeScroll: {
        type: Boolean,
        default: true
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
        this.scroll.scrollTo(0, 0, 0);
      }, 20)
      this.$nextTick(() => {
        document.querySelectorAll('.toolBox').forEach(el => {
          el.remove();
        })
        document.body.appendChild(this.$refs.toolBox);
      })

    },
    destroyed() {
      this.$el && this.$el.parentNode.removeChild(this.$el);
      document.querySelectorAll('.toolBox').forEach(el => {
          el.remove();
        })
    },
    data() {
      return {
        pulldownTip: {
          text: '下拉刷新'
        },
        pos: {},
        showpulldown: false,
        reload: false,
        showLoading: false
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    },
    methods: {
      backTop() {
        this.pos = {
          x: 0,
          y: 0
        }
        this.scroll.scrollTo(0, 0, 1000);
      },
      refresh1() {
        this.scroll.scrollTo(0, 0, 1000);
        this.reload = true;
        this.$emit('pulldown');
      },
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          mouseWheel: this.listenScroll,
          preventDefault: false,
          scrollbar: {
            fade: false,
            interactive: false
          },
          tap: true
        })
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.pos = pos;
            if (pos.y > 0) {
              this.showpulldown = true
            }
            if (this.pulldown) {
              if (pos.y > 70) {
                this.pulldownTip = {
                  text: '松开立即刷新',
                }
              } else {
                this.pulldownTip = {
                  text: '下拉刷新', // 松开立即刷新
                }
              }
            }

          })
        }
        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', (pos) => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 20) && this.pullup) {
              this.$emit('pullup');
            }
          })
        }


        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            if (pos.y > 50) {
              this.$emit('pulldown');
              this.showLoading = true;
            }
            this.showpulldown = false;
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      // finishPullDown({msg=''} = {}){
      //   this.showLoading = false;
      // },
      finishPullDown() {
        this.showLoading = false;
        this.reload = false;
        this.scroll && this.scroll.finishPullDown();
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
  }
</script>