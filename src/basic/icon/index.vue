<template>
  <yt-view @click="handlerClick" class="yt-icon" :center="true">
    <img :src="src">
  </yt-view>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'icon',
    props: {
      src: {
        type: String,
        default: ''
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
  .yt-icon
    display inline-block
    width 40px
    height 40px
    padding 8px
    box-sizing border-box
    img
      width 24px
      height 24px
</style>
