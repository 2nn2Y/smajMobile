<template>
  <yt-page title="执法文书统计">
    <span class="rili iconfont icon-rili" @click="showPicker" slot="right"></span>
    <div class="yt-scroll">
      <div class="wrap">
        <canvas v-echarts="options" width="355px" height="330px" ref="canvas"></canvas>
      </div>
      <div class="row" v-if="DocumentStatistics.statisticCount.length > 0"
           v-for="(item, index) in DocumentStatistics.statisticCount">
        <span class="circle" :style="getBgc(index)"></span>
        <span class="desc">{{item.type}}</span>
        <span class="count">{{item.count}}次</span>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetDocumentStatistics} from '@/api'
  const COLORS = ['#9aca41', '#189aca', '#61a0a8', '#d48265']
  export default {
    name: 'zfwstj',
    data () {
      return {
        DocumentStatistics: {
          statisticCount: [],
          monthList: [],
          docList: []
        }
      }
    },
    computed: {
      options () {
        return {
          title: {
            text: '执法文书统计柱状图',
            left: '50%',
            textAlign: 'center'
          },
          grid: {
            left: '5%',
            right: '20%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '月份',
              offset: 0,
              axisLabel: {
                interval: 0,
                rotate: -50
              },
              data: this.DocumentStatistics.monthList,
              axisTick: {
                alignWithLabel: true
              },
              boundaryGap: true
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '数量',
              boundaryGap: true
            }
          ],
          series: this.DocumentStatistics.docList.map((item, index) => {
            return {
              name: '文书',
              type: 'bar',
              colorByPoint: true,
              labelLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: item.map(val => {
                return {
                  value: val,
                  itemStyle: {
                    normal: {
                      color: COLORS[index]
                    },
                    emphasis: {
                      color: COLORS[index]
                    }
                  }
                }
              })
            }
          })
        }
      }
    },
    activated () {
      let now = new window.Date(window.Date.now())
      this.fetchData(now.getFullYear())
    },
    methods: {
      async fetchData (year) {
        let res = await GetDocumentStatistics(year)
        function add (array) {
          let result = 0
          array.forEach(item => {
            result += item
          })
          return result
        }
        let statisticCount = [
          {
            type: '现场检查方案文书',
            count: add(res.jianChaFangAnCount)
          },
          {
            type: '现场检查记录文书',
            count: add(res.jianChaWenShuCount)
          },
          {
            type: '责令限期整改文书',
            count: add(res.zeLingZhengGaiCount)
          },
          {
            type: '整改复查意见书',
            count: add(res.fuChaYiJianCount)
          }
        ]
        let monthList = res.creationTime
        let docList = [
          res.jianChaFangAnCount,
          res.jianChaWenShuCount,
          res.zeLingZhengGaiCount,
          res.fuChaYiJianCount
        ]
        this.DocumentStatistics = {
          statisticCount,
          monthList,
          docList
        }
      },
      showPicker () {
        this.$module.picker.show({
          ok: (date) => {
            this.fetchData(date.getFullYear())
          }
        })
      },
      getBgc (index) {
        return `background-color:${COLORS[index]}`
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    text-align: center
    margin: 10px 0

  .row
    margin-left: 10px
    padding-right: 10px
    text-align: left
    color: #666
    display: flex
    align-items: center
    line-height: 45px
    font-size: 14px
    border-bottom: 1px solid #ccc
    &:last-child
      margin-left: 0
      padding-left: 10px

  .circle
    margin-right: 10px
    background: red
    flex: 0 0 1.4em
    font-size: 14px
    width: 1.4em
    height: 1.4em
    border-radius: 50%

  .desc
    flex: 1

  .count
    flex: 0 0 100px
    text-align: right

  .rili
    font-size: 25px

</style>
