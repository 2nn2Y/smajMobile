<template>
  <div>
    <transition name="yt-fade">
      <div class="yt-mask" @click="hide" v-show="value"></div>
    </transition>
    <transition name="yt-slider-bottom">
      <div class="list-wrap" v-show="value">
        <div class="list-title">
          <slot name="title">
            <span class="yt-float-l" @click="cancel">取消</span>
            <label>{{title}}</label>
            <span class="yt-float-r" @click="confim">完成</span>
          </slot>
        </div>
        <div class="list-cont">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'alert-wrap',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      cancel () {
        this.$emit('cancel')
        this.hide()
      },
      confim () {
        this.$emit('confim')
      },
      hide () {
        this.$emit('cancel')
        this.$emit('input', false)
      }
    }
  }
</script>
<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .list-wrap
    position absolute
    z-index 8000
    bottom 0
    left 0
    right 0
    height 284px
    background #fff
    overflow hidden
    transition all .3s ease

  .list-title
    position absolute
    top 0
    left 0
    right 0
    padding 0 10px
    height 40px
    line-height 40px
    color #03a9f5
    box-sizing border-box
    text-align center
    overflow hidden
    label
      color #101010

  .list-cont
    position absolute
    top 40px
    left 0
    right 0
    height 244px
    background #fff
    overflow-x hidden
    overflow-y auto
    &::-webkit-scrollbar
      width 0
      height 0
</style>
