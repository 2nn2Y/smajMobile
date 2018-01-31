<template>
  <div class="pageBar">
    <span class="pageBar-left">
      <slot name="left">
        <span @click="exitPage" class="pageBar-left-icon iconfont icon-fanhui" v-if="showLeft"></span>
      </slot>
    </span>
    <span class="pageBar-center">
      <slot></slot>
    </span>
    <span class="pageBar-right">
      <slot name="right"></slot>
    </span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'pageBar',
    props: {
      showLeft: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: ''
      },
      emitClick: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      exitPage () {
        if (this.emitClick) {
          this.$emit('leftClick')
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .pageBar
    position: fixed
    width: 100%
    top: 0
    display: flex
    height: 44px
    line-height: 44px
    font-size: 16px
    color: #fff
    text-align: center
    padding-top 22px
    background-color: #03a9f5
    overflow: hidden
    &-left, &-right, &-center
      display: inline-block
    &-left
      flex: 0 0 60px
      &-icon
        font-size: 20px
    &-center
      flex: 1
    &-right
      flex: 0 0 70px
</style>
