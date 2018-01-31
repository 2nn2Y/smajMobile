<template>
  <div class="row" @click="editClick">
    <div class="row-left">
      <div class="row-left-avatar" :style="avatarStyle()">{{data.asName}}</div>
    </div>
    <div class="row-center">
      <p class="row-center-name">{{data.enterpriseName}}</p>
      <p class="row-center-time">{{data.leadTime}}</p>
    </div>
    <div class="row-right iconfont icon-fanhui"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COLORS = ['#0066cc', '#99cc00', '#ff6666', '#ff6600', '#990033', '#99ccff', '#009966', '#990033']
  export default {
    name: 'todorow',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      },
      index: {
        type: Number,
        default: -1
      }
    },
    methods: {
      editClick () {
        this.$emit('click')
      },
      avatarStyle () {
        return `background-color: ${COLORS[this.index % COLORS.length]}`
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    margin: 0 10px
    border-bottom: 1px solid #ccc
    height: 95px
    display: flex
    box-sizing: border-box
    justify-content: center
    align-items: center
    text-align: center
    &-left
      flex: 0 0 100px
      &-avatar
        color: #fff
        font-size: 28px
        width: 2.2em
        height: 2.2em
        line-height: 2.2em
        display: inline-block
        border-radius: 50%
    &-center
      text-align: left
      flex: 1
      overflow: hidden
      &-name
        color: #000
        font-size: 16px
        margin: 15px 0
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
      &-time
        font-size: 14px
        margin: 15px 0
    &-right
      transform: rotate(180deg)
      flex: 0 0 40px
</style>
