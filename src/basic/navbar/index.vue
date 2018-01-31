<template>
  <div class="nav" :style="style">
    <div class="nav-opacity"></div>
    <div class="nav-left">
      <yt-icon @click="handlerClickLeft" :src="leftSrc"></yt-icon>
    </div>
    <div class="nav-center">
      {{title}}
    </div>
    <div @click="handlerClickRight" class="nav-right">
      <yt-icon v-if="rightSrc" :src="rightSrc"></yt-icon>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'navbar',
    props: {
      title: {
        type: String,
        default: ''
      },
      bgc: {
        type: String,
        default: ''
      },
      leftSrc: {
        type: String,
        default: require('./return.png')
      },
      rightSrc: {
        type: String,
        default: ''
      },
      disableLeft: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      style () {
        if (this.bgc) {
          return `background: ${this.bgc};`
        }
        return ''
      }
    },
    methods: {
      handlerClickLeft () {
        if (this.disableLeft) {
          this.$emit('click-left')
          return
        }
        this.$router.go(-1)
      },
      handlerClickRight () {
        this.$emit('click-right')
      }
    }
  }
</script>
<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  $NAV_HEIGHT = 44px
  $NAV_STATUS = 22px
  $NAV_FONTSIZE = 16px
  .nav
    position fixed
    display flex
    top 0
    left 0
    right 0
    z-index 5000
    color #fff
    text-align center
    height $NAV_HEIGHT
    line-height $NAV_HEIGHT
    padding-top $NAV_STATUS
    font-size $NAV_FONTSIZE
    background: -webkit-gradient(linear, 0 22, 100% 0, from(#508cfe), to(#39b8fd));
    &-opacity
      position absolute
      z-index 1000
      left 0
      top 0
      width 100%
      height 22px
      background-color rgba(0, 0, 0, 0.3)
    &-center
      flex 1
      height $NAV_HEIGHT
      line-height $NAV_HEIGHT
      text-align center
    &-left, &-right
      position absolute
      bottom 0
      font-size 14px
      height $NAV_HEIGHT
      line-height $NAV_HEIGHT
      img
        padding 10px
        width 24px
        height 24px
    &-left
      left 0
    &-right
      right 0
</style>
