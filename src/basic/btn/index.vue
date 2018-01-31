<template>
  <yt-view @click="handlerClick" :style="style" class="yt-btn">
    <img v-if="loading && InLoading" class="yt-btn-loading" :src="`${require('@/img/loading.png')}`">
    <slot></slot>
  </yt-view>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'btn',
    props: {
      bgColor: String,
      loading: {
        type: Boolean,
        default: false
      },
      click: Function
    },
    data () {
      return {
        InLoading: false
      }
    },
    computed: {
      style () {
        return `background-color: ${this.bgColor};`
      }
    },
    methods: {
      async handlerClick (e) {
        if (!this.loading) {
          this.$emit('click', e)
        }
        if (this.click && !this.InLoading) {
          this.InLoading = true
          await this.click()
          this.InLoading = false
        }
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-btn
    display flex
    position relative
    margin 10px
    align-items center
    justify-content center
    text-align center
    height 42px
    line-height 42px
    font-size 16px
    color #fff
    background-color #1eb9f2
    border-radius 2px
    &-loading
      margin-right 5px
      width 20px
      animation rotation 2s linear infinite

  @keyframes rotation
    from
      -webkit-transform rotate(0deg)
    to
      -webkit-transform rotate(360deg)

</style>
