<template>
  <yt-page title="应急指挥部">
    <yt-collapse-group class="yt-scroll">
      <yt-collapse :title="item.partyName" :key="index" :name="index" v-for="(item, index) in PartyList">
        <div class="row">
          <span>牵头部门</span>
          <span>{{item.partName}}</span>
        </div>
        <div class="row">
          <span>负责人</span>
          <span>{{item.headName}}</span>
        </div>
        <div class="row">
          <span>联系电话</span>
          <a :href="'tel:' + item.mobile">{{item.mobile}}</a>
        </div>
        <div class="row">
          <span>分组职责</span>
        </div>
        <p class="col">{{item.obligation}}</p>
      </yt-collapse>
    </yt-collapse-group>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {getPartyList} from '@/api'
  export default {
    name: 'YJZHB',
    data () {
      return {
        PartyList: []
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        if (this.PartyList.length) return
        this.PartyList = await getPartyList()
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    border-bottom 1px solid #f1f1f1
    line-height: 40px
    padding 0 10px
    font-size: 14px
    display: flex
    color: #333
    justify-content: space-between

  .col
    border-bottom 1px solid #f1f1f1
    line-height: 35px
    box-sizing border-box
    padding 0 10px
    text-indent 20px
    color #aaa
</style>
