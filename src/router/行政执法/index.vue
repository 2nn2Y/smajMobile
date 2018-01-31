<template>
  <yt-page title="2017执法计划">
    <span class="rili iconfont icon-rili" @click="showPicker" slot="right"></span>
    <p class="title">
      <span class="title-left">时间</span>
      <span class="title-center">执法进度</span>
      <span class="title-right">操作</span>
    </p>
    <div class="wrap yt-hide-scroll">
      <p class="yt-noInfo" v-if="EnterpriseDataInfos.length===0">暂无相关信息</p>
      <yt-collapse-group :accordion="true">
        <yt-collapse :isRight="false" :key="index" :name="index" v-if="EnterpriseDataInfos.length>0" v-for="(EnterpriseInfo,index) in EnterpriseDataInfos">
          <p class="row" slot="titleLeft">
            <span class="row-left">{{EnterpriseInfo.months}}</span>
            <span class="row-center">
              <vProgress :proportion="EnterpriseInfo.lawProgress"></vProgress>
            </span>
          </p>
          <div class="companys">
            <yt-collapse-group :accordion="true">
              <yt-collapse :showIcon="false" :key="index2" :name="index2" v-for="(Enterprise, index2) in EnterpriseInfo.lawEnterpriseInfos">
                <p class="companys-item" slot="title">
                  <input :disabled="true" class="companys-item-name yt-input" type="text" :value="Enterprise.enterpriseName" />
                  <span class="companys-item-status"
                        :class="statusClass(Enterprise.checkStatus)">
                      {{Enterprise.checkStatus}}
                  </span>
                </p>
                <p class="companys-item-task"
                   @click="detail(Enterprise, task)"
                   v-for="task in Enterprise.taskInformations">
                  {{task.taskName}}
                  <span class="companys-item-status"
                        :class="statusClass(task.taskStatus)">
                        {{task.taskStatus}}
                  </span>
                </p>
              </yt-collapse>
            </yt-collapse-group>
          </div>
        </yt-collapse>
      </yt-collapse-group>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {listEnterpriseDataInfos} from '@/api'
  export default {
    name: 'AdministrativeLawEnforcement',
    data () {
      return {
        EnterpriseDataInfos: []
      }
    },
    activated () {
      this.getEnterpriseDataInfos()
    },
    methods: {
      async getEnterpriseDataInfos(year) {
        let now = new window.Date(Date.now())
        year = year || now.getFullYear()
        if (!this.isFirst) {
          this.$module.loading.show()
          this.isFirst = true
        }
        this.EnterpriseDataInfos = await listEnterpriseDataInfos(year)
        this.$module.loading.hide()
      },
      statusClass (status) {
        if (status === '未检查') return 'beforeInspect'
        if (status === '待检查') return 'beforeInspect'
        if (status === '检查中') return 'inspect'
        if (status === '已完成') return 'afterInspect'
      },
      showPicker () {
        this.$module.picker.show({
          ok: (date) => {
            this.getEnterpriseDataInfos(date.getFullYear())
          }
        })
      },
      detail (Enterprise, task) {
        let {query, path} = [{}, '']
        switch (task.taskName) {
          case '执法检查任务':
            query = {
              userId: this.$router.currentRoute.query.userId,
              enterpriseId: Enterprise.id,
              id: task.id,
              status: task.taskStatus
            }
            path = '/zfjcrw'
            break
          case '整改复查任务':
            query = {
              userId: this.$router.currentRoute.query.userId,
              enterpriseId: Enterprise.id,
              enterprise: Enterprise.enterpriseName,
              inspectTaskId: Enterprise.taskInformations[0].id,
              taskId: task.id,
              status: task.taskStatus
            }
            path = '/zgfcrw'
            break
        }
        this.$router.push({path, query})
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">

  .title
    position absolute
    top 0
    left 0
    right 0
    z-index 100
    display flex
    align-items center
    justify-content center
    text-align center
    border-bottom 1px solid #f1f1f1
    background: #e8f0f2
    padding: 0 5px
    font-size: 18px
    height: 40px
    line-height: 40px
    box-sizing border-box
    &-left, &-right
      flex: 0 0 60px
    &-center
      flex: 1

  .wrap
    position absolute
    top 40px
    bottom 0
    left 0
    right 0

  .rili
    font-size: 25px

  .row
    display flex
    align-items center
    justify-content center
    text-align center
    padding: 0 5px
    height: 40px
    line-height: 40px
    box-sizing border-box
    background: #fff
    font-size: 20px
    &-left, &-right
      flex: 0 0 60px
    &-center
      flex: 1
    &-right
      color: #aaa
      font-size: 18px
      transform: rotate(270deg)

  .companys
    background: #ebf3f5
    line-height: 30px
    &-item
      display flex
      justify-content space-between
      padding-right 10px
      text-indent: 10px
      &-name
        flex 1
        color #000
        overflow hidden
        background-color transparent
        text-indent: 10px
        font-size: 15px

      &-status
        text-align: center
        float: right

      &-task
        padding-right 10px
        background-color: #eee
        text-indent: 30px

  .inspect
    color: #ff8b67

  .beforeInspect
    color: #007aff

  .afterInspect
    color: #00c528
</style>
