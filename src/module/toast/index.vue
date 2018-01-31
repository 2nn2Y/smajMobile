<template>
  <transition name="yt-slider-top">
    <div class="yt-toast" v-if="showToast">
      <div class="yt-toast-opacity"></div>
      <img class="yt-toast-icon" :src="src" alt="提示">
      {{msg}}
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  const TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    TOOL: 'tool'
  }
  export default {
    name: 'yt-toast',
    computed: {
      src () {
        switch (this.type) {
          case TYPE.SUCCESS:
            return require('./ok.png')
          case TYPE.ERROR:
            return require('./error.png')
          case TYPE.TOOL:
            return require('./tool.png')
          default:
            return require('./tool.png')
        }
      }
    },
    data () {
      return {
        showToast: false,
        msg: 'hello world',
        type: TYPE.TOOL
      }
    },
    methods: {
      show (options) {
        let {msg, type, time = 1000} = options
        if (!msg) return
        this.msg = msg
        this.type = type || TYPE.TOOL
        this.showToast = true
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          this.showToast = false
        }, time)
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-toast
    position fixed
    top 0
    left 0
    width 100%
    height 45px
    line-height 45px
    display flex
    align-items center
    white-space nowrap
    z-index 7000
    padding-top 22px
    font-size 15px
    overflow hidden
    background-color #ffffff
    box-shadow 1px 0px 3px #eee
    transition transform .2s ease
    &-opacity
      position absolute
      top 0
      left 0
      width 100%
      height 22px
      background-color rgba(0, 0, 0, 0.3)
    &-icon
      margin 0 10px
      width 30px
      height 30px
</style>
