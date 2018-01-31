<template>
  <yt-page title="统计分析">
    <div class="yt-scroll">
      <p class="row"
         @click="detail(item)"
         v-for="item in list">
        <span class="row-left iconfont"
              :class="item.iconCla"
              :style="iconStyle(item.color)"></span>
        <span class="row-center">{{item.name}}</span>
        <span class="row-right iconfont icon-fanhui"></span>
      </p>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'tjfx',
    data () {
      return {
        list: [
          {
            name: '企业类型统计',
            iconCla: 'icon-caidan',
            path: '/qylxtj',
            color: '#506ee9'
          },
          {
            name: '执法文书统计',
            path: '/zfwstj',
            iconCla: 'icon-tongjifenxi2',
            color: '#8ec545'
          }
        ]
      }
    },
    methods: {
      iconStyle (color) {
        return `color:${color}`
      },
      detail (item) {
        this.$router.push({path: item.path})
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .row
    display flex
    align-items center
    justify-content space-between
    margin-left: 10px
    height: 45px
    line-height: 45px
    font-size: 15px
    border-bottom: 1px solid #ccc
    &:last-child
      margin: 0
      padding-left: 10px
    &-center
      flex: 1
      text-align: left
    &-left
      font-size: 25px
      flex: 0 0 50px
    &-right
      color: #bbb
      flex: 0 0 50px
      transform: rotate(180deg)
</style>
