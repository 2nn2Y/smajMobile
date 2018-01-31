<style type="text/stylus" lang="stylus">
  .yt-alert
    position fixed
    top 0
    left 0
    z-index 7000
    transition all .3s ease

  .yt-alert-mask
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background-color rgba(0, 0, 0, 0.5)
    z-index 7000
    transition all .3s ease

  .yt-alert-text
    position fixed
    top 50%
    left 50%
    width 80%
    z-index 7000
    padding 10px 20px
    box-sizing border-box
    min-height 100px
    line-height 30px
    font-size 15px
    background-color #fff
    transform translate3d(-50%, -50%, 0)
    transition all .3s ease

  .yt-alert-zoom-enter
    transform translate3d(-50%, -50%, 0) scale(0.7)

  .yt-alert-zoom-leave-active
    opacity 0
    transform translate3d(-50%, -50%, 0)

</style>
<template>
  <div class="yt-alert">
    <transition name="yt-fade">
        <div class="yt-alert-mask" v-if="showFlag" @click="hide"></div>
    </transition>
    <transition name="yt-alert-zoom">
      <div class="yt-alert-text" v-if="showFlag">
        {{text}}
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {listerBack} from '@/mixins'
  export default {
    mixins: [listerBack],
    data () {
      return {
        text: 'hello world',
        showFlag: false
      }
    },
    methods: {
      show (text) {
        this.showFlag = true
        this.text = text
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>
