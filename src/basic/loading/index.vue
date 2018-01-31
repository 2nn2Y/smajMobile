<template>
  <div class="loading-wrap">
    <img class="loading-img" :src="src" alt="loading">
    <p class="loading-text">{{text}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'loading',
    data () {
      return {
        src: require('@/img/loading.gif'),
        text: '正在加载'
      }
    }
  }
</script>
<style type="text/stylus" type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .loading-wrap
    width 100%
    height 100%
    text-align center
    background-color #ffffff

  .loading-img
    margin 20px 0 10px 0
    width 30px
    height 30px

  .loading-text
    font-size 14px
    color #101010

</style>
