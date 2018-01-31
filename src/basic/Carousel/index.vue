<template>
  <div class="carousel" ref="scroll">
    <div class="carousel-container" :style="wrapStyle">
      <div class="carousel-item" v-for="(item, index) in data" :style="itemStyle">
        <slot :data="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    name: 'carousel',
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      value: {
        type: Number,
        default: 0
      }
    },
    mounted () {
      this.initScroll()
    },
    computed: {
      itemStyle () {
        return `width: ${100 / this.data.length}%;`
      },
      wrapStyle () {
        return `width: ${100 * this.data.length}%;`
      }
    },
    methods: {
      initScroll () {
        setTimeout(() => {
          if (this.scroll) {
            this.scroll.refresh()
          } else {
            this.scroll = new BScroll(this.$refs.scroll, {
              scrollX: true,
              snap: true,
              click: true
            })
            this.scroll.on('scrollEnd', () => {
              let page = this.scroll.getCurrentPage().pageX
              this.$emit('input', page)
            })
          }
          try {
            this.scroll.goToPage(this.value, 0, 0)
          } catch (e) {
          }
        }, 30)
      }
    },
    watch: {
      'data' () {
        this.initScroll()
      }
    }
  }
</script>
<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .carousel
    width 100%
    height 100%
    overflow hidden
    font-size 0
    &-container
      width 100%
      height 100%
    &-item
      display inline-block
      position relative
      width 100%
      height 100%
</style>
