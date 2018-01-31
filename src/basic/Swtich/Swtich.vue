<template>
  <div @click="toggleSwtich"
       :class="{'swtich-left': !isOpen,'swtich-right': isOpen}"
       class="swtich">
      <span class="swtich-text swtich-text-left"
            v-if="isOpen">ON</span>
    <span class="swtich-text swtich-text-right"
          v-if="!isOpen">OFF</span>
    <span class="swtich-circle"
          :class="{'swtich-circle-left': !isOpen,'swtich-circle-right': isOpen}"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'swtich',
    props: {
      open: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.isOpen = this.open
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleSwtich () {
        this.isOpen = !this.isOpen
        this.$emit('change', this.isOpen)
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .swtich
    position: relative
    display: inline-block
    vertical-align: middle
    width: 4.5em
    height: 2em
    line-height: 2em
    font-size: 15px
    border-radius: 1em
    transition: all .3s ease
    &-text
      font-size: 0.9em
      &-left
        margin-left: .8em
      &-right
        margin-right: .5em
    &-left
      border: 1px solid #ccc
      text-align: right
      color: #ccc
      background: #fff
    &-right
      border: 1px solid #00cd00
      text-align: left
      color: #fff
      background: #00cd00
    &-circle
      position: absolute
      width: 2em
      height: 2em
      background: #fff
      border-radius: 50%
      box-shadow: 2px 2px 5px #ccc, -2px 2px 5px #ccc
      font-size: 1em
      transition: all .3s ease
      &-left
        left: 0
      &-right
        transform: translate3d(-100%, 0, 0)
        left: 100%
</style>
