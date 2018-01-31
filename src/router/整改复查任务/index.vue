<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    display flex
    flex-direction column
    position relative
    width 100%
    height 100%
    overflow hidden

  .row
    display flex
    align-items center
    justify-content: space-between
    color: #666
    height 45px
    font-size: 14px
    padding: 0 10px
    border-bottom 1px solid #f1f1f1
    box-sizing border-box
    label
      flex: 0 0 80px
    input
      color: #666
      font-size: 1em
      text-align: right
      flex: 1

  .textarea
    width 100%
    resize none
    height: 100px
    padding 10px
    box-sizing border-box
    font-size: 14px
    background: #f5f5f5

  .col
    display: flex
    justify-content: space-between
    align-items: center
    height 45px
    line-height 45px
    overflow: hidden
    color: #666
    font-size: 14px
    padding: 0 10px
    border-bottom 1px solid #f1f1f1
    box-sizing border-box
    &:active
      background-color: #f1f2f3

  .content-wrap
    flex 1

  .btn-wrap
    width 100%
    max-height 114px

  .cell
    display flex
    align-items center
    border-bottom 1px solid #eee
    padding 0 15px
    height 70px
    font-size 14px
    &:active
      background-color: #efeff4

  .cell-left
    margin: 0 9px
    flex: 0 0 50px
    text-align: center
    img
      width: 50px
      height: 50px

  .cell-center
    text-align: left
    flex: 1
    overflow: hidden
    &-name
      margin-bottom 10px

  .cell-right
    flex 0 0 70px
    p
      line-height 25px
      span
        margin-left 5px

</style>

<template>
  <yt-page title="整改复查任务">
    <yt-tabs v-model="active">
      <yt-tab :value="TABS.INSTRUCTIONS" :title="TABS.INSTRUCTIONS_TIT"></yt-tab>
      <yt-tab :value="TABS.RECORD" :title="TABS.RECORD_TIT"></yt-tab>
      <div class="yt-scroll" :slot="TABS.INSTRUCTIONS">
        <p class="row">
          <label>整改指令</label>
          <input class="row-input yt-input" type="text" readonly :value="ReviewTaskDetail.documentNumber"/>
        </p>
        <p class="row">
          <label>整改期限</label>
          <input class="row1-input yt-input" type="text" readonly :value="ReviewTaskDetail.rectificationTime"/>
        </p>
        <p class="row">
          <label>审批人</label>
          <input class="row1-input yt-input" type="text" readonly :value="ReviewTaskDetail.userName"/>
        </p>
        <p class="row">
          <label>补充说明</label>
        </p>
        <textarea readonly class="textarea yt-input" v-model="ReviewTaskDetail.rectificationContent"></textarea>
        <p class="row">
          <label>检查内容</label>
        </p>
        <yt-record-row @click="handlerPreview(item)" :disable="true" v-for="(item, index) in ReviewTaskDetail.records" :data="item" :key="index"></yt-record-row>
      </div>
      <div class="wrap" :slot="TABS.RECORD">
        <div class="content-wrap yt-hide-scroll">
          <div class="row">
            <label>指令编号</label>
            <input class="row-input yt-input" v-model="ReviewTask.documentNumber"/>
          </div>
          <div class="row">
            <label>被复查单位</label>
            <span>{{ReviewTask.enterprise}}</span>
          </div>
          <div class="row">
            <label>复查时间</label>
            <yt-time v-model="ReviewTask.recordTime"></yt-time>
          </div>
          <div class="row" @click="handlerShow">
            <label>复查人员</label>
            <input class="row-input yt-input" placeholder="请选择" readonly :value="ReviewTaskPersonName"/>
          </div>
          <div class="row">
            <label>复查说明</label>
            <vInputSpeech :showInput="false" v-model="ReviewTask.recordSituation"></vInputSpeech>
          </div>
          <textarea class="textarea yt-input" placeholder="请输入复查情况" v-model="ReviewTask.recordSituation"></textarea>
          <p class="row">复查内容</p>
          <div @click="handlerPreview(record)" class="cell" v-for="record in ReviewTask.records">
            <div class="cell-left">
              <img :src="record.img || './static/img/img-16.png'"/>
            </div>
            <div class="cell-center">
              <p class="cell-center-name">{{record.hiddenDangerCategoriesName}}</p>
              <p class="cell-center-demand">{{record.hiddenDangerDescribe || '暂无描述'}}</p>
            </div>
            <div class="cell-right">
              <p @click.stop="update(record, false)">
                <v-radio :selected="!record.recoedStatus"></v-radio>
                <span>未完成</span></p>
              <p @click.stop="update(record, true)">
                <v-radio :selected="record.recoedStatus"></v-radio>
                <span>已完成</span></p>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <yt-btn @click="submitReviewInfo">完成复查并提交</yt-btn>
          <yt-btn @click="handlerPreviewDoc" v-if="ReviewTask.id > 0">预览打印文书</yt-btn>
        </div>
      </div>
    </yt-tabs>
    <yt-alert-wrap @confim="confim" slot="alert" v-model="showAlert">
      <yt-checkbox-group :accordion="false" v-model="selectCheckPerson">
        <div class="col" v-for="person in checkPersonList">
          {{person.userName}}
          <yt-checkbox :label="person.id"></yt-checkbox>
        </div>
      </yt-checkbox-group>
    </yt-alert-wrap>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {
    GetReviewerUsers,
    GetRectificationInstructionInfo,
    GetInstructionCheckInfoList,
    GetReviewRecordInfo,
    UpdateTaskInspectionStatus,
    AddOrEditReviewRecord,
    ReviewFile
  } from '@/api'
  import {check} from '@/utils'
  const TABS = {
    INSTRUCTIONS: 'instructions',
    INSTRUCTIONS_TIT: '整改指令',
    RECORD: 'record',
    RECORD_TIT: '复查记录'
  }
  class Model {
    constructor(options = {}) {
      Object.assign(this, {
        enterprise: '',
        recordTime: '',
        reviewPersonnels: [],
        recordSituation: '',
        records: [],
        id: 0,
        documentNumber: '',
        userName: options.user.userName
      }, options)
    }
  }
  class ModelTask {
    constructor(options) {
      Object.assign(this, {
        documentNumber: '',
        lawTaskReviewId: 0,
        recordTime: '',
        enterprise: '',
        userId: [],
        recordSituation: '',
        records: [],
        id: 0
      }, options)
    }

    setUser(list) {
      list = list || []
      let name = ''
      this.userId = list.map(item => {
        name += item.userName + ','
        return item.userId
      })
      return name.replace(/,$/, '')
    }

    setUser2(list, select) {
      let name = ''
      this.userId = select
      select.forEach(item => {
        for (let i = 0; i < list.length; i++) {
          if (item === list[i].id) {
            name += list[i].userName + ','
            break
          }
        }
      })
      return name.replace(/,$/g, '')
    }

    checkModel() {
      return check(this, {
        'recordTime': '请选择复查时间！',
        'userId': '请选择复查人员！',
        'recordSituation': '请输入复查说明！'
      })
    }
  }
  export default {
    name: 'zgfcrw',
    activated () {
      this.fetchData()
    },
    data () {
      return {
        TABS,
        active: TABS.RECORD,
        ReviewTaskPersonName: '',
        showAlert: false,
        selectCheckPerson: [],
        checkPersonList: [],
        ReviewTask: {},
        ReviewTaskDetail: {}
      }
    },
    async created () {
      this.checkPersonList = await GetReviewerUsers(this.$router.currentRoute.query.userId)
    },
    methods: {
      async handlerPreviewDoc () {
        let query = this.$router.currentRoute.query
        let res = await ReviewFile({id: query.taskId, userId: query.userId})
        WebViewJavascriptBridge.callHandler('previewPdf', {
          title: '整改复查意见书',
          url: res.filePdf,
          fileName: res.file.fullName.split('.')[0] + '.pdf'
        })
      },
      handlerPreview (item) {
        this.$module.insRecord.show({
          edit: false,
          record: item
        })
      },
      update (record, flag) {
        record.recoedStatus = flag
        UpdateTaskInspectionStatus({
          id: record.id,
          status: flag
        })
      },
      confim () {
        if (this.selectCheckPerson.length !== 2) {
          this.$module.toast.show({msg: '复查人员必须选两位！'})
          return
        }
        this.ReviewTaskPersonName = this.ReviewTask.setUser2(this.checkPersonList, this.selectCheckPerson)
        this.showAlert = false
      },
      handlerShow () {
        this.showAlert = true
      },
      async fetchData () {
        let query = this.$router.currentRoute.query
        let {enterprise, taskId, inspectTaskId} = query
        let res = await GetRectificationInstructionInfo(inspectTaskId)
        let record = await GetInstructionCheckInfoList(res.id)
        res.records = record
        this.ReviewTaskDetail = new Model(res)
        let task = await GetReviewRecordInfo(taskId)
        task.lawTaskReviewId = taskId
        task.enterprise = enterprise
        task.records = record
        this.ReviewTask = new ModelTask(task)
        this.ReviewTaskPersonName = this.ReviewTask.setUser(task.reviewPersonnels)
        this.selectCheckPerson = this.ReviewTask.userId || []
      },
      submitReviewInfo () {
        let msg = this.ReviewTask.checkModel()
        if (msg) {
          this.$module.toast.show({msg})
          return
        }
        let desc = '您确认要提交吗？'
        for (let i = 0; i < this.ReviewTask.records.length; i++) {
          if (!this.ReviewTask.records[i].recoedStatus) {
            desc = '当前任务有未完成的复查内容,您确认要提交吗?'
            break
          }
        }
        let confim = async () => {
          let res = await AddOrEditReviewRecord(this.ReviewTask)
          this.ReviewTask.id = res.id
          this.$module.toast.show({msg: '提交成功！', type: 'success'})
        }
        this.$module.confim.show({desc, confim})
      }
    }
  }
</script>
