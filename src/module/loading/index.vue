<template>
  <transition name="yt-fade">
    <div class="mask" v-show="showFlag">
      <div class="loader">
        <svg viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
        <span class="loader-text">{{text}}</span>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {listerBack} from '@/mixins'
  export default {
    mixins: [listerBack],
    name: 'loading',
    data () {
      return {
        showFlag: false,
        text: '请稍后...'
      }
    },
    methods: {
      show () {
        this.timeout = setTimeout(() => {
          this.showFlag = true
        }, 500)
      },
      hide () {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.showFlag = false
      }
    }
  }
</script>
<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .mask
    position: fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, 0.6)
    z-index 9999
    transition all .3s ease

  .loader
    position fixed
    top 22%
    left 50%
    width 260px
    display flex
    align-items center
    justify-content center
    text-align center
    padding 8px 10px
    box-sizing border-box
    border-radius 5px
    background-color rgba(0, 0, 0, 0.5)
    transform translate3d(-50%, -50%, 0)
    z-index 9999
    svg
      width 20px
      height 20px
      animation loader-rotate 1.5s linear 0s infinite
      circle
        stroke #f1f1f1
        stroke-width 0px
        stroke-linecap round
        animation loader-dash 1.5s ease 0s infinite
    &-text
      margin-left 10px
      color #f1f1f1
      font-size 14px

  @keyframes loader-dash
    0%
      stroke-width 4px
      stroke-dasharray 0 200
      stroke-dashoffset 0
    50%
      stroke-width 4px
      stroke-dasharray 90 150
      stroke-dashoffset -40px
    100%
      stroke-width 4px
      stroke-dasharray 90 150
      stroke-dashoffset -120px

  @keyframes loader-rotate
    0%
      transform rotate(0deg)
    100%
      transform rotate(360deg)

</style>
