<template>
  <yt-page title="重大危险源">
    <div class="yt-scroll">
      <div class="row" v-for="item in HazardManagementList" @click="detail(item)">
        <span class="row-text">{{item.hazardSourceName}}</span>
        <span class="row-icon iconfont icon-fanhui"></span>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetHazardManagementList} from '@/api'
  export default {
    name: 'zdwxy',
    data () {
      return {
        HazardManagementList: []
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        if (this.HazardManagementList.length) return
        this.HazardManagementList = await GetHazardManagementList()
      },
      detail (HazardManagementInfo) {
        this.$router.push({path: `/zdwxy/detail/${HazardManagementInfo.id}`})
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    display flex
    height 45px
    line-height 45px
    justify-content: space-between
    padding: 0 10px
    color: #555
    font-size: 15px
    background: #fff
    border-bottom 1px solid #f1f1f1
    box-sizing border-box
    &:active
      background: #f5f5f5
    &-text
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      ellipsis()
    &-icon
      margin-right: 5px
      color: #aaa
      transform: rotate(180deg)
</style>
