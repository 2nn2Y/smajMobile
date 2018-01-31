<template>
  <yt-page title="应急物资">
    <div class="yt-scroll">
      <div v-for="(material,index) in MaterialList">
        <div class="title">{{material.materialName}}</div>
        <div class="row">
          <span>设备类型</span>
          <span>{{material.materialCategory}}</span>
        </div>
        <div class="row">
          <span>所属类型</span>
          <span>企业</span>
        </div>
        <div class="row">
          <span>所属单位</span>
          <span>{{material.enterpriseName}}</span>
        </div>
        <div class="row">
          <span>型号/规格</span>
          <span>{{material.materialModel + '' +material.materialFrom}}</span>
        </div>
        <div class="row">
          <span>数量</span>
          <span>{{material.materialQuantity}}</span>
        </div>
        <div class="row">
          <span>负责人</span>
          <span>{{material.principal}}</span>
        </div>
        <div class="row">
          <span>联系电话</span>
          <a :href="'tel:'+material.principalPhone" style="color: #03a9f5">{{material.principalPhone}}</a>
        </div>
        <div class="split" v-if="index !== MaterialList.length - 1"></div>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetMaterialList} from '@/api'
  export default {
    name: 'yjwz',
    data () {
      return {
        MaterialList: []
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        if (this.MaterialList.length) return
        this.MaterialList = await GetMaterialList()
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">

  .title
    border-bottom 1px solid #f1f1f1
    font-size: 16px
    line-height: 2.66em
    padding: 0 1em

  .row
    display: flex
    justify-content: space-between
    font-size: 14px
    line-height: 2.66em
    padding: 0 1em
    span
      color: #ccc
      &:first-child
        color: #333
    .phone
      color #20a0ff

  .split
    border-top: 1px solid #ddd
    border-bottom: 1px solid #ddd
    background: #edf4f7
    height: 12px
</style>
