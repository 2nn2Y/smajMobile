<template>
  <yt-page title="责令整改审核" class="zlzgsh">
    <div class="yt-scroll">
      <div class="title">基本信息</div>
      <p class="row">
        <label>指令编号</label>
        <input class="yt-input" disabled :value="OrderRectificationAudit.documentNumber"/>
      </p>
      <p class="row">
        <label>检查对象</label>
        <span>{{OrderRectificationAudit.enterpriseName}}</span>
      </p>
      <p class="row">
        <label>检查时间</label>
        <span>{{OrderRectificationAudit.checkTime}}</span>
      </p>
      <p class="row">
        <label>检查人员</label>
        <span>{{OrderRectificationAudit.checkPerson}}</span>
      </p>
      <p class="row">
        <label>检查内容</label>
      </p>
      <textarea class="textarea yt-input yt-hide-scroll" readonly>{{OrderRectificationAudit.checkContent}}</textarea>
      <p class="row">
        <label>检查方式</label>
        <span>{{OrderRectificationAudit.checkMode}}</span>
      </p>
      <div class="title">整改详情</div>
      <yt-record-row @click="handlerPreview(item)" :disable="true" :key="index" v-for="(item, index) in OrderRectificationAudit.records" :data="item"/>
      <div class="title">审核</div>
      <p class="row row-last" :class="{'row-agree': agree}">
        <span @click="toggleAgree(true)">
          <vRadio style="font-size: 18px;" :selected="agree"></vRadio>
          <span>同意</span>
        </span>
        <span @click="toggleAgree(false)">
          <vRadio style="font-size: 18px;" :selected="!agree"></vRadio>
          <span>不同意</span>
        </span>
      </p>
      <div v-if="!agree" class="title">
        <span style="flex: 1;">审核意见</span>
        <vInputSpeech :showInput="false" v-model="content"></vInputSpeech>
      </div>
      <textarea v-if="!agree" class="textarea yt-input" v-model="content"></textarea>
      <yt-btn @click="submit">提交</yt-btn>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetLawEnforcementTask, GetInstructionCheckInfoList, UpdateRecInstruction} from '@/api'
  class Model {
    constructor(options) {
      Object.assign(this, {
        documentNumber: '',
        enterpriseName: options.lawEnterprise.enterpriseName,
        checkTime: '',
        checkContent: '',
        checkPerson: options.taskInspectorses.map(item => {
          return item.lawEnforcementOfficials.entPersonName
        }).join(',')
      }, options)
    }
  }
  export default {
    name: 'zlzgsh',
    activated () {
      this.fetchData()
    },
    data () {
      return {
        agree: true,
        content: '',
        OrderRectificationAudit: {}
      }
    },
    methods: {
      async fetchData () {
        let query = this.$router.currentRoute.query
        let {instructionId, taskId} = query
        let res = await GetLawEnforcementTask(taskId)
        let records = await GetInstructionCheckInfoList(instructionId)
        res.records = records
        this.OrderRectificationAudit = new Model(res)
      },
      handlerPreview (item) {
        this.$module.insRecord.show({
          edit: false,
          record: item
        })
      },
      toggleAgree (agree) {
        this.agree = agree
      },
      submit () {
        if (!this.agree && this.content.length === 0) {
          this.$module.toast.show({msg: '请填写审核意见!'})
          return
        }
        let confim = async () => {
          let obj = {
            id: this.$router.currentRoute.query.instructionId,
            approverStatus: this.agree ? 2 : 3,
            content: this.agree ? '' : this.content
          }
          let res = await UpdateRecInstruction(obj)
          if (res.success) {
            this.$module.toast.show({msg: '提交成功!', type: 'success'})
            this.$router.go(-1)
          }
        }
        this.$module.confim.show({
          desc: '您确定要提交吗?',
          confim
        })
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .title
    height 2em
    line-height 2em
    display: flex
    align-items: center
    padding-left: 20px
    color: #20a0ff
    background: #fafafa
    font-size: 15px
    border-bottom 1px solid #f1f1f1

  .row
    height 2.5em
    line-height 2.5em
    padding 0 10px 0 15px
    display: flex
    justify-content: space-between
    font-size: 15px
    border-bottom 1px solid #f1f1f1
    label
      flex: 0 0 70px
    span
      font-size: 15px
      color: #707070
    input
      background-color transparent
      font-size: 15px
      color: #707070
      flex: 1

  .textarea
    resize none
    padding: 10px
    box-sizing border-box
    width: 100%
    height: 100px
    color: #aaa
    background: #f5f5f5

</style>
