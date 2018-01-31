<style scoped type="text/stylus" lang="stylus">
  .row
    display flex
    align-items center
    border-bottom 1px solid #eee
    padding 0 15px
    height 70px
    font-size 18px
    &:active
      background-color: #efeff4

  .left
    margin: 0 9px
    flex: 0 0 50px
    text-align: center
    img
      width: 50px
      height: 50px

  .center
    text-align: left
    flex: 1
    overflow: hidden

  .name
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    font-size: 15px
    margin-bottom: 10px
    color: #222

  .demand
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    font-size: .7em

  .right
    transform: rotate(180deg)
    flex: 0 0 50px
</style>
<template>
  <vSliderRow :disable="disable" :autoHide="true" @removeClick="handlerRemove">
    <div class="row" @click.stop="handlerClick">
      <div class="left">
        <img :src="data.img || './static/img/img-16.png'"/>
      </div>
      <div class="center">
        <p class="name">{{data.hiddenDangerCategoriesName}}</p>
        <p class="demand">{{data.hiddenDangerDescribe || '暂无描述'}}</p>
      </div>
      <div class="right iconfont icon-fanhui"></div>
    </div>
  </vSliderRow>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'recordRow',
    props: {
      data: {},
      disable: false
    },
    methods: {
      handlerRemove () {
        this.$emit('remove')
      },
      handlerClick () {
        this.$emit('click')
      }
    }
  }
</script>
