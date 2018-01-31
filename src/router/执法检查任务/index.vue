<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    display flex
    flex-direction column
    position relative
    width 100%
    height 100%
    overflow hidden

  .row
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
    &-icon
      transform: rotate(180deg)
    label
      font-size: 15px
      flex: 0 0 100px
    input
      flex 1
      height 100%
      overflow hidden
      color #666
      font-size 1em
      text-align right
      background-color transparent

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

  .textarea
    width 100%
    min-height 100px
    padding 10px
    box-sizing border-box
    font-size 14px
    resize none
    background #f1f1f1

  .content-wrap
    flex 1

  .btn-wrap
    width 100%
    max-height 114px

  .add-icon
    margin-right: 10px
    width: 30px

  .check-row
    display flex
    align-items center
    padding-left 10px

  .check-row-cont
    flex 1
    overflow hidden
</style>

<template>
  <yt-page title="执法检查任务">
    <yt-tabs v-model="active" :disableSlider="true">
      <yt-tab :title="TABS.PROGRAMME" :value="TABS.PROGRAMME"></yt-tab>
      <yt-tab :title="TABS.RECORD" :value="TABS.RECORD"></yt-tab>
      <yt-tab :title="TABS.REXTIFICATION" :value="TABS.REXTIFICATION"></yt-tab>
      <div class="wrap" :slot="TABS.PROGRAMME">
        <div class="content-wrap yt-hide-scroll">
          <p class="row">
            <label>指令编号</label>
            <input class="row-input yt-input"
                   v-model="InspectTask.documentNumber"/>
          </p>
          <p class="row">
            <label>被检查单位</label>
            <input class="row-input yt-input"
                   readonly
                   :value="InspectTask.lawEnterprise.enterpriseName"/>
          </p>
          <p class="row">
            <label>检查时间</label>
            <yt-time v-model="InspectTask.checkTime"></yt-time>
          </p>
          <p class="row"
             @click="handlerShow(ALERTKEY.PERSON)">
            <label>检查人员</label>
            <span class="row-input">
              {{checkPersonName || '请选择'}}
            </span>
          </p>
          <p class="row"
             @click="handlerShow(ALERTKEY.MODEL)">
            <label>检查方式</label>
            <span v-if="InspectTask.checkMode && InspectTask.checkMode.length" class="row-input">
              {{InspectTask.checkMode.join(',')}}
            </span>
            <span v-else>请选择</span>
          </p>
          <p class="row"
             @click="handlerShowContent()">
            <label>检查内容</label>
            <span class="row-input">添加</span>
          </p>
          <textarea class="textarea yt-input yt-hide-scroll" placeholder="请输入检查内容" v-model="InspectTask.checkContent"/>
        </div>
        <div class="btn-wrap">
          <yt-btn class="btn" @click="submitInspectTask">保存</yt-btn>
          <yt-btn class="btn" v-if="InspectTask.id > 0" @click="handlerPreviewDoc(TABS.PROGRAMME)">预览打印文书</yt-btn>
        </div>
      </div>
      <div class="wrap" :slot="TABS.RECORD">
        <div class="content-wrap yt-hide-scroll">
          <p class="row">
            <label>指令编号</label>
            <input v-bind="{'disabled': disableRecord}" class="yt-input" v-model="Record.documentNumber" style="flex: 1;"/>
          </p>
          <p class="row">
            <label>检查场所</label>
            <vInputSpeech :disable="disableRecord" v-model="Record.inspectionSite" style="flex: 1;"></vInputSpeech>
          </p>
          <p class="row" v-if="disableRecord">
            <label>开始时间</label>
            <span>{{Record.checkStartTime}}</span>
          </p>
          <p class="row" v-if="!disableRecord">
            <label>开始时间</label>
            <yt-time type="time" v-model="Record.checkStartTime"></yt-time>
          </p>
          <p class="row" v-if="disableRecord">
            <label>结束时间</label>
            <span>{{Record.checkEndTime}}</span>
          </p>
          <p class="row" v-if="!disableRecord">
            <label>结束时间</label>
            <yt-time type="time" v-model="Record.checkEndTime"></yt-time>
          </p>
          <p class="row" v-if="disableRecord">
            <label>检查人员</label>
            <span>{{RecordPersonName || '请选择'}}</span>
          </p>
          <p class="row" v-if="!disableRecord" @click="handlerShow(ALERTKEY.RECORDPERSON)">
            <label>检查人员</label>
            <span>{{RecordPersonName || '请选择'}}</span>
          </p>
          <p class="row">
            <label>检查记录</label>
            <img v-if="!disableRecord" @click="handlerSelectRecord" class="add-icon" src="./add.png"/>
          </p>
          <yt-record-row @click="handlerEdit(item, index)" @remove="handlerRemove(index)"
                         :disable="disableRecord"
                         v-for="(item, index) in Record.TaskInspectionRecords" :key="index"
                         :data="item"></yt-record-row>
        </div>
        <div class="btn-wrap">
          <yt-btn class="btn" v-if="!disableRecord" @click="submitRecord">保存</yt-btn>
          <yt-btn class="btn" v-if="Record.id > 0" @click="handlerPreviewDoc(TABS.RECORD)">预览打印文书</yt-btn>
        </div>
      </div>
      <div class="wrap" :slot="TABS.REXTIFICATION">
        <div class="content-wrap yt-hide-scroll">
          <div class="row">
            <label>指令编号</label><input v-bind="{'disabled': !disableRect}" class="yt-input" type="text" v-model="RectificationOrder.documentNumber">
          </div>
          <div v-if="!disableRect" class="row">
            <label>整改期限</label><span>{{RectificationOrder.rectificationTime}}</span>
          </div>
          <div v-if="!disableRect" class="row">
            <label>审批人</label><span>{{RectificationOrderPerson || '请选择'}}</span>
          </div>
          <div v-if="disableRect" class="row">
            <label>整改期限</label><yt-time v-model="RectificationOrder.rectificationTime"></yt-time>
          </div>
          <div v-if="disableRect" class="row" @click="handlerShow(ALERTKEY.REXTIFICATIONPERSON)">
            <label>审批人</label><span>{{RectificationOrderPerson || '请选择'}}</span>
          </div>
          <div class="row">
            <label>补充说明</label><vInputSpeech v-if="disableRect" v-model="RectificationOrder.rectificationContent" :showInput="false"></vInputSpeech>
          </div>
          <textarea v-bind="{'disabled': !disableRect}" class="textarea yt-input" v-model="RectificationOrder.rectificationContent"></textarea>
          <div class="row">
            <label>检查记录</label><img v-if="disableRect" @click="handlerShow(ALERTKEY.RECORDLIST)" class="add-icon" src="./add.png"/>
          </div>
          <yt-record-row @click="handlerPreview(item)" v-for="(item, index) in RectificationOrder.checkRecordList" :key="index" :disable="true" :data="item"></yt-record-row>
          <div class="row" v-if="RectificationOrder.id > 0">
            <label>审核状态</label><span>{{RectificationOrder.approverStatusMsg}}</span>
          </div>
          <textarea v-if="RectificationOrder.id > 0 && RectificationOrder.approverStatus === 3" class="textarea yt-input" disabled :value="RectificationOrder.approverMsg"></textarea>
        </div>
        <div class="btn-wrap">
          <yt-btn @click="submitRectification" class="btn" v-if="disableRect">提交整改指令</yt-btn>
          <yt-btn @click="handlerPreviewDoc(TABS.REXTIFICATION)" class="btn" v-if="!disableRect">预览打印文书</yt-btn>
        </div>
      </div>
    </yt-tabs>
    <yt-alert-wrap @confim="confim" slot="alert" v-model="show">
      <div v-show="InsKey === ALERTKEY.PERSON">
        <yt-checkbox-group :accordion="false" v-model="selectCheckPerson">
          <div class="col" v-for="person in checkPersonList">
            {{person.userName}}
            <yt-checkbox :label="person.id"></yt-checkbox>
          </div>
        </yt-checkbox-group>
      </div>
      <div v-show="InsKey === ALERTKEY.MODEL">
        <yt-checkbox-group :accordion="false" v-model="selectModel">
          <div class="col" v-for="item in mode">
            {{item}}
            <yt-checkbox :label="item"></yt-checkbox>
          </div>
        </yt-checkbox-group>
      </div>
      <div v-show="InsKey === ALERTKEY.RECORDPERSON">
        <yt-checkbox-group :accordion="false" v-model="selectCheckRecordPerson">
          <div class="col" v-for="person in checkPersonList">
            {{person.userName}}
            <yt-checkbox :label="person.id"></yt-checkbox>
          </div>
        </yt-checkbox-group>
      </div>
      <div v-show="InsKey === ALERTKEY.REXTIFICATIONPERSON">
        <yt-checkbox-group v-model="selectRectificationPerson">
          <div class="col" v-for="person in RectificationPersonList">
            {{person.userName}}
            <yt-checkbox :label="person.id"></yt-checkbox>
          </div>
        </yt-checkbox-group>
      </div>
      <div v-show="InsKey === ALERTKEY.RECORDLIST">
        <yt-checkbox-group :accordion="false" v-model="selectCheckList">
          <div class="check-row" v-if="item.id > 0" v-for="(item, index) in Record.TaskInspectionRecords">
            <yt-checkbox :label="item"></yt-checkbox>
            <div class="check-row-cont">
              <yt-record-row @click="handlerPreview(item)" :disable="true" :data="item"></yt-record-row>
            </div>
          </div>
        </yt-checkbox-group>
      </div>
    </yt-alert-wrap>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {
    GetReviewerUsers,
    GetLawTaskNum,
    GetInspectionProgramDocumentNumber,
    GetCheckContentList,
    GetLawEnforcementTask,
    AddOrEditEnforcementTask,
    DeleteRecordInfo,
    GetTaskInspectionRecordList,
    AddOrEdiTaskInspectionRecord,
    GetToexamineComboData,
    GetRectificationInstructionInfo,
    ModifiedRectificationInstruction,
    GetInstructionCheckInfoList,
    CheckOnSiteInspectionFile,
    CheckFile,
    InstructionFile
  } from '@/api'
  import {check} from '@/utils'
  const ALERTKEY = {
    PERSON: 'person',
    MODEL: 'model',
    RECORDPERSON: 'recordPerson',
    REXTIFICATIONPERSON: 'rectificationPerson',
    RECORDLIST: 'recordList'
  }
  const TABS = {
    PROGRAMME: '现场检查方案',
    RECORD: '现场检查记录',
    REXTIFICATION: '责令限期整改'
  }
  class Model {
    constructor(options = {}) {
      options.checkMode = options.checkMode ? options.checkMode.split(',') : []
      Object.assign(this, {
        id: 0,
        documentNumber: '',
        lawEnterprise: {
          enterpriseName: ''
        },
        lawEnterpriseId: 0,
        checkTime: '',
        taskInspectorses: [],
        checkMode: [],
        checkContent: ''
      }, options)
    }

    setPerson(list, select) {
      let result = []
      let str = ''
      select.forEach(id => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.id === id) {
            str += item.userName + ','
            result.push(id)
            break
          }
        }
      })
      this.taskInspectorses = [].concat(result)
      return str.replace(/,$/, '')
    }

    setDefaultPerson(list) {
      let name = ''
      this.taskInspectorses = list.map(item => {
        name += item.lawEnforcementOfficials.entPersonName + ','
        return item.lawEnforcementOfficialsId
      })
      return {
        name: name.replace(/,$/g, ''),
        list: this.taskInspectorses
      }
    }

    setModel(list) {
      this.checkMode = [].concat(list)
    }

    checkModel() {
      return check(this, {
        'documentNumber': '指令编号不能为空!',
        'checkTime': '请选择检查时间!',
        'taskInspectorses': '请选择检查人员!',
        'checkMode': '请选择检查方式!',
        'checkContent': '请选择检查内容!'
      })
    }
  }
  class ModelRecord {
    constructor(options = {}) {
      Object.assign(this, {
        documentNumber: '',
        lawEnforcementTaskId: null,
        inspectionSite: '',
        checkStartTime: '',
        checkEndTime: '',
        TaskRecordInspectors: [],
        TaskInspectionRecords: [],
        inspectionRecordInfos: [],
        id: 0
      }, options)
      this.setTaskRecord(options.inspectionRecordInfos)
    }

    setTaskRecord(records) {
      if (!records) return
      this.TaskInspectionRecords = records.map(item => {
        return Object.assign({
          deleteFiles: [],
          imgArry: []
        }, item)
      })
    }

    setPerson(list, select) {
      if (!select) return
      let result = []
      let str = ''
      select.forEach(id => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.id === id) {
            str += item.userName + ','
            result.push(id)
            break
          }
        }
      })
      this.TaskRecordInspectors = [].concat(result)
      return str.replace(/,$/, '')
    }

    setPerson2(list, select) {
      if (!select) return
      let result = []
      let str = ''
      select.forEach(child => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.id === child.id) {
            str += item.userName + ','
            result.push(child.id)
            break
          }
        }
      })
      this.TaskRecordInspectors = [].concat(result)
      return str.replace(/,$/, '')
    }

    updateTaskRecord(record) {
      for (let i = 0; i < this.TaskInspectionRecords.length; i++) {
        if (this.TaskInspectionRecords[i].id === record.id) {
          this.TaskInspectionRecords.splice(i, 1, record)
          break
        }
      }
    }

    updateTaskRecordFromIndex(index, record) {
      this.TaskInspectionRecords.splice(index, 1, record)
    }

    addTaskRecord(record) {
      record.taskRecordId = this.id
      this.TaskInspectionRecords.push(record)
    }

    removeTaskRecord(index) {
      this.TaskInspectionRecords.splice(index, 1)
    }

    checkModel() {
      return check(this, {
        'documentNumber': '指令编号不能为空!',
        'inspectionSite': '请选择检查场所!',
        'checkStartTime': '请选择检查开始时间!',
        'checkEndTime': '请选择检查结束时间!',
        'TaskRecordInspectors': '请选择检查人员!'
      })
    }
  }
  class ModelRectification {
    constructor(options = {}) {
      Object.assign(this, {
        id: 0,
        documentNumber: '',
        rectificationTime: '',
        userId: 0,
        rectificationContent: '',
        checkList: [],
        checkRecordList: [],
        approverStatus: 0,
        approverMsg: '',
        approverStatusMsg: '未审批'
      }, options)
      this.setStatusMsg()
    }

    setStatusMsg() {
      let msg = '未审批'
      if (this.approverStatus === 3) {
        msg = '不同意'
      }
      if (this.approverStatus === 2) {
        msg = '同意'
      }
      this.approverStatusMsg = msg
    }

    setPerson(list, id) {
      let user = {}
      for (let i = 0; i < list.length; i++) {
        user = list[i]
        if (user.id === id) {
          this.userId = id
          return user.userName
        }
      }
    }

    setPerson2(user) {
      this.userId = user.id
      return user.userName
    }

    setCheckList(list) {
      this.checkRecordList = list
      this.checkList = list.map(item => {
        return item.id
      })
    }

    setCheckList2(list, selectList) {
      if (!selectList) return []
      let _list = list.filter(item => {
        return item.id > 0
      })
      this.checkRecordList = []
      this.checkList = []
      selectList.forEach(item => {
        for (let i = 0; i < _list.length; i++) {
          if (item.id === _list[i].id) {
            this.checkList.push(item.id)
            this.checkRecordList.push(_list[i])
            break
          }
        }
      })
      return this.checkRecordList
    }

    checkModel() {
      return check(this, {
        documentNumber: '指令编号不能为空!',
        rectificationTime: '请选择复查时间',
        userId: '请选择审批人',
        checkList: '请选择检查记录'
      })
    }
  }
  export default {
    name: 'zfjcrw',
    data () {
      return {
        TABS,
        ALERTKEY,
        active: TABS.PROGRAMME,
        show: false,
        InspectTask: {},
        checkPersonName: '',
        checkPersonList: [],
        selectCheckPerson: [],
        InsKey: '',
        mode: [
          '看现场',
          '听汇报',
          '查台账'
        ],
        selectModel: [],
        Record: {},
        RecordPersonName: '',
        selectCheckRecordPerson: [],
        CheckContentList: [],
        RectificationOrder: {},
        RectificationOrderPerson: '',
        RectificationPersonList: [],
        selectRectificationPerson: [],
        selectCheckList: []
      }
    },
    activated () {
      this.fetchData()
    },
    computed: {
      disableRect() {
        return this.RectificationOrder.approverStatus !== 2
      },
      disableRecord() {
        return this.RectificationOrder.id > 0
      }
    },
    methods: {
      async handlerPreviewDoc (title) {
        let query = this.$router.currentRoute.query
        let obj = {
          id: this.InspectTask.id,
          userId: query.userId
        }
        let res = null
        switch (title) {
          case TABS.PROGRAMME:
            res = await CheckOnSiteInspectionFile(obj)
            break
          case TABS.RECORD:
            res = await CheckFile(obj)
            break
          case TABS.REXTIFICATION:
            res = await InstructionFile(obj)
            break
        }
        WebViewJavascriptBridge.callHandler('previewPdf', {
          title,
          url: res.filePdf,
          fileName: res.file.fullName.split('.')[0] + '.pdf'
        })
      },

      confim () {
        switch (this.InsKey) {
          case ALERTKEY.MODEL:
            this.InspectTask.setModel(this.selectModel)
            break
          case ALERTKEY.PERSON:
            if (this.selectCheckPerson.length !== 2) {
              this.$module.toast.show({msg: '检查人员必须选择两位!'})
              return
            }
            this.checkPersonName = this.InspectTask.setPerson(this.checkPersonList, this.selectCheckPerson)
            break
          case ALERTKEY.RECORDPERSON:
            if (this.selectCheckRecordPerson.length !== 2) {
              this.$module.toast.show({msg: '检查人员必须选择两位!'})
              return
            }
            this.RecordPersonName = this.Record.setPerson(this.checkPersonList, this.selectCheckRecordPerson)
            break
          case ALERTKEY.REXTIFICATIONPERSON:
            if (!this.selectRectificationPerson.length) {
              this.$module.toast.show({msg: '请选择审批人！'})
              return
            }
            this.RectificationOrderPerson = this.RectificationOrder.setPerson(this.RectificationPersonList, this.selectRectificationPerson[0])
            break
          case ALERTKEY.RECORDLIST:
            if (!this.selectCheckList.length) {
              this.$module.toast.show({msg: '请选择检查记录!'})
              return
            }
            this.RectificationOrder.setCheckList(this.selectCheckList)
            break
        }
        this.show = false
      },

      clear () {
        this.InspectTask = new Model()
        this.checkPersonName = ''
        this.selectModel = []
        this.selectCheckPerson = []

        this.Record = new ModelRecord()
        this.RecordPersonName = ''
        this.selectCheckRecordPerson = []

        this.RectificationOrder = new ModelRectification()
        this.selectCheckList = []
        this.RectificationOrderPerson = ''
        this.selectRectificationPerson = []
      },

      handlerSelectRecord () {
        this.$module.insRecord.show({
          ok: (res) => {
            this.Record.addTaskRecord(res)
          }
        })
      },

      handlerEdit (item, index) {
        this.$module.insRecord.show({
          ok: (record) => {
            if (record.id > 0) {
              this.Record.updateTaskRecord(record)
            } else {
              this.Record.updateTaskRecordFromIndex(index, record)
            }
          },
          edit: !this.disableRecord,
          record: item
        })
      },

      handlerPreview (item) {
        this.$module.insRecord.show({
          edit: false,
          record: item
        })
      },

      async handlerRemove (index) {
        let item = this.Record.TaskInspectionRecords[index]
        if (item.id > 0) {
          let res = await DeleteRecordInfo(item.id)
          if (!res.success) {
            this.$module.toast.show({msg: '移除失败！', type: 'error'})
          }
        }
        this.Record.removeTaskRecord(index)
      },

      handlerShowContent () {
        this.$module.insContent.show((content) => {
          this.InspectTask.checkContent = content
        }, this.$router.currentRoute.query.userId)
      },

      handlerShow (key) {
        this.show = !this.show
        this.InsKey = key
      },

      submitInspectTask () {
        let msg = this.InspectTask.checkModel()
        if (msg) {
          this.$module.toast.show({msg})
          return
        }
        let confim = async () => {
          let res = await AddOrEditEnforcementTask(this.InspectTask)
          this.InspectTask.id = res.id
          this.$module.toast.show({msg: '保存成功', type: 'success'})
        }
        this.$module.confim.show({desc: '您确认要提交吗?', confim})
      },

      submitRecord () {
        let msg = this.Record.checkModel()
        if (msg) {
          this.$module.toast.show({msg})
          return
        }
        let desc = '本次检查已完成,点击确定进行提交!'
        if (!this.Record.TaskInspectionRecords || this.Record.TaskInspectionRecords.length === 0) {
          desc = '本次检查没有发现任何隐患,您确定要提交吗?'
        }
        let confim = async () => {
          let res = await AddOrEdiTaskInspectionRecord(this.Record)
          this.Record.id = res.id
          this.Record.setTaskRecord(res.inspectionRecordInfos)
          this.$module.toast.show({msg: '保存成功', type: 'success'})
        }
        this.$module.confim.show({
          desc,
          confim
        })
      },

      submitRectification () {
        let msg = this.RectificationOrder.checkModel()
        if (msg) {
          this.$module.toast.show({msg})
          return
        }
        let confim = async () => {
          let res = await ModifiedRectificationInstruction(this.RectificationOrder)
          this.RectificationOrder.id = res.id
          this.$module.toast.show({msg: '保存成功', type: 'success'})
        }
        this.$module.confim.show({
          desc: '提交成功后，现场检查记录不再允许修改。您确认要提交吗?',
          confim
        })
      },

      async fetchRecordData (id) {
        let res = await GetTaskInspectionRecordList(id)
        this.Record = new ModelRecord(res)
        this.RecordPersonName = this.Record.setPerson2(this.checkPersonList, res.enforcementOfficialsDtos)
        this.selectCheckRecordPerson = this.Record.TaskRecordInspectors
        this.fetchRectification(id)
      },

      async fetchRectification (id) {
        let res = await GetRectificationInstructionInfo(id)
        let records = await GetInstructionCheckInfoList(res.id)
        this.RectificationOrder = new ModelRectification(res)
        this.selectCheckList = this.RectificationOrder.setCheckList2(this.Record.TaskInspectionRecords, records)
        this.RectificationOrderPerson = res.user ? res.user.userName : ''
        this.selectRectificationPerson = res.userId ? [res.userId] : []
      },

      async fetchData () {
        this.clear()
        let query = this.$router.currentRoute.query
        let enterpriseId = query.enterpriseId
        let taskId = query.id
        let userId = query.userId
        if (taskId > 0) {
          let res = await GetLawEnforcementTask(taskId)
          this.InspectTask = new Model(res)
          let obj = this.InspectTask.setDefaultPerson(this.InspectTask.taskInspectorses)
          this.checkPersonName = obj.name
          this.selectCheckPerson = obj.list
          this.selectModel = this.InspectTask.checkMode
        } else {
          let documentNumber = await GetInspectionProgramDocumentNumber()
          let lawEnterprise = await GetLawTaskNum(enterpriseId)
          this.InspectTask = new Model({
            documentNumber,
            lawEnterprise,
            lawEnterpriseId: lawEnterprise.id
          })
        }
        if (!this.checkPersonList.length) {
          this.checkPersonList = await GetReviewerUsers(userId)
        }
        if (!this.RectificationPersonList.length) {
          this.RectificationPersonList = await GetToexamineComboData(userId)
        }
      }
    },
    created () {
      this.InspectTask = new Model()
    },
    watch: {
      'InspectTask.id' () {
        if (this.InspectTask.id) {
          this.fetchRecordData(this.InspectTask.id)
        }
      }
    }
  }
</script>
