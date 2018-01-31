<template>
  <yt-page title="事故简况">
    <div class="wrap">
      <div class="cont-wrap yt-scroll">
        <div class="row">
          <label>事故企业</label><span>{{Accident.enterpriseName}}</span>
        </div>
        <div class="row">
          <label>事故类型</label><span>{{Accident.accidentType}}</span>
        </div>
        <div class="row">
          <label>事发危险物质</label><span>{{Accident.hazardManagementName}}</span>
        </div>
        <div class="row">
          <label>事发时间</label><span>{{Accident.incidentDate}}</span>
        </div>
        <div class="row">
          <label>事发地点</label><span>{{Accident.incidentLocation}}</span>
        </div>
        <div class="row">
          <label>报警人</label><span>{{Accident.alarmPerson}}</span>
        </div>
        <div class="row">
          <label>报警电话</label><span>{{Accident.alarmPersonPhone}}</span>
        </div>
        <div class="col">
          <label>事故过程描述</label>
          <p><span>{{Accident.accidentDescription}}</span></p>
        </div>
      </div>
      <div class="btn-wrap">
        <yt-btn v-if="!isStart" @click="startEmergencyRescue" :class="{'btn-start': Accident.startRescue}">
          {{Accident.startRescue ? '应急救援已启动' : '启动应急救援'}}
        </yt-btn>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAccidentDetail, StartRescues} from '@/api'
  export default {
    name: 'jjxx',
    data () {
      return {
        Accident: {},
        id: null,
        isStart: false
      }
    },
    activated () {
      let query = this.$router.currentRoute.query
      this.isStart = (query.isStart + '') === 'true'
      let id = parseInt(query.AccidentId)
      this.fetchData(id)
    },
    methods: {
      async fetchData (id) {
        if (id === this.id) return
        this.Accident = {}
        this.$module.loading.show()
        let res = await GetAccidentDetail(id)
        this.$module.loading.hide()
        if (res.success) {
          this.Accident = res.result
          this.id = id
        }
      },
      startEmergencyRescue () {
        if (this.Accident.startRescue) return
        let confim = async () => {
          this.$module.loading.show()
          let res = await StartRescues(this.$router.currentRoute.query)
          this.$module.loading.hide()
          if (res.success) {
            this.Accident.startRescue = true
            this.$module.toast.show({msg: '启动成功!'})
            this.$router.go(-1)
          } else {
            this.$module.toast.show({msg: res.error.message})
          }
        }
        this.$module.confim.show({desc: '您确定要启动该事故吗？', confim})
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    display flex
    flex-direction column
    position relative
    width 100%
    height 100%
    overflow hidden

  .cont-wrap
    flex 1

  .btn-wrap
    width 100%

  .row
    display: flex
    justify-content: space-between
    padding 0 15px
    font-size: 14px
    height 45px
    line-height 45px
    border-bottom 1px solid #f1f1f1
    span
      color: #aaa

  .col
    line-height: 40px
    padding: 2px 20px 0
    font-size: 14px
    p
      text-align: right
      color: #aaa

  .btn-start
    background: #f2f4f6
    color: #aaa
</style>
