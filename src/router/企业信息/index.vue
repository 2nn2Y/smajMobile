<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .search
    margin: 5px 0 5px 5%
    border-radius: 2px
    width: 90%
    font-size: .8em
    height: 2em
    line-height: 2em
    text-indent: 1em
    background: #f2f2f2

  .row
    margin: 0 10px
    padding: 10px 0
    height: 100px
    border-bottom: 1px solid #f1f1f1
    &-name
      font-size: 16px
      height: 2em
      line-height: 2em
      color: #101010
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    &-item
      display: flex
      color: #999999
      font-size: 14px
      height: 30px
      line-height: 30px
      span
        flex: 1
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>

<template>
  <yt-page title="企业信息">
    <div class="yt-scroll">
      <input v-model="key" placeholder="请搜索..." class="search yt-input" type="text">
      <div @click="detail(item)" class="row" v-for="item in list">
        <p class="row-name">{{item.enterpriseName}}</p>
        <p class="row-item"><span>企业类型:  {{item.economyType}}</span><span>经营范围:  {{item.businessScope}}</span></p>
        <p class="row-item">地址: {{item.locationAddressDetails}}</p>
      </div>
      <div v-show="list.length===0" @click="detail(item)" class="row" v-for="item in EnterpriseList">
        <p class="row-name">{{item.enterpriseName}}</p>
        <p class="row-item"><span>企业类型:  {{item.economyType}}</span><span>经营范围:  {{item.businessScope}}</span></p>
        <p class="row-item">地址: {{item.locationAddressDetails}}</p>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetEnterpriseList} from '@/api'
  export default {
    name: 'EnterpriseInformation',
    data () {
      return {
        key: '',
        list: [],
        EnterpriseList: []
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        if (this.EnterpriseList.length) return
        this.$module.loading.show()
        let res = await GetEnterpriseList()
        this.$module.loading.hide()
        if (res.success) {
          this.EnterpriseList = res.result.rows
        }
      },
      detail (enterprise) {
        this.$router.push({path: `/qyxx/detail/${enterprise.id}`})
      }
    },
    watch: {
      'key' () {
        if (this.key === '') {
          this.list = []
          return
        }
        let reg = new window.RegExp(this.key)
        let list = this.EnterpriseList.filter((item) => {
          return item.enterpriseName.match(reg)
        })
        this.list = [].concat(list)
      }
    }
  }
</script>
