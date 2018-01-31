<template>
  <div class="radio"
       :class="{'radio-selected': selected}">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'radio',
    props: {
      selected: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  $activeColor = #007aff
  .radio
    box-sizing: border-box
    position: relative
    height: 1.2em
    width: 1.2em
    display: inline-block
    vertical-align: middle
    font-size: 12px
    border-radius: 50%
    border: 2px solid #aaa
    transition: all .3s ease
    &:after
      box-sizing: border-box
      margin: -.2em 0 0 -.2em
      position: absolute
      content: ' '
      top: 50%
      left: 50%
      font-size: 1.2em
      height: .4em
      width: .4em
      border-radius: .2em
      background: #aaa
    &-selected
      border: 2px solid $activeColor
      color: $activeColor
      &:after
        margin: -.2em 0 0 -.2em
        position: absolute
        content: ' '
        top: 50%
        left: 50%
        font-size: 1.2em
        height: .4em
        width: .4em
        border-radius: 50%
        background: $activeColor

</style>
