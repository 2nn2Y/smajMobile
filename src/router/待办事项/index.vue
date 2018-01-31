<template>
  <yt-page :title="title">
    <yt-tabs :disableSlider="true" v-if="userRoleType === 0" v-model="active">
      <yt-tab v-for="(tab, index) in tabs" :value="index" :key="index" :title="tab"></yt-tab>
      <div class="yt-scroll" :slot=0>
        <div class="yt-noInfo" v-if="!EnterprisesTreatedList.length">暂无内容</div>
        <yt-todo-row @click="detail(item, KEYS.INSPECT)" :key="index" :index="index" v-for="(item, index) in EnterprisesTreatedList" :data="item"/>
      </div>
      <div class="yt-scroll" :slot=1>
        <div class="yt-noInfo" v-if="!PendingReviewList.length">暂无内容</div>
        <vSliderRow :autoHide="true" :btns="btns" height="100" @editClick="edit" :index="index" :key="index" v-for="(item, index) in PendingReviewList">
          <yt-todo-row @click="detail(item, KEYS.REVIEW)" :index="index" :data="item"/>
        </vSliderRow>
      </div>
    </yt-tabs>
    <div class="yt-scroll" v-if="userRoleType === 1">
      <div class="yt-noInfo" v-if="!UnDealAccidents.length">暂无内容</div>
      <yt-todo-row @click="detail(item, KEYS.STARTUP)" :key="index" :index="index" v-for="(item, index) in UnDealAccidents" :data="item"/>
    </div>
    <div class="yt-scroll" v-if="userRoleType === 2">
      <div class="yt-noInfo" v-if="!PendingAuditInstructionList.length">暂无内容</div>
      <yt-todo-row @click="detail(item, KEYS.EXAMINE)" :key="index" :index="index" v-for="(item, index) in PendingAuditInstructionList" :data="item"/>
    </div>
    <yt-tabs v-if="userRoleType === 3" v-model="active">
      <yt-tab v-for="(tab, index) in tabs" :value="index" :key="index" :title="tab"></yt-tab>
      <div class="yt-scroll" :slot=0>
        <div class="yt-noInfo" v-if="!PendingAuditInstructionList.length">暂无内容</div>
        <yt-todo-row @click="detail(item, KEYS.EXAMINE)" :key="index" :index="index" v-for="(item, index) in PendingAuditInstructionList" :data="item"/>
      </div>
      <div class="yt-scroll" :slot=1>
        <div class="yt-noInfo" v-if="!UnDealAccidents.length">暂无内容</div>
        <yt-todo-row @click="detail(item, KEYS.STARTUP)" :key="index" :index="index" v-for="(item, index) in UnDealAccidents" :data="item"/>
      </div>
    </yt-tabs>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetEnterprisesTreatedList, GetPendingReviewList, GetPendingAuditInstruction, GetUnDealAccidents, UpdateLawEntRectificationTime} from '@/api'
  const KEYS = {
    INSPECT: 'inspect',
    REVIEW: 'review',
    STARTUP: 'startUp',
    EXAMINE: 'examine'
  }
  export default {
    name: 'dbsx',
    data () {
      return {
        KEYS,
        EnterprisesTreatedList: [],
        PendingReviewList: [],
        PendingAuditInstructionList: [],
        UnDealAccidents: [],
        userRoleType: 0,
        active: 0,
        btns: [
          {
            text: '编辑',
            type: 'danger',
            clickName: 'editClick'
          }
        ]
      }
    },
    computed: {
      tabs () {
        switch (this.userRoleType) {
          case 0:
            return [`待检查(${this.EnterprisesTreatedList.length})`, `待复查(${this.PendingReviewList.length})`]
          case 1:
            return [`待启动(${this.UnDealAccidents.length})`]
          case 2:
            return [`待审核(${this.PendingAuditInstructionList.length})`]
          case 3:
            return [`待审核(${this.PendingAuditInstructionList.length})`, `待启动(${this.UnDealAccidents.length})`]
        }
      },
      title () {
        switch (this.userRoleType) {
          case 0:
          case 3:
            return '待办事项'
          case 1:
            return '待启动'
          case 2:
            return '待审核'
        }
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        let query = this.$router.currentRoute.query
        this.userRoleType = parseInt(query.userRoleType)
        this.userId = parseInt(query.userId)
        switch (this.userRoleType) {
          case 0:
            this.EnterprisesTreatedList = await GetEnterprisesTreatedList()
            this.PendingReviewList = await GetPendingReviewList()
            break
          case 1:
            this.UnDealAccidents = await GetUnDealAccidents()
            break
          case 2:
            this.PendingAuditInstructionList = await GetPendingAuditInstruction(this.userId)
            break
          case 3:
            this.UnDealAccidents = await GetUnDealAccidents()
            this.PendingAuditInstructionList = await GetPendingAuditInstruction(this.userId)
            break
        }
      },
      detail (data, key) {
        let query = this.$router.currentRoute.query
        switch (key) {
          case KEYS.INSPECT:
            this.$router.push({
              path: '/zfjcrw',
              query: {
                userId: query.userId,
                enterpriseId: data.enterpriseId,
                id: 0
              }
            })
            break
          case KEYS.REVIEW:
            query = {
              userId: query.userId,
              enterpriseId: data.enterpriseId,
              enterprise: data.enterpriseName,
              inspectTaskId: data.taskId,
              taskId: data.reviewTaskId
            }
            this.$router.push({
              path: 'zgfcrw',
              query
            })
            break
          case KEYS.EXAMINE:
            query = {
              company: data.enterpriseName,
              companyId: data.enterpriseId,
              taskId: data.taskId,
              instructionId: data.instructionId
            }
            this.$router.push({
              path: '/zlzgsh',
              query
            })
            break
          case KEYS.STARTUP:
            this.$router.push({
              path: '/sgjk',
              query: {
                AccidentId: data.id,
                userId: query.userId,
                enterpriseId: data.enterpriseId,
                isStart: false
              }
            })
            break
        }
      },
      edit (index) {
        let item = this.PendingReviewList[index]
        let id = item.rectificationOrderId
        let cur = item.rectificationTime
        this.$module.picker.show({
          cur,
          ok: async (date) => {
            let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            let res = await UpdateLawEntRectificationTime(id, str)
            if (res.success) {
              item.leadTime = str
              this.$module.toast.show({msg: '修改成功!'})
              this.PendingReviewList.splice(index, 1, item)
            }
          }
        })
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    justify-content: center
    align-items: center
    text-align: center
    padding: 0 10px
    height: 95px
    display: flex
    border-bottom 1px solid #f1f1f1

  .left
    flex: 0 0 100px

  .avatar
    display: inline-block
    width: 60px
    height: 60px
    line-height: 60px
    font-size: 30px
    color: #fff
    border-radius: 50%

  .center
    flex: 1
    overflow: hidden
    text-align: left

  .right
    flex: 0 0 40px
    transform: rotate(180deg)

  .name
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    color: #101010
    font-size: 16px
    margin: 15px 0

  .time
    font-size: 14px
    margin: 15px 0
</style>
