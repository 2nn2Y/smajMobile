<template>
  <yt-page title="企业类型统计">
    <div class="yt-scroll wrap">
      <canvas v-echarts="options" width="280" height="280"></canvas>
      <p class="title">共{{getTotalCount}}家企业</p>
      <div class="row" v-for="(QuantityStatistics, index) in QuantityStatisticsList">
        <span class="circle" :style="getBgc(index)"></span>
        <span class="name">{{QuantityStatistics.categoryName}}</span>
        <span class="count">{{QuantityStatistics.count}}家</span>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetQuantityStatisticsList} from '@/api'
  const COLORS = ['#189aca', '#fd9827', '#9aca41', '#cdfd9e', '#03a9f5', '#348d7c']
  export default {
    name: 'tjfxdetail',
    data () {
      return {
        QuantityStatisticsList: []
      }
    },
    computed: {
      getTotalCount () {
        let result = 0
        this.QuantityStatisticsList.forEach(item => {
          result += item.count
        })
        return result
      },
      options () {
        let data = this.QuantityStatisticsList.map(item => {
          return {
            value: item.count,
            name: item.count === 0 ? '' : item.categoryName
          }
        })
        return {
          title: { text: '企业类型分布图', left: '50%', textAlign: 'center' },
          color: COLORS,
          series: [{
            name: '销量',
            type: 'pie',
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            label: {
              normal: {
                show: true,
                position: 'inside',
                textStyle: {
                  fontSize: 14,
                  fontWeight: 'bold'
                }
              }
            },
            data
          }]
        }
      }
    },
    methods: {
      async fetchData () {
        this.QuantityStatisticsList = await GetQuantityStatisticsList()
      },
      getBgc (index) {
        return `background-color:${COLORS[index]}`
      }
    },
    activated () {
      this.fetchData()
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    text-align center

  .title
    border-bottom 1px solid #f1f1f1
    padding-bottom: 10px
    position: relative
    color: #707070
    font-size: 18px

  .row
    margin-left: 10px
    padding-right: 10px
    text-align: left
    color: #666
    display: flex
    align-items: center
    font-size: 15px
    line-height: 45px
    border-bottom: 1px solid #f1f1f1
    &:last-child
      margin-left: 0
      padding-left: 10px

  .circle
    flex: 0 0 1.4em
    display: flex
    font-size: 15px
    width: 1.4em
    height: 1.4em
    border-radius: 50%

  .name
    margin-left: 10px
    flex: 1

  .count
    text-align: right
    font-size: 14px
    flex: 0 0 50px
</style>
