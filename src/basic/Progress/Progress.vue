<template>
  <div class="progress">
    <span class="progress-cur" :style="curStyle"></span>
    <span class="progress-text" v-if="showText">{{proportion}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ytProgress',
    props: {
      proportion: {
        type: String,
        default: ''
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      curStyle () {
        return `width:${this.proportion}; `
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .progress
    position: relative
    margin: 0 auto
    width: 80%
    height: 20px
    border-radius: 10px
    background-color: #ddd
    &-cur
      position: absolute
      top: 0
      bottom: 0
      left: 0
      border-radius: 10px
      background-color: #2ac845
    &-text
      position: absolute
      top: 50%
      left: 50%
      font-size: 12px
      color: #fff
      transform: translate3d(-50%, -50%, 0)
</style>
