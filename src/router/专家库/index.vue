<template>
  <yt-page class="zjk" title="专家库">
    <input v-model="key" placeholder="请搜索..." class="search yt-input" type="text">
    <yt-tabs :unflex="true" v-model="active">
      <yt-tab v-for="(tab, index) in TABS" :value="index" :key="index" :title="tab"></yt-tab>
      <div v-for="(tab, index) in TABS" :slot="index">
        <p class="yt-noInfo" v-if="filterData(index).length === 0">暂无相关信息</p>
        <div class="row"
             v-for="expert in filterData(index)"
             @click="detail(expert)">
          <span class="row-text">{{expert.name}} </span>
          <span class="row-icon iconfont icon-fanhui"></span>
        </div>
      </div>
    </yt-tabs>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetExpertList} from '@/api'
  const TABS = [
    '隐患排查专家',
    '应急救援专家',
    '标准化评审类专家',
    '安全培训专家',
    '事故调查专家',
    '重大隐患鉴定专家'
  ]
  export default {
    name: 'expert',
    data () {
      return {
        key: '',
        TABS,
        active: 0,
        ExpertList: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        this.ExpertList = await GetExpertList()
      },
      filterData (index) {
        if (this.key === '') {
          return this.ExpertList.filter((item) => {
            return item.expertCategoryName === TABS[index]
          })
        } else {
          let reg = new RegExp(this.key)
          return this.ExpertList.filter((item) => {
            return item.expertCategoryName === TABS[index] && item.name.match(reg)
          })
        }
      },
      detail (expert) {
        this.$router.push({path: '/zjk/detail/' + expert.id})
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    display flex
    align-items center
    height 40px
    line-height 40px
    font-size 14px
    justify-content: space-between
    padding: 0 10px
    color: #555
    background: #fff
    box-sizing border-box
    border-bottom: 1px solid #f1f1f1
    &:active
      background: #eee
    &-text
      color: #707070
      font-size: 14px
    &-icon
      margin-right: 5px
      color: #707070
      transform: rotate(180deg)

  .search
    margin: 5px 0 5px 5%
    border-radius: 2px
    width: 90%
    font-size: .8em
    height: 2em
    line-height: 2em
    text-indent: 1em
    background: #f2f2f2
</style>
