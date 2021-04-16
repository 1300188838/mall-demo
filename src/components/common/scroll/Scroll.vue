<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      currentProbe: {
        type: Number,
        default: 0
      },
      currentPullUp: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //1.创建BetterScroll 对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.currentProbe,
        pullUpLoad: this.currentPullUp,
        click: true
      })
      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scrollMore', position)
      })
      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('finishPullUp')
      })
    },
    methods: {
      //回到顶部事件
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // scroll刷新
      refresh() {
        this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
