<template>
  <div class="wrap">
    <iframe ref="iframe" class="iframe" :src="IframeUrl"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'iframePlay',
    data () {
      return {
        IframeUrl: ''
      }
    },
    activated () {
      this.IframeUrl = this.$router.currentRoute.query.src
    },
    deactivated () {
      this.IframeUrl = ''
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap, .iframe
    width: 100%
    height: 100%
</style>
