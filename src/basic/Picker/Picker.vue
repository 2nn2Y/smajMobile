<template>
  <div class="picker">
    <p class="picker-row">
      <span class="picker-row-num">2016</span>
      <span class="picker-row-num">5</span>
      <span class="picker-row-num">19</span>
    </p>
    <p class="picker-row picker-row-center">
      <span class="picker-row-num">2017</span>
      <span class="picker-row-num">6</span>
      <span class="picker-row-num">20</span>
    </p>
    <p class="picker-row">
      <span class="picker-row-num">2018</span>
      <span class="picker-row-num">7</span>
      <span class="picker-row-num">21</span>
    </p>
    <p class="picker-btns">
      <span class="picker-btns-btn" @click="cancel">取消</span>
      <span class="picker-btns-btn" @click="confim">确定</span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'picker',
    methods: {
      cancel () {
        this.$emit('cancel')
      },
      confim () {
        this.$emit('confim')
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .picker
    position: fixed
    left: 50%
    top: 50%
    width: 260px
    border-radius: 5px
    padding: 30px 15px 15px
    transform: translate3d(-50%, -50%, 0)
    background: #fff
    &-row
      display: flex
      text-align: center
      color: #999
      height: 60px
      line-height: 60px
      &-num
        margin: 0 10px
        flex: 1
      &-center
        color: #000
        .picker-row-num
          border-bottom: 1px solid #000
          border-top: 1px solid #000
    &-btns
      margin-top: 20px
      height: 40px
      line-height: 40px
      text-align: right
      &-btn
        margin: 0 15px
        font-weight: bold
        color: #348d7c
</style>
