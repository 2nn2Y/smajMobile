<template>
  <yt-page title="企业信息详情">
    <div class="yt-scroll">
      <h2 class="title">基本信息</h2>
      <p class="row">
        <label>企业名称</label>
        <span>{{EnterpriseInfo.enterpriseName}}</span>
      </p>
      <p class="row">
        <label>行业类型</label>
        <span>{{EnterpriseInfo.economyType}}</span>
      </p>
      <p class="row">
        <label>行业类别</label>
        <span>{{EnterpriseInfo.industryCategories}}</span>
      </p>
      <div class="company-scope">
        <h2>经营范围</h2>
        <p style="text-indent: 20px">{{EnterpriseInfo.businessScope}}</p>
      </div>
      <p class="row">
        <label>企业地址</label>
        <span>{{EnterpriseInfo.locationAddressDetails}}</span>
      </p>
      <h2 class="title">生产登记证书</h2>
      <p class="yt-noInfo">没有相关消息</p>
      <h2 class="title">特种作业人员</h2>
      <p class="yt-noInfo" v-if="SpecialOperationPersonnelList.length === 0">没有相关消息</p>
      <yt-collapse-group :accordion="true">
        <yt-collapse :name="index" :key="index" v-for="(SpecialOperationPersonnel, index) in SpecialOperationPersonnelList">
          <div class="person-title"
               slot="title">{{SpecialOperationPersonnel.userName}}</div>
          <div class="person">
            <label>民族:</label>
            <span>{{SpecialOperationPersonnel.userNation}}</span>
          </div>
          <div class="person">
            <label>性别</label>
            <span>{{SpecialOperationPersonnel.gender}}</span>
          </div>
          <div class="person">
            <label>最高学历</label>
            <span>{{SpecialOperationPersonnel.highestDegree}}</span>
          </div>
          <div class="person">
            <label>籍贯</label>
            <span>{{SpecialOperationPersonnel.userNativePlace}}</span>
          </div>
          <div class="person">
            <label>职称</label>
            <span>{{SpecialOperationPersonnel.jobTitle}}</span>
          </div>
          <div class="person">
            <label>电话</label>
            <span>{{SpecialOperationPersonnel.contactNumber}}</span>
          </div>
        </yt-collapse>
      </yt-collapse-group>
      <h2 class="title">安全人员</h2>
      <p class="yt-noInfo" v-if="SafetyOfficerlList.length === 0">没有相关消息</p>
      <yt-collapse-group :accordion="true">
        <yt-collapse :name="index" :key="index" v-for="(SafetyOfficerl, index) in SafetyOfficerlList">
          <div class="person-title"
               slot="title">{{SafetyOfficerl.userName}}</div>
          <div class="person">
            <label>民族:</label>
            <span>{{SafetyOfficerl.userNation}}</span>
          </div>
          <div class="person">
            <label>性别</label>
            <span>{{SafetyOfficerl.gender}}</span>
          </div>
          <div class="person">
            <label>最高学历</label>
            <span>{{SafetyOfficerl.highestDegree}}</span>
          </div>
          <div class="person">
            <label>籍贯</label>
            <span>{{SafetyOfficerl.userNativePlace}}</span>
          </div>
          <div class="person">
            <label>职称</label>
            <span>{{SafetyOfficerl.jobTitle}}</span>
          </div>
          <div class="person">
            <label>电话</label>
            <span>{{SafetyOfficerl.contactNumber}}</span>
          </div>
        </yt-collapse>
      </yt-collapse-group>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetEnterpriseInfo, GetSafetyOfficerlList, GetSpecialOperationPersonnelList} from '@/api'
  export default {
    name: 'EnterpriseInformationDetail',
    data () {
      return {
        EnterpriseInfo: {},
        SafetyOfficerlList: [],
        SpecialOperationPersonnelList: [],
        id: 0
      }
    },
    methods: {
      async fetchData (id) {
        if (id === this.id) return
        this.clear()
        this.EnterpriseInfo = await GetEnterpriseInfo(id)
        this.SafetyOfficerlList = await GetSafetyOfficerlList(id)
        this.SpecialOperationPersonnelList = await GetSpecialOperationPersonnelList(id)
        this.id = id
      },
      clear () {
        this.EnterpriseInfo = {}
        this.SafetyOfficerlList = []
        this.SpecialOperationPersonnelList = []
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.params.id)
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    color: #333
    display: flex
    justify-content: space-between
    margin: 0 0 0 15px
    padding-right: 15px
    overflow: hidden
    font-size: 14px
    line-height 45px
    height 45px
    box-sizing border-box
    border-bottom: 1px solid #f1f1f1
    span
      font-size: 1em
      color: #999

  .person, .person-title
    line-height 35px
    height 35px
    background: #ebf3f5
    font-size: 12px
    padding: 0 10px
    display: flex
    justify-content: space-between
    span
      font-size: .8em
      color: #aaa

  .person-title
    line-height 45px
    height 45px
    background transparent
    &-open
      background: #eeeeee

  .title
    line-height 35px
    height 35px
    color: #20a0ff
    padding: 0 10px
    font-size: 1em
    border-bottom 1px solid #f1f1f1

  .company-scope
    font-size 14px
    color: #999
    margin: 0 15px
    line-height: 28px
    border-bottom 1px solid #f1f1f1
    h2
      font-weight: normal
      color: #333
</style>
