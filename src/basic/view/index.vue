<template>
  <yt-touch-ripple :centerRipple="center" class="yt-view" @click="handlerClick">
    <slot></slot>
  </yt-touch-ripple>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'ytView',
    props: {
      center: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handlerClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-view
    position relative
</style>
