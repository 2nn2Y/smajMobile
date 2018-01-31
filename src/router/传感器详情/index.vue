<template>
  <yt-page title="传感器详情">
    <div class="yt-scroll">
      <div class="row" v-for="(AccidentSensor,index) in AccidentSensorGroupsDetail">
        <span>{{AccidentSensor.assetName}}</span><span
        :style="AccidentSensor.isNormal ? 'color: green;' : 'color: red;'">{{AccidentSensor.value}}{{AccidentSensor.assetParms['计量单位']}}</span>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAccidentSensorGroupsDetail} from '@/api'
  export default {
    name: 'cgqxq',
    data () {
      return {
        AccidentSensorGroupsDetail: [],
        id: null
      }
    },
    methods: {
      async fetchData (id) {
        if (id === this.id) return
        this.$module.loading.show()
        this.AccidentSensorGroupsDetail = []
        let res = await GetAccidentSensorGroupsDetail(id)
        this.$module.loading.hide()
        if (res.success) {
          this.AccidentSensorGroupsDetail = res.result
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
  .row
    border-bottom 1px solid #f1f1f1
    display: flex
    font-size: 13px
    justify-content: space-between
    padding: 0 10px
    line-height: 2.6em
</style>
