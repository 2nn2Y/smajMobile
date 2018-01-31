<template>
  <div class="yt-group" ref="scroll">
    <div class="yt-group-content">
      <p class="yt-noInfo" v-if="!data.length">暂无内容</p>
      <div class="yt-group-content-pulldownWrap" ref="pulldown">
        <p class="yt-group-content-pulldown">
          <img class="yt-group-content-pulldown-icon" :status="info.status" :src="info.img">
          {{info.text}}
        </p>
      </div>
      <slot name="header"></slot>
      <div v-for="(item, index) in list" :key="index">
        <slot :data="item" :index="index"></slot>
      </div>
      <p class="yt-group-content-pullup" v-show="showPullUp">
        <img class="yt-group-content-pullup-icon" :status="infoUp.status" :src="infoUp.img">
        {{infoUp.text}}
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {delayed} from '@/utils'
  const STATUS_DOWN = {
    default: {
      status: 'default',
      text: '下拉刷新',
      img: require('./arrow.png')
    },
    before: {
      status: 'before',
      text: '释放立即刷新',
      img: require('./arrow.png')
    },
    enter: {
      status: 'enter',
      text: '正在刷新...',
      img: require('./loading.gif')
    },
    success: {
      status: 'success',
      text: '刷新成功',
      img: require('./success.png')
    },
    error: {
      status: 'error',
      text: '刷新失败',
      img: require('./error.png')
    }
  }
  const STATUS_UP = {
    default: {
      status: 'default',
      text: '上拉刷新',
      img: require('./arrow.png')
    },
    enter: {
      status: 'enter',
      text: '正在刷新...',
      img: require('./loading.gif')
    },
    error: {
      status: 'error',
      text: '暂无更多内容',
      img: require('./errorup.png')
    }
  }
  export default {
    name: 'group',
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      scrollY: {
        type: Boolean,
        default: true
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      pullDownFn: {
        type: Function
      },
      pullUpFn: {
        type: Function
      },
      name: {
        type: [Object, String, Number]
      }
    },
    created () {
      this.list = this.data
    },
    data () {
      return {
        list: [],
        InPullDown: false,
        info: STATUS_DOWN.default,
        infoUp: STATUS_UP.default,
        showPullUp: false
      }
    },
    mounted () {
      this.initScroll()
    },
    methods: {
      initScroll () {
        setTimeout(() => {
          if (this.scroll) {
            this.scroll.refresh()
          } else {
            const len = 50
            this.scroll = new BScroll(this.$refs.scroll, {
              click: true,
              scrollY: this.scrollY,
              scrollX: this.scrollX,
              probeType: 2,
              pullDownRefresh: {
                threshold: len + 40,
                stop: len
              },
              pullUpLoad: {
                threshold: 0,
                moreTxt: '上拉加载',
                noMoreTxt: '暂无更多内容'
              }
            })
            this.scroll.on('scroll', (pos) => {
              if (pos.y > len) {
                this.$refs.pulldown.setAttribute('style', `height: ${pos.y}px`)
              }
              if (this.InPullDown) return
              if (pos.y > len) {
                this.info = STATUS_DOWN.before
                return
              }
              if (pos.y > 0) {
                this.info = STATUS_DOWN.default
              }
            })
            this.scroll.on('pullingDown', this.pullingDown)
            this.scroll.on('pullingUp', this.pullingUp)
            this.$emit('ready', this.scroll)
          }
          if (!this.showPullUp && this.scroll.hasVerticalScroll) {
            this.showPullUp = true
            this.initScroll()
          }
        }, 30)
      },
      async pullingDown () {
        if (this.InPullDown) return
        this.info = STATUS_DOWN.enter
        this.InPullDown = true
        if (this.pullDownFn) {
          let res = await this.pullDownFn(this.name)
          if (res && res.length) {
            this.info = STATUS_DOWN.success
            this.list = res
          } else {
            this.info = STATUS_DOWN.error
          }
          await delayed(500)
          this.scroll.finishPullDown()
          await delayed(200)
          this.initScroll()
          this.InPullDown = false
        }
      },
      async pullingUp () {
        this.showPullUp = true
        this.infoUp = STATUS_UP.enter
        if (this.pullUpFn) {
          let res = await this.pullUpFn(this.name, this.list.length)
          if (res && res.length) {
            this.list = this.list.concat(res)
          } else {
            this.infoUp = STATUS_UP.error
          }
          await delayed(100)
          this.initScroll()
          this.scroll.finishPullUp()
        }
      }
    },
    watch: {
      'data' () {
        this.list = this.data
        this.initScroll()
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-group
    width 100%
    height 100%
    overflow hidden
    background #f5f5f5
    &-content
      position relative
      min-height 100%
      background #ffffff
      &-pulldownWrap
        position absolute
        top 0
        left 0
        width 100%
        height 50px
        line-height 50px
        background #343434
        transform translate3d(0, -100%, 0)
      &-pulldown
        position absolute
        bottom 0
        left 0
        width 100%
        height 50px
        line-height 50px
        color #ffffff
        text-align center
        font-size 14px
        &-icon
          &[status=default]
            position absolute
            left 20%
            top 50%
            width 30px
            height 30px
            transform translate3d(0, -50%, 0) rotate(180deg)
            transition transform .2s ease
          &[status=before]
            position absolute
            left 20%
            top 50%
            width 30px
            height 30px
            transform translate3d(0, -50%, 0)
            transition transform .2s ease
          &[status=enter]
            position absolute
            left 20%
            top 50%
            width 20px
            height 20px
            transform translate3d(0, -50%, 0)
          &[status=success], &[status=error]
            display inline-block
            vertical-align middle
            width 20px
            height 20px
      &-pullup
        position relative
        height 50px
        line-height 50px
        font-size 14px
        text-align center
        background #f5f5f5
        &-icon
          position absolute
          left 20%
          top 50%
          width 25px
          height 25px
          transform translate3d(0, -50%, 0)
          transition transform .2s ease


</style>
