<template>
  <yt-page title="传感器信息">
    <div class="yt-scroll">
      <div class="row" @click="detail(AccidentSensor)" v-for="AccidentSensor in AccidentSensorGroups">
        {{AccidentSensor.groupName}}
        <span class="icon-right iconfont icon-fanhui"></span>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAccidentSensorGroups} from '@/api'
  export default {
    name: 'cgqxx',
    data () {
      return {
        AccidentSensorGroups: []
      }
    },
    methods: {
      detail (item) {
        this.$router.push({path: '/cgqxxdetail/' + item.id})
      },
      async fetchData(id) {
        if (id === this.id) return
        this.$module.loading.show()
        let res = await GetAccidentSensorGroups(id)
        this.$module.loading.hide()
        if (res.success) {
          this.AccidentSensorGroups = res.result
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
    border-bottom 1px solid #f1f1f1
    padding: 0 10px
    line-height: 2.7em

  .icon-right
    float right
    color #707070
    transform rotate(180deg)

</style>
