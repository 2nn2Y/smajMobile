<template>
  <yt-page title="应急视频">
    <div class="yt-scroll bgc">
      <p class="yt-noInfo" v-if="AccidentEnterpriseVideoList.length===0">暂无相关信息</p>
      <div class="row" @click="detail(item)" v-for="item in AccidentEnterpriseVideoList">
          <p class="groupName">{{item.groupName}} <span class="icon-right iconfont icon-fanhui"></span></p>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAccidentVideoGroups} from '@/api'
  export default {
    name: 'yjsp',
    data () {
      return {
        AccidentEnterpriseVideoList: [],
        id: 0
      }
    },
    activated () {
      let query = this.$router.currentRoute.query
      this.fetchData(query.AccidentId)
    },
    methods: {
      async fetchData (id) {
        if (id === this.id) return
        this.$module.loading.show()
        let res = await GetAccidentVideoGroups(id)
        this.$module.loading.hide()
        if (res.success) {
          this.AccidentEnterpriseVideoList = res.result
          this.id = id
        }
      },
      detail(item) {
        this.$router.push({path: `/yjspdetail/${item.id}`})
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .bgc
    background #fff

  .icon-right
    float right
    color #aaa
    transform rotate(180deg)

  .row
    boder-bottom 1px solid #f1f1f1
    text-align: left
    text-indent: 10px
    background: #edf4f7
    color: #333
    line-height: 2.3em
</style>
