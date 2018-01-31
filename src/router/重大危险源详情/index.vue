<template>
  <yt-page title="重大危险源详情">
    <div class="yt-scroll">
      <div class="title">基本信息</div>
      <p class="row">
        <label>危险源名称</label>
        <span>{{HazardManagementInfo.hazardsName}}</span>
      </p>
      <p class="row">
        <label>所在位置</label>
        <span>{{HazardManagementInfo.riskSourceLocation}}</span>
      </p>
      <p class="row">
        <label>危险源等级</label>
        <span>{{HazardManagementInfo.hazardsLevel}}</span>
      </p>
      <p class="row">
        <label>备案日期</label>
        <span>{{HazardManagementInfo.recordDateRisk}}</span>
      </p>
      <p class="row">
        <label>备案编号</label>
        <span>{{HazardManagementInfo.recordNumber}}</span>
      </p>
      <p class="row">
        <label>危险源负责人</label>
        <span>{{HazardManagementInfo.hazardsUser || '暂无'}}</span>
      </p>
      <p class="row">
        <label>负责人电话</label>
        <span>{{HazardManagementInfo.hazardsMobile || '暂无'}}</span>
      </p>
      <div class="title">物质情况</div>
      <p class="row2"
         v-if="HazardManagementInfo.goods && HazardManagementInfo.goods.length>0">
        <span>物质类别</span>
        <span>物质名称</span>
        <span>最大存储量</span>
      </p>
      <p class="yt-noInfo" v-if="!HazardManagementInfo.goods || HazardManagementInfo.goods.length===0">暂无相关信息</p>
      <p class="row2"
         v-for="good in HazardManagementInfo.goods">
        <span>{{good.chemicalsType}}</span>
        <span>{{good.dangerousGoodsName}}</span>
        <span>{{good.currentQuantity}}</span>
      </p>
      <div class="title">周围视频监控点</div>
      <yt-collapse-group>
        <yt-collapse :title="item.groupName" v-for="(item, index) in filterList(1)" :name="index" :key="index" v-if="item.type === 1">
          <p class="row" style="text-indent: 15px;font-size: 18px;padding-right: 10px;" @click="play(device)" v-for="device in item.devices">
            <input readonly class="yt-input" :value="device.name"/>
            <span style="transform: rotate(180deg);text-align: right;" class="iconfont icon-fanhui"></span>
          </p>
        </yt-collapse>
      </yt-collapse-group>
      <p class="yt-noInfo"
         v-if="filterList(1).length === 0">没有相关信息</p>
      <div class="title">周围传感器监控点</div>
      <yt-collapse-group>
        <yt-collapse :title="item.groupName" v-for="(item, index) in filterList(2)" :name="index" :key="index" v-if="item.type === 2">
          <p class="row" style="text-indent: 15px;font-size: 18px;padding-right: 10px;"
             v-for="device in item.devices">
            <input readonly class="yt-input" :value="device.name"/>
            <span style="color: green;">{{device.value.value}} / {{device.value.unit}}</span>
          </p>
        </yt-collapse>
      </yt-collapse-group>
      <p class="yt-noInfo" v-if="filterList(2).length === 0">没有相关信息</p>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetHazardDetail, GetDeviceUrl} from '@/api'
  export default {
    name: 'zdwxydetail',
    data () {
      return {
        HazardManagementInfo: []
      }
    },
    methods: {
      clear () {
        this.HazardManagementInfo = {}
      },
      filterList (index) {
        if (!this.HazardManagementInfo.groups || this.HazardManagementInfo.groups.length === 0) return []
        return this.HazardManagementInfo.groups.filter(item => {
          return item.type === index
        })
      },
      async play (device) {
        let res = null
        if (!device.src) {
          res = await GetDeviceUrl(device.id, device.parms)
          device.src = res.url
        }
        this.$router.push({
          path: '/iframePlay',
          query: {
            src: device.src
          }
        })
      },
      async fetchData (id) {
        if (id === this.id) return
        this.clear()
        this.$module.loading.show()
        let res = await GetHazardDetail(id)
        this.$module.loading.hide()
        if (res.success) {
          this.HazardManagementInfo = res.result
          this.id = id
        }
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.params.id)
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .title
    height 30px
    line-height 30px
    padding-left: 10px
    color: #20a0ff
    background: #fafafa
    font-size: 14px
    border-bottom: 1px solid #f1f1f1

  .row, .row2
    display flex
    height 40px
    line-height 40px
    border-bottom: 1px solid #f1f1f1
    padding: 0 15px
    display: flex
    justify-content: space-between
    font-size: 14px
    span
      font-size: 13px
      color: #aaa
    input
      flex: 1

    &-icon
      transform: rotate(-90deg)

  .row2
    span
      color: #101010
</style>
