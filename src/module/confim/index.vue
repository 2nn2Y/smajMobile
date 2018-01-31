<template>
  <div class="yt-confim">
    <transition name="yt-fade">
      <div v-if="showFlag" class="yt-confim-mask" @click="handlerClose"></div>
    </transition>
    <transition name="yt-confim-zoom">
      <div v-if="showFlag" class="yt-confim-content">
        <p class="yt-confim-title">{{title}}</p>
        <p class="yt-confim-desc">{{desc}}</p>
        <div class="yt-confim-btnWrap">
          <span @click="handlerClose">关闭</span>
          <span @click="handlerConfim">确认</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {listerBack} from '@/mixins'
  export default {
    name: 'yt-confim',
    mixins: [listerBack],
    data () {
      return {
        showFlag: false,
        title: '温馨提示',
        desc: '您确定要提交吗？'
      }
    },
    methods: {
      show (option = {}) {
        Object.assign(this, option)
        this.showFlag = true
      },
      handlerClose () {
        this.showFlag = false
      },
      handlerConfim() {
        this.showFlag = false
        if (this.confim) {
          this.confim()
        }
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-confim
    position fixed
    top 0
    left 0
    z-index 9000
    &-mask
      position fixed
      top 0
      left 0
      bottom 0
      right 0
      background-color rgba(0, 0, 0, 0.5)
      transition all .3s ease
    &-content
      position fixed
      left 50%
      top 50%
      width 82%
      height 170px
      border-radius 5px
      color #101010
      background-color #ffffff
      border-top 5px solid #0086e5
      transform translate3d(-50%, -50%, 0)
      transition all .3s cubic-bezier(.11, 1.27, .44, 1.06)
    &-desc
      margin 0 20px
      font-size 15px
      line-height 22px
    &-title
      text-align center
      line-height 50px
      letter-spacing 1px
      font-size 18px
    &-btnWrap
      display flex
      text-align center
      position absolute
      bottom 0
      left 0
      width 100%
      height 40px
      line-height 40px
      border-top 1px solid #f5f5f5
      overflow hidden
      span
        flex 1
        font-size 14px
        height 100%
        border-right 1px solid #f5f5f5
        box-sizing border-box
        &:active
          background-color #f5f5f5

  .yt-confim-zoom-enter
    transform translate3d(-50%, -50%, 0) scale(0.1)

  .yt-confim-zoom-leave-active
    opacity 0
    transform translate3d(-50%, -50%, 0)
</style>
