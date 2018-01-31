<template>
  <div class="pageWrap">
    <transition :name="type">
      <slot></slot>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'pageWrap',
    props: {
      type: {
        type: String,
        default: 'tf-left'
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .pageWrap
    height: 100%
    width: 100%

  .opacity-enter, .opacity-leave-active
    opacity: 0

  .tf-right-enter, .tf-right-leave-active
    opacity: 0
    transform: translate3d(-100%, 0, 0)

  .tf-left-enter, .tf-left-leave-active
    opacity: 0
    transform: translate3d(100%, 0, 0)
</style>
