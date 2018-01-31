<template>
  <yt-page title="应急专家">
    <div class="yt-scroll">
      <div class="yt-noInfo" v-if="AccidentsExperts.length === 0">暂无相关专家</div>
      <div class="row" v-for="expert in AccidentsExperts" @click="detail(expert)">
        {{expert.name}}
        <span class="row-icon iconfont icon-fanhui"></span>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAccidentsExperts} from '@/api'
  export default {
    name: 'yjzj',
    data () {
      return {
        AccidentsExperts: [],
        id: 0
      }
    },
    methods: {
      detail (expert) {
        this.$router.push({path: '/zjk/detail/' + expert.id})
      },
      async fetchData (id) {
        if (id === this.id) return
        this.AccidentsExperts = []
        this.$module.loading.show()
        let res = await GetAccidentsExperts(id)
        this.$module.loading.hide()
        if (res.success) {
          this.AccidentsExperts = res.result
          this.id = id
        }
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.query.AccidentId)
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    display flex
    justify-content space-between
    height 45px
    line-height 45px
    font-size 14px
    padding: 0 10px 0 10px
    color: #555
    background: #fff
    border-bottom 1px solid #f1f1f1
    &:active
      background: #eee
    &-icon
      margin-right: 5px
      color: #aaa
      transform: rotate(180deg)
</style>
