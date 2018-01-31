<template>
  <div class="yt-video-group">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'VideoGroup',
    componentName: 'VideoGroup',
    props: {
      value: null
    },
    created () {
      this.$on('video-play', (name) => {
        this.$emit('input', name)
      })
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-video-group
    width 100%
    height 100%
</style>
